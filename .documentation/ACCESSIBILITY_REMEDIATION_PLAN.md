# Accessibility Remediation Plan

> **Medibee Website - WCAG 2.1 AA Compliance**
>
> Created: 09/02/2026
> Target Completion: [TBC]
> Owner: Development Team

---

## Overview

This plan addresses 14 accessibility issues identified in the WCAG 2.1 audit, organised into 3 phases by priority and dependency.

| Phase | Focus | Issues | Effort |
|-------|-------|--------|--------|
| **Phase 1** | Critical blockers | 2 | 1-2 hours |
| **Phase 2** | Serious issues | 5 | 3-4 hours |
| **Phase 3** | Moderate refinements | 7 | 2-3 hours |

**Total Estimated Effort:** 6-9 hours

---

## Phase 1: Critical Issues

These issues create significant barriers for assistive technology users and must be fixed immediately.

### 1.1 Add Skip Link

**WCAG:** 2.4.1 Bypass Blocks (Level A)
**File:** `app/layout.tsx`
**Effort:** 30 minutes

**Current State:**
No skip link exists. Keyboard users must tab through the entire header navigation on every page.

**Implementation:**

1. Create skip link component or add directly to layout
2. Add CSS for visually hidden but focusable state
3. Ensure main content has receiving `id` and `tabindex="-1"`

**Code Changes:**

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${fraunces.variable} ${outfit.variable}`}>
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

```css
/* app/globals.css - add to @layer components */
.skip-link {
  @apply absolute -top-10 left-4 z-50;
  @apply bg-midnight text-soft-gold px-4 py-2;
  @apply focus:top-4 transition-[top];
}
```

**Testing:**
- [ ] Tab from browser address bar - skip link appears
- [ ] Press Enter - focus moves to main content
- [ ] Screen reader announces "Skip to main content, link"

---

### 1.2 Mobile Menu Focus Trap & Escape Key

**WCAG:** 2.1.2 No Keyboard Trap (Level A)
**File:** `components/shared/Header.tsx`
**Effort:** 1 hour

**Current State:**
When mobile menu is open:
- Focus can escape to page content behind the menu
- Escape key doesn't close the menu
- Focus not moved to menu when opened

**Implementation:**

1. Add `useEffect` to handle Escape key
2. Implement focus trap within mobile nav
3. Return focus to trigger button when closed
4. Add `inert` attribute to main content when menu open (optional enhancement)

**Code Changes:**

```tsx
// components/shared/Header.tsx
import * as React from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileNavRef = React.useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Focus trap and escape key handling
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const nav = mobileNavRef.current;
    if (!nav) return;

    // Focus first link when menu opens
    const firstLink = nav.querySelector('a');
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = nav.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // ... rest of component with refs added to button and nav
}
```

**Testing:**
- [ ] Open menu with Enter/Space on hamburger button
- [ ] Tab cycles only within menu items
- [ ] Shift+Tab cycles backwards
- [ ] Escape closes menu and returns focus to hamburger
- [ ] Screen reader announces menu state

---

## Phase 2: Serious Issues

These issues significantly impact usability for users with disabilities.

### 2.1 Fix Color Contrast Issues

**WCAG:** 1.4.3 Contrast Minimum (Level AA)
**Files:** Multiple
**Effort:** 1 hour

**Current State:**
Several text elements use opacity modifiers that reduce contrast below 4.5:1.

| Location | Current | Fix |
|----------|---------|-----|
| "Already registered?" | `text-mist/40` | `text-mist/70` or new colour |
| Footer headings | `text-mist/40` | `text-mist/60` minimum |
| "Register here" link | Gold on cream | Darker gold or different colour |
| Various eyebrows | `opacity-70` | `opacity-85` minimum |

**Recommended New Colours:**

```ts
// tailwind.config.ts - consider adding
colors: {
  // ... existing
  'mist-muted': '#A8A7A3', // For secondary text on dark backgrounds
}
```

**Files to Update:**

1. `app/page.tsx:261` - Change `opacity-40` to `opacity-70`
2. `components/shared/Footer.tsx:66,107` - Change `text-mist/40` to `text-mist/60`
3. `app/contact/page.tsx:185` - Change link colour from gold to `text-deep-slate` with underline
4. Review all `opacity-60`, `opacity-70` instances on text

**Testing:**
- [ ] Use axe DevTools or Chrome contrast checker
- [ ] All text achieves 4.5:1 minimum
- [ ] Large text (18px+) achieves 3:1 minimum

---

### 2.2 Announce Required Fields to Screen Readers

**WCAG:** 1.3.1 Info and Relationships (Level A)
**Files:** `components/ui/input.tsx`, `select.tsx`, `textarea.tsx`
**Effort:** 30 minutes

**Current State:**
The asterisk (*) is hidden from screen readers, and `required` attribute alone is inconsistently announced.

**Implementation:**

```tsx
// components/ui/input.tsx (and select.tsx, textarea.tsx)
<label htmlFor={name} className="block font-body text-body-sm text-ink">
  {label}
  {required && (
    <>
      <span className="text-red-600 ml-1" aria-hidden="true">*</span>
      <span className="sr-only">(required)</span>
    </>
  )}
