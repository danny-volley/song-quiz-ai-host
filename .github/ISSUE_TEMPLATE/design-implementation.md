---
name: Design Implementation
about: For implementing UI/UX designs from Figma/Sketch
title: '[PROJECT-PHASE] UI: '
labels: 'design-implementation, ui-ux'
assignees: ''

---

# Design Implementation

## 📝 Title Format
Your title must follow: `[PROJECT-PHASE] Type: Brief description`

**Examples:**
- `[MIND-FE] UI: Implement daily check-in screen`
- `[WIDGET-UX] UI: Build widget configuration view`
- `[WATCH-FE] UI: Create watch face complications`

**Valid Values:**
- **PROJECT:** MIND, WIDGET, WATCH, DOCS, TOOLS
- **PHASE:** FE, BE, DB, ML, SEC, PERF, A11Y, INFRA, PROD
- **TYPE:** UI (for implementation), UX (for flows)

## ⚠️ MANDATORY READING
**Before implementing any UI, you MUST read:**
- [`rules/CRITICAL_CORE.mdc`](/rules/CRITICAL_CORE.mdc) - Universal development principles
- 100% theme compliance required - NO hardcoded values

## 🎨 Design Specifications
**Figma/Sketch Link**: [Link to design file]
**Design Status**: Final / In Review / Needs Updates
**Designer**: @[designer-username]

## 📱 Implementation Details

### Screens/Components to Build
- [ ] Component 1 - [Brief description]
- [ ] Component 2 - [Brief description]
- [ ] Screen 1 - [Brief description]

### Design Tokens to Use
```swift
// Colors
Theme.colors.primary // For main actions
Theme.colors.surface // For cards/containers

// Typography
Theme.fonts.title // For headers
Theme.fonts.body // For content

// Spacing
Theme.spacing.md // Standard padding
```

## 📍 Context for Newcomers
[Explain what this screen/component does and where it fits in the app flow]

## 📂 Files to Create/Modify

### New Files:
- `iOS/Mindly/Features/[Feature]/Views/[ComponentName].swift`
- `iOS/Mindly/Features/[Feature]/ViewModels/[ComponentName]ViewModel.swift`

### Files to Modify:
- `[Parent view that will contain this component]`

## ✅ Design Compliance Checklist
- [ ] All colors use Theme system (no hardcoded values)
- [ ] All fonts use Theme system
- [ ] Spacing follows 8pt grid system
- [ ] Component is responsive to different screen sizes
- [ ] Animations match design specs (duration, easing)
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Empty states implemented

## 🌓 Dark Mode Requirements
- [ ] Component looks good in light mode
- [ ] Component looks good in dark mode
- [ ] Colors have appropriate dark mode variants
- [ ] Sufficient contrast in both modes

## ♿ Accessibility Requirements
- [ ] All interactive elements have accessibility labels
- [ ] VoiceOver navigation works logically
- [ ] Touch targets are at least 44x44 points
- [ ] Dynamic Type support (if applicable)
- [ ] Color contrast meets WCAG AA standards

## 📸 Design Screenshots
<!-- Paste key screens from the design here -->

### Main Screen
[Screenshot]

### States
- Loading: [Screenshot]
- Error: [Screenshot]  
- Empty: [Screenshot]

### Interactions
[GIF or description of animations/transitions]

## 🧪 Testing Instructions
1. Compare implementation with design pixel-by-pixel
2. Test all interactive states
3. Verify animations and transitions
4. Test on multiple device sizes
5. Test with Dynamic Type enabled
6. Test with VoiceOver enabled

## 🎯 Definition of Done
- [ ] Matches design within 95% accuracy
- [ ] All states implemented (loading, error, empty)
- [ ] Responsive on all supported devices
- [ ] Passes accessibility audit
- [ ] Theme compliance verified
- [ ] No hardcoded strings (uses localization)
- [ ] Code reviewed by developer
- [ ] Design reviewed by designer

---

**Success looks like**: The implementation is indistinguishable from the design and works flawlessly across all devices and accessibility settings.