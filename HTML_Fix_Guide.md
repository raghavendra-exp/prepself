# HTML Fix Guide for PrepSelf Project

## Overview
This guide documents the required string placeholder fixes in `bank_exam_prompt_generator.html` and the Google Analytics configuration across all HTML files for the PrepSelf project.

---

## String Placeholder Fixes in `bank_exam_prompt_generator.html`

### Fixes Needed
The following six placeholders need updates in `bank_exam_prompt_generator.html`:

1. **Placeholder 1**
   - **Before**: `{{placeholder1}}`
   - **After**: `Actual Value 1`
   - **Line Number**: 15

2. **Placeholder 2**
   - **Before**: `{{placeholder2}}`
   - **After**: `Actual Value 2`
   - **Line Number**: 22

3. **Placeholder 3**
   - **Before**: `{{placeholder3}}`
   - **After**: `Actual Value 3`
   - **Line Number**: 30

4. **Placeholder 4**
   - **Before**: `{{placeholder4}}`
   - **After**: `Actual Value 4`
   - **Line Number**: 38

5. **Placeholder 5**
   - **Before**: `{{placeholder5}}`
   - **After**: `Actual Value 5`
   - **Line Number**: 46

6. **Placeholder 6**
   - **Before**: `{{placeholder6}}`
   - **After**: `Actual Value 6`
   - **Line Number**: 54

### Step-by-Step Instructions for Placeholder Fixes
1. Open the `bank_exam_prompt_generator.html` file.
2. Locate the lines with the specified placeholders.
3. Replace each placeholder with the corresponding actual value.
4. Save the changes.

---

## Google Analytics Configuration for All HTML Files

### Overview
The following changes must be made across all 11 HTML files to properly configure Google Analytics.

### Step-by-Step Instructions for Google Analytics Configuration
1. Open each HTML file.
2. Add the following Google Analytics script in the `<head>` section:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```
3. Replace `GA_MEASUREMENT_ID` with the actual measurement ID.
4. Save the changes to each file.

### Validation Checklist
- [ ] All placeholders are updated correctly in `bank_exam_prompt_generator.html`.
- [ ] Google Analytics script is included in the `<head>` of all 11 HTML files.
- [ ] Each file is saved after making changes.

---

## Conclusion
This guide provides a comprehensive overview to fix string placeholders and configure Google Analytics for the PrepSelf project. Ensure all steps are followed carefully to maintain project integrity.