</label>
```

**Testing:**
- [ ] Screen reader announces "Organisation Name (required), edit text"
- [ ] Visual asterisk still displays

---

### 2.3 Make "Learn More" Links Unique

**WCAG:** 2.4.4 Link Purpose in Context (Level A)
**File:** `app/services/page.tsx`
**Effort:** 30 minutes

**Current State:**
Three "Learn more" links are identical, making it impossible for screen reader users to distinguish them.

**Implementation:**

```tsx
// app/services/page.tsx - for each service card
<Link
  href="/contact"
  className="text-sm inline-flex items-center gap-2 no-underline font-medium text-provider"
  aria-label="Learn more about Temporary Staffing"
>
  Learn more
  <span aria-hidden="true">→</span>
</Link>
```

Repeat for "Emergency Cover" and "Contract Placements".

**Alternative:** Use `aria-describedby` referencing the card heading.

**Testing:**
- [ ] Screen reader links list shows unique descriptions
- [ ] Each link clearly identifies its destination

---

### 2.4 Enhance Checkbox Focus Visibility

**WCAG:** 2.4.7 Focus Visible (Level AA)
**File:** `components/ui/checkbox.tsx`
**Effort:** 15 minutes

**Current State:**
Focus state uses border colour change only, which has low visibility.

**Implementation:**

```tsx
// components/ui/checkbox.tsx
<input
  type="checkbox"
  className={cn(
    'peer h-5 w-5 appearance-none',
    'border-2 border-neutral-grey bg-white',
    // Enhanced focus state
    'focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2',
    'checked:bg-deep-slate checked:border-deep-slate',
    'transition-colors duration-150',
    'disabled:bg-mist disabled:cursor-not-allowed',
    className
  )}
  {...props}
/>
```

**Testing:**
- [ ] Tab to checkbox - visible gold ring appears
- [ ] Ring has sufficient contrast on white background

---

### 2.5 Focus First Error on Form Validation

**WCAG:** 3.3.1 Error Identification (Level A)
**File:** `components/forms/CareProviderForm.tsx`, `HCAForm.tsx`
**Effort:** 45 minutes

**Current State:**
When validation fails, errors display but focus doesn't move to the first error.

**Implementation:**

```tsx
// components/forms/CareProviderForm.tsx
import * as React from 'react';

export function CareProviderForm({ onSubmit }: CareProviderFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareProviderEnquiry>({
    resolver: zodResolver(CareProviderEnquirySchema),
  });

  // Focus first error after validation
  React.useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorField = formRef.current?.querySelector(
        `[name="${errorKeys[0]}"]`
      ) as HTMLElement;
      firstErrorField?.focus();
    }
  }, [errors]);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ... fields */}
    </form>
  );
}
```

**Testing:**
- [ ] Submit form with empty required fields
- [ ] Focus moves to first invalid field
- [ ] Screen reader announces error message

---

## Phase 3: Moderate Refinements

These issues improve the experience but are lower priority.

### 3.1 Review Hero Image Alt Text

**WCAG:** 1.1.1 Non-text Content (Level A)
**File:** `app/page.tsx`
**Effort:** 10 minutes

**Decision Required:** Is the Manchester skyline image decorative or meaningful?

- **If decorative:** Change to `alt=""`
- **If meaningful:** Enhance to `alt="Manchester city skyline at dusk, representing Medibee's nationwide UK presence"`

---

### 3.2 Add Heading to Portal Access Section

**WCAG:** 2.4.6 Headings and Labels (Level AA)
**File:** `app/page.tsx`
**Effort:** 15 minutes

```tsx
// app/page.tsx - Quick Portal Access section
<section className="py-5 bg-midnight border-t border-soft-gold/10">
  <div className="container-editorial ...">
    <h2 className="sr-only">Portal Access</h2>
    {/* existing content */}
  </div>
