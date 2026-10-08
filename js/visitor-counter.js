/**
 * PrepSelf Transparent Visitor & Study Session Counter
 * Zero-seeded, honest telemetry: Firestore Live Sync + Session Deduplication + GA4 Event Tracking
 * Uses namespaced storage: ps:v1:*
 */

(function () {
  'use strict';

  const STORAGE_PREFIX = 'ps:v1:';
  const KEY_TOTAL = STORAGE_PREFIX + 'total_visits';
  const KEY_TODAY_PREFIX = STORAGE_PREFIX + 'today_visits_';
  const SESSION_KEY = STORAGE_PREFIX + 'session_counted';

  function getTodayKey() {
    return KEY_TODAY_PREFIX + new Date().toISOString().slice(0, 10);
  }

  function formatIndianNumber(num) {
    if (!num || isNaN(num)) return '--';
    return Number(num).toLocaleString('en-IN');
  }

  function getStoredTotal() {
    const val = localStorage.getItem(KEY_TOTAL);
    return val ? parseInt(val, 10) : 0;
  }

  function getStoredToday() {
    const val = localStorage.getItem(getTodayKey());
    return val ? parseInt(val, 10) : 0;
  }

  function animateValue(el, start, end, duration) {
    if (!el) return;
    if (isNaN(end)) {
      el.textContent = '--';
      return;
    }
    if (start === end || duration <= 0) {
      el.textContent = formatIndianNumber(end);
      return;
    }
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (range * ease));
      el.textContent = formatIndianNumber(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatIndianNumber(end);
      }
    }
    requestAnimationFrame(update);
  }

  function updateDOM(total, today) {
    if (total !== undefined && total !== null) {
      document.querySelectorAll('#visitorCount, .visitor-count, #ftVisitorCount').forEach(el => {
        const currentVal = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
        animateValue(el, currentVal, total, 600);
      });
    }

    if (today !== undefined && today !== null) {
      document.querySelectorAll('#todayVisitsCount, .today-visits-count').forEach(el => {
        el.textContent = formatIndianNumber(today);
      });
    }

    // Status indicator
    document.querySelectorAll('#activeLearnersCount, .active-learners-count, #ftActiveCount').forEach(el => {
      el.textContent = 'Active';
    });
  }

  function recordSession() {
    let total = getStoredTotal();
    let today = getStoredToday();
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);

    if (isNewSession) {
      total += 1;
      today += 1;
      localStorage.setItem(KEY_TOTAL, total.toString());
      localStorage.setItem(getTodayKey(), today.toString());
      sessionStorage.setItem(SESSION_KEY, '1');

      // Dispatch GA4 event if present
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'study_session_visit', {
          session_type: 'direct_study',
          today_count: today
        });
      }
    }

    updateDOM(total, today);
    return { total: total, today: today };
  }

  function initCounter() {
    recordSession();
  }

  // Export clean API for Firestore real-time listener hook
  window.PrepSelfCounter = {
    init: initCounter,
    updateDOM: function(firestoreTotal, firestoreToday) {
      if (firestoreTotal && !isNaN(firestoreTotal)) {
        localStorage.setItem(KEY_TOTAL, firestoreTotal.toString());
      }
      updateDOM(firestoreTotal || getStoredTotal(), firestoreToday || getStoredToday());
    },
    formatNumber: formatIndianNumber,
    getTotalCount: getStoredTotal,
    getTodayCount: getStoredToday
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounter);
  } else {
    initCounter();
  }
})();
