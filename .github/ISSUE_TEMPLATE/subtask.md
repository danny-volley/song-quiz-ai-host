---
name: Focused Subtask
about: Template for focused subtasks that are part of larger parent issues
title: '[PROJECT-PHASE] Type: '
labels: 'enhancement, subtask, ready, effort:1h, priority:medium'
assignees: ''

---

<!-- 
NAMING FORMAT: [PROJECT-PHASE] Type: Brief description

PROJECT: MIND, WIDGET, WATCH, DOCS, TOOLS
PHASE: FE, BE, INFRA, PROD, SEC, PERF, A11Y, DB, ML
TYPE: Feature, Bug, UI, UX, API, Test, Refactor, Deploy, DevOps, Docs, Research

Example: [MIND-FE] UI: Add voice recording animation
-->

# [Parent Area] Subtask: Specific Focused Task

## 🎯 Overview
**Parent Issue**: #[number] (REQUIRED - this is a subtask)
**Dependencies**: #[numbers] (other subtasks this depends on)
**Estimated Time**: 1-2 hours (focused work session)
**Effort**: effort:1h or effort:2h (choose one)
**Skills**: [relevant skill tags - ios, backend, design, etc.]
**Priority**: priority:high, priority:medium, or priority:low

Brief description of what this specific subtask accomplishes within the larger parent issue.

## 📂 Files to Create/Modify

### New Files to Create:
- `path/to/new/file.swift` - Brief description of purpose

### Files to Modify:
- `path/to/existing/file.swift` - Specific changes needed

## ✅ Acceptance Criteria
- [ ] Specific measurable outcome for this subtask
- [ ] Integration with parent issue requirements
- [ ] Build passes quick_build_check.sh (<30 seconds)
- [ ] No conflicts with other subtasks
- [ ] Ready for parent issue integration

## 🏗️ Implementation Guide

### Implementation Steps:
1. **Step 1**: Specific first action
2. **Step 2**: Specific second action  
3. **Step 3**: Integration/testing step

### Code Example:
```swift
// Example showing the expected pattern
```

## 🧪 Testing Instructions
1. **Functional Test**: How to verify this subtask works
2. **Integration Test**: How to verify it works with parent issue
3. **Build Validation**: Ensure `./quick_build_check.sh` passes

## 🔗 Parent Issue Context
**Parent Issue #[number]**: [Brief description of overall goal]
**This subtask contributes**: [How this subtask advances the parent goal]
**Next subtasks**: #[numbers] (subtasks that depend on this one)

---

**Success looks like**: [One sentence describing completion for this focused subtask]