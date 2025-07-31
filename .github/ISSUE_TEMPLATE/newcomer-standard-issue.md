---
name: Newcomer Standard Issue
about: Template for creating issues that follow the Newcomer Standard
title: '[PROJECT-PHASE] Type: '
labels: 'enhancement'
assignees: ''

---

# Newcomer Standard Issue

## 📝 Title Format
Your title must follow: `[PROJECT-PHASE] Type: Brief description`

**Examples:**
- `[MIND-FE] Feature: Add user profile settings`
- `[WIDGET-BE] API: Create widget data endpoint`
- `[WATCH-UX] UI: Design watch complications`

**Valid Values:**
- **PROJECT:** MIND, WIDGET, WATCH, DOCS, TOOLS
- **PHASE:** FE, BE, DB, ML, SEC, PERF, A11Y, INFRA, PROD
- **TYPE:** UI, UX, API, Test, Bug, Refactor, Deploy, DevOps, Docs, Research, Feature, Enhancement

## ⚠️ MANDATORY READING
**Before starting ANY work on this issue, you MUST read:**
- [`rules/CRITICAL_CORE.mdc`](/rules/CRITICAL_CORE.mdc) - Universal development principles
- [`CLAUDE.md`](/CLAUDE.md) - Project-specific guidance

**Failure to follow CRITICAL_CORE principles will result in PR rejection.**

## 🎯 Overview
**Parent Issue**: #[number] (if applicable)
**Blocks**: #[numbers] (issues that depend on this)
**Depends On**: #[numbers] (issues this needs first)
**Estimated Time**: 1-3 hours (single-iteration rule)
**Effort**: effort:1h, effort:2h, or effort:3h (choose one)
**Skills**: ios, backend, design, testing, etc. (add relevant skill labels)
**Priority**: priority:high, priority:medium, or priority:low
**Difficulty**: Easy/Medium/Hard

## 📍 Context for Newcomers
[2-3 sentences explaining what this feature area is and why we're doing this task. Assume the reader has never seen this codebase before. Use simple language and avoid jargon.]

## 📂 Files to Create/Modify

### New Files to Create:
- `path/to/new/file1.swift` - [Brief description of what this file does]
- `path/to/new/file2.swift` - [Brief description of what this file does]

### Files to Modify:
- `path/to/existing/file.swift` - [What specific changes needed]
- `path/to/another/file.swift` - [What specific changes needed]

## 🌊 Cascade Analysis (for refactoring/renaming issues)
<!-- Only fill this section if the issue involves refactoring, renaming, or moving code -->

**Search Terms**: [What strings/patterns to look for in codebase]
- Main term: `[primary_term]`
- Variations: `[PrimaryTerm]`, `[primary_term]`, `[PRIMARY_TERM]`

**Known Locations**:
- [ ] Source code imports and references
- [ ] Configuration files (YAML, JSON, etc.)
- [ ] CI/CD workflows
- [ ] Documentation and comments
- [ ] Database/cache keys
- [ ] Environment variables

**Potential Hidden Dependencies**:
- [ ] String literals in code (not just imports)
- [ ] Build scripts and tooling
- [ ] External integrations or API names
- [ ] File paths in configuration
- [ ] Test fixtures and mock data

**Cascade Impact Estimate**: [Low/Medium/High] - [Estimated # of files affected]

**Recommended Actions**:
- [ ] Run cascade analysis workflow: `gh workflow run cascade-analysis.yml -f search_term='[term]'`
- [ ] Check for case variations and partial matches
- [ ] Verify CI/CD pipeline configurations
- [ ] Plan phased approach if high impact

## ✅ Acceptance Criteria
- [ ] Specific measurable outcome 1
- [ ] Specific measurable outcome 2
- [ ] Build passes without warnings (quick_build_check.sh < 30s)
- [ ] Tests added/updated and passing
- [ ] Theme compliance maintained (100% via detect_violations.py)
- [ ] Voice interface compatibility verified (if UI-related)
- [ ] No merge conflicts with other subtasks

## 🎤 Voice-First Considerations
- [ ] Does this feature need voice input support?
- [ ] Are text alternatives provided for voice interactions?
- [ ] Is the UI optimized for voice-first usage patterns?
- [ ] Have you tested with VoiceOver enabled?

## 🏗️ Implementation Guide

### Step 1: [Specific first task]
[Clear instructions with context]

```swift
// Example code showing the pattern to follow
struct ExampleView: View {
    var body: some View {
        // Implementation example
        Text("Hello")
            .foregroundColor(Theme.colors.primary) // Use theme colors
    }
}
```

### Step 2: [Specific second task]
[Clear instructions with examples]

### Step 3: [Specific third task]
[Clear instructions]

## 🧪 Testing Instructions

1. **Manual Testing**:
   - How to test this feature manually
   - Specific user flows to verify
   - Edge cases to check

2. **Automated Tests**:
   ```swift
   // Example test to add
   func testFeatureWorks() {
       // Test implementation
   }
   ```

3. **Validation**:
   - How to know it's working correctly
   - Expected behavior description

## 🚫 Out of Scope
- [Things NOT to do in this issue]
- [Changes to avoid to prevent conflicts]
- [Features being handled in other issues]

## 💡 Tips for Success
- Common pitfalls to avoid
- Helpful code patterns in the codebase
- Similar implementations to reference
- Who to ask for help (@mention)

## 🔗 Resources
- [Link to relevant documentation]
- [Link to similar code in codebase]
- [External resources if needed]

---

**Success looks like**: [One sentence describing what done looks like for this issue]