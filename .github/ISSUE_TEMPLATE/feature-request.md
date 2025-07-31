---
name: Feature Request
about: Request a small feature (1-2 days). Large features use Parent Issue template.
title: '[PROJECT-PHASE] Feature: '
labels: 'enhancement, needs-triage'
assignees: ''

---

# Feature Request

## 📝 Title Format
Your title must follow: `[PROJECT-PHASE] Feature: Brief description`

**Examples:**
- `[MIND-FE] Feature: Add voice command shortcuts`
- `[WIDGET-UX] Feature: Design daily check-in widget`
- `[WATCH-BE] Feature: Implement sync with Apple Watch`

**Valid Values:**
- **PROJECT:** MIND, WIDGET, WATCH, DOCS, TOOLS
- **PHASE:** FE, BE, DB, ML, SEC, PERF, A11Y, INFRA, PROD

## ⚠️ MANDATORY READING
**Before implementing this feature, you MUST read:**
- [`rules/CRITICAL_CORE.mdc`](/rules/CRITICAL_CORE.mdc) - Universal development principles
- All new features must follow single-pass implementation

## 💡 Feature Description
**What**: [Clear description of the feature]
**Why**: [The user problem this solves]
**Who**: [Which users will benefit]

## 📍 Context for Newcomers
[1-2 sentences explaining where this fits in the app for someone unfamiliar with the codebase]

## 🎨 Proposed Implementation

### UI/UX Changes
[Describe any user-facing changes, or mark "None" for backend features]

### Technical Approach
**Files to modify**:
- `path/to/file.swift` - [What changes needed]

**New files to create**:
- `path/to/newfile.swift` - [What this file will do]

## ✅ Acceptance Criteria
- [ ] Feature works as described above
- [ ] Tests cover the new functionality
- [ ] Documentation updated if needed
- [ ] Build passes without warnings
- [ ] Theme compliance maintained

## 🎯 Success Metrics
[How will we know this feature is successful?]

## 🚫 Out of Scope
[What this feature request does NOT include]

## 🔗 Related Issues
- Related to: #[number] (if applicable)
- Blocks: #[number] (if applicable)

## 💭 Alternatives Considered
[Other approaches you thought about and why you rejected them]

---

**Note**: Feature requests requiring more than 2 days of work should use the "Parent Issue" template and be broken into subtasks.