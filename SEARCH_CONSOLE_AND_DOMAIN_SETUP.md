# 🌐 Google Search Console & Custom Domain (`prepself.in`) Setup Guide

This guide provides step-by-step instructions to configure **Google Search Console** using **DNS TXT Record verification** and connect your upcoming custom domain **`prepself.in`** to your GitHub Pages deployment with full SSL/HTTPS and zero downtime.

---

## 📋 Overview of Setup

| Component | Setting / Target |
|---|---|
| **Platform** | PrepSelf Platform |
| **Current Live URL** | `https://raghavendra-exp.github.io/prepself/` |
| **Target Custom Domain** | `https://prepself.in/` and `https://www.prepself.in/` |
| **GSC Property Type** | **Domain Property** (`prepself.in`) |
| **Verification Method** | **DNS TXT Record** (covers `prepself.in`, `www.prepself.in`, `http`, and `https`) |
| **XML Sitemap** | `https://prepself.in/sitemap.xml` |

---

## 🚀 Step 1: Initiate Domain Property in Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/) and sign in with your Google account.
2. In the top-left dropdown (Property selector), click **+ Add Property**.
3. Choose the **Domain** box on the **left** (NOT the "URL prefix" box).
4. Enter your root domain:
   ```text
   prepself.in
   ```
   *(Do NOT include `https://` or `www.` — the Domain property covers all protocols and subdomains automatically).*
5. Click **Continue**.
6. Google Search Console will display a verification modal showing:
   - Record type: `TXT`
   - A unique verification string looking like:
     ```text
     google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```
7. Copy this entire string. **Keep this tab open.**

---

## 🌐 Step 2: Add DNS Records at Your Domain Registrar

Log in to the control panel of the registrar where you purchase `prepself.in` (e.g. **Cloudflare, GoDaddy, Namecheap, Hostinger, BigRock, Porkbun, or Google Domains/Squarespace**).

Navigate to **DNS Management** / **DNS Records** and add the following records:

### 1. Google Search Console Verification (TXT Record)
| Type | Host / Name | Value / Destination | TTL |
|---|---|---|---|
| **TXT** | `@` (or `prepself.in`) | `google-site-verification=YOUR_UNIQUE_STRING_FROM_GSC` | Auto / 3600 |

### 2. GitHub Pages Apex Domain (4 IPv4 A-Records)
Point the root domain `@` to GitHub's official global edge servers:

| Type | Host / Name | Value / IP Address | TTL |
|---|---|---|---|
| **A** | `@` | `185.199.108.153` | Auto / 3600 |
| **A** | `@` | `185.199.109.153` | Auto / 3600 |
| **A** | `@` | `185.199.110.153` | Auto / 3600 |
| **A** | `@` | `185.199.111.153` | Auto / 3600 |

*(Optional IPv6 AAAA Records for maximum modern network speed: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)*

### 3. Subdomain CNAME (`www`)
Route `www.prepself.in` to your GitHub Pages repository endpoint:

| Type | Host / Name | Target / Destination | TTL |
|---|---|---|---|
| **CNAME** | `www` | `raghavendra-exp.github.io.` | Auto / 3600 |

> **Cloudflare Users Note**: If using Cloudflare for DNS, set the proxy status for the A and CNAME records to **DNS Only** (grey cloud) during initial SSL issuance by GitHub. Once GitHub verifies the certificate, you can switch back to Proxied (orange cloud) if desired.

---

## ✅ Step 3: Complete Verification in Google Search Console

1. Return to the Google Search Console tab.
2. Click **Verify**.
   - Most DNS providers propagate TXT records within 1–5 minutes.
   - If Google shows "We couldn't find your verification token yet", wait 2–10 minutes and click **Verify** again.
3. You will see a green checkmark: **"Ownership verified"**.
4. Click **Go to Property**.

---

## 🔗 Step 4: Link Custom Domain in GitHub Pages Settings

Once your DNS records are added:

1. Open your GitHub repository: [https://github.com/raghavendra-exp/prepself](https://github.com/raghavendra-exp/prepself)
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Custom domain**, enter:
   ```text
   prepself.in
   ```
4. Click **Save**. GitHub will check DNS records and create a `CNAME` file in the root of your repository.
5. Wait 2–5 minutes for the DNS check to pass.
6. Check the box **Enforce HTTPS**. GitHub will automatically provision a free TLS/SSL certificate from Let's Encrypt.

---

## 🗺️ Step 5: Submit XML Sitemap to Google Search Console

To ensure Googlebot indexes all 80+ exams, 27 interactive suites, quizzes, and roadmaps immediately:

1. In Google Search Console, click on **Sitemaps** in the left sidebar (under "Indexing").
2. Under **Add a new sitemap**, enter:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. The status will show **Success** and display the count of discovered URLs.
5. Google will begin indexing your platform according to the directives already defined in your [`robots.txt`](./robots.txt) and [`sitemap.xml`](./sitemap.xml).

---

## ⚡ Optional: Instant GSC Access Right Now on `github.io`

If you want to start viewing Search Console data immediately for `https://raghavendra-exp.github.io/prepself/` before purchasing the domain:

1. In Search Console, click **+ Add Property**.
2. Select **URL prefix** (right box).
3. Enter `https://raghavendra-exp.github.io/prepself/`.
4. Click **Continue**.
5. Select **Google Analytics** as the verification method.
6. Since Google Analytics tracking code (`G-B0Z2G21W4F`) is already embedded in `<head>` of your website, Search Console will verify ownership **instantly in 1 click**.
7. Submit `sitemap.xml` there as well. When you later launch `prepself.in`, both properties will coexist in your Search Console account.