</section>
```

---

### 3.3 Focus Success Message After Form Submit

**WCAG:** 3.3.1 Error Identification (Level A)
**File:** `app/contact/page.tsx`
**Effort:** 20 minutes

```tsx
// app/contact/page.tsx
const successHeadingRef = React.useRef<HTMLHeadingElement>(null);

React.useEffect(() => {
  if (submitState === 'success') {
    successHeadingRef.current?.focus();
  }
}, [submitState]);

// In success render:
<h1
  ref={successHeadingRef}
  tabIndex={-1}
  className="font-display text-[2.5rem] mb-6 focus:outline-none"
  style={{ color: '#F5E6A3' }}
>
  Thank you for your enquiry
</h1>
```

---

### 3.4 Add aria-live for Form State Changes

**WCAG:** 4.1.3 Status Messages (Level AA)
**File:** `app/contact/page.tsx`
**Effort:** 15 minutes

```tsx
// app/contact/page.tsx - add near form
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {submitState === 'submitting' && 'Submitting your enquiry, please wait.'}
  {submitState === 'success' && 'Your enquiry has been submitted successfully.'}
  {submitState === 'error' && 'There was an error submitting your enquiry. Please try again.'}
</div>
```

---

### 3.5 Fix Mobile Nav Accessibility Tree

**WCAG:** 4.1.2 Name, Role, Value (Level A)
**File:** `components/shared/Header.tsx`
**Effort:** 15 minutes

**Current:** Hidden nav remains in accessibility tree.

**Fix:** Add `aria-hidden` and `inert` when closed:

```tsx
<nav
  ref={mobileNavRef}
  data-testid="mobile-nav"
  className={cn(
    'lg:hidden bg-slate-blue text-mist overflow-hidden transition-all duration-200',
    mobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0 py-0'
  )}
  aria-hidden={!mobileMenuOpen}
  aria-label="Mobile navigation"
  // inert is a boolean attribute - conditionally render
  {...(!mobileMenuOpen && { inert: '' })}
>
```

---

### 3.6 Add aria-hidden to Decorative SVGs

**WCAG:** 4.1.2 Name, Role, Value (Level A)
**File:** `components/ui/select.tsx`
**Effort:** 10 minutes

```tsx
// components/ui/select.tsx - dropdown arrow
<svg
  className="h-4 w-4 text-neutral-grey"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  aria-hidden="true"
>
```

Review all SVG icons in UI components for similar fixes.

---

### 3.7 Add Required Field Legend to Forms

**WCAG:** 3.3.2 Labels or Instructions (Level A)
**Files:** Form pages
**Effort:** 15 minutes

Add instruction at top of forms:

```tsx
<p className="text-body-sm text-neutral-grey mb-6">
  Fields marked with <span aria-hidden="true">*</span> are required.
</p>
```

---

## Implementation Checklist

### Phase 1 - Critical
- [ ] 1.1 Skip link added and tested
- [ ] 1.2 Mobile menu focus trap implemented
- [ ] 1.2 Escape key closes mobile menu

### Phase 2 - Serious
- [ ] 2.1 All contrast issues fixed (verified with tool)
- [ ] 2.2 Required fields announced to screen readers
- [ ] 2.3 All "Learn more" links have unique labels
- [ ] 2.4 Checkbox focus ring visible
- [ ] 2.5 First error focused on validation failure

### Phase 3 - Moderate
- [ ] 3.1 Hero image alt text decision made
- [ ] 3.2 Portal section has visually hidden heading
- [ ] 3.3 Success message focused after submit
- [ ] 3.4 aria-live region announces form states
- [ ] 3.5 Mobile nav removed from a11y tree when closed
- [ ] 3.6 All decorative SVGs have aria-hidden
- [ ] 3.7 Required field instruction added to forms

---

## Testing Protocol

After implementation, perform:

1. **Automated Testing**
   ```bash
   npx axe-cli https://medibee.opstack.uk
   ```

2. **Keyboard Testing**
   - Navigate entire site using only Tab, Shift+Tab, Enter, Escape
   - Verify all interactive elements are reachable
   - Confirm focus order is logical

3. **Screen Reader Testing**
   - VoiceOver (Mac): Cmd+F5 to enable
   - NVDA (Windows): Free download from nvaccess.org
   - Test all forms, navigation, and dynamic content

4. **Visual Testing**
   - 200% browser zoom - verify no content is cut off
   - Windows High Contrast Mode
   - `prefers-reduced-motion: reduce` in dev tools

---

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools Browser Extension](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screen Reader](https://www.nvaccess.org/download/)

---

*Document maintained by Development Team*
*Last Updated: 09/02/2026*
