---
name: AI-Powered Design Task
about: For tasks that involve AI-generated design assets and automated design workflows
title: '[PROJECT-PHASE] UI: '
labels: 'ai-design, design-automation, enhancement'
assignees: ''

---

# AI-Powered Design Task

## 📝 Title Format
Your title must follow: `[PROJECT-PHASE] Type: Brief description`

**Examples:**
- `[MIND-FE] UI: Generate onboarding illustrations`
- `[WIDGET-UX] UI: Create widget icon set`
- `[DOCS-INFRA] Docs: Generate architecture diagrams`

**Valid Values:**
- **PROJECT:** MIND, WIDGET, WATCH, DOCS, TOOLS
- **PHASE:** FE, BE, DB, ML, SEC, PERF, A11Y, INFRA, PROD
- **TYPE:** UI (for design assets), UX (for flows), Docs (for diagrams)

## ⚠️ MANDATORY READING
**Before creating any design assets, you MUST read:**
- [`rules/CRITICAL_CORE.mdc`](/rules/CRITICAL_CORE.mdc) - Universal development principles
- Design must follow theme system and voice-first principles

## 🤖 AI Design Specifications
**Primary Tool**: Figma AI / Midjourney / DALL-E 3
**Secondary Tools**: Adobe Firefly, Uizard (if needed)
**Output Format**: SVG/PNG/Figma Component
**Brand Compliance**: Must follow current Mindly design system (check design docs first)

## 🎨 Design Brief

### Asset Type
- [ ] App icons and illustrations
- [ ] Onboarding graphics
- [ ] Empty state illustrations
- [ ] Marketing assets
- [ ] UI components
- [ ] Background patterns/textures
- [ ] Character/mascot designs

### Context & Usage
**Where this will be used**: [Screen/feature name]
**Purpose**: [What user need this addresses]
**Mood/Tone**: Check design docs for current brand personality (fallback: calming, therapeutic, warm)
**Target Audience**: Adults seeking mental health support

## 📍 Context for Newcomers
[Explain what this asset is for and how it fits into the Mindly app experience. Mindly is a mental health app focused on daily check-ins and life guidance.]

## 🎨 Design System Hierarchy

**⚠️ CRITICAL**: Brand identity may evolve significantly. Always check sources in this order:

### 1. Primary Sources (Check First)
- `docs/design-system/BRAND_IDENTITY.md` - Overall brand direction and identity
- `docs/design-system/VISUAL_LANGUAGE.md` - Current aesthetic and style guide
- `docs/design-system/AI_GENERATION_GUIDE.md` - AI-specific brand prompts
- `docs/design-system/design-tokens.json` - Systematic design values

### 2. Implementation Sources (Fallback)
- `iOS/Mindly/Mindly/Shared/UI/Styles/MindlyTheme.swift` - Current theme implementation
- `iOS/Mindly/Mindly/Shared/UI/Styles/ThemeManager.swift` - Theme system

### 3. Historical Context
- Previous GitHub issues with `design` label for evolution context
- Design system PRs for recent changes

**Note**: If primary design docs don't exist yet, this may indicate the brand identity is still evolving. Coordinate with design leadership before generating major brand assets.

## 🤖 AI Generation Workflow

### Step 1: Prompt Engineering
```markdown
# Base Prompt Template for Mindly Assets
"Create a [asset type] for a mobile app called Mindly.

**CRITICAL**: Always check docs/design-system/ for current brand identity first!
If no design docs exist, fallback to MindlyTheme.swift values.

Current design direction: [Check design docs for aesthetic, mood, visual style]
Color palette: [Reference design docs, then Theme.colors.*]
Typography: [Reference design docs, then Theme.fonts.*]
Brand personality: [Check design docs for current brand voice]
Target audience: [Check design docs, fallback: Adults seeking wellness support]
Art style: [Reference design docs for current visual direction]"

# Specific Prompt for This Task:
[Customize the base prompt for your specific asset]
```

### Step 2: AI Tool Configuration
**Recommended Tools by Asset Type**:
- **Icons & UI Elements**: Figma AI (vector output)
- **Illustrations & Characters**: Midjourney v6.1 (high quality)
- **Marketing Graphics**: Adobe Firefly (brand safe)
- **Patterns & Textures**: DALL-E 3 (seamless tiles)

### Step 3: Brand Consistency Check
```swift
// Verify generated assets match our design system
// NOTE: Colors may evolve - always check MindlyTheme.swift for current values
Colors to validate:
- Primary: Theme.colors.primary (currently sage green)
- Secondary: Theme.colors.secondary (currently warm beige) 
- Background: Theme.colors.background (currently cream)
- Text: Theme.colors.primaryText (currently warm dark gray)

// Reference: iOS/Mindly/Mindly/Shared/UI/Styles/MindlyTheme.swift
```

## 📂 Files to Create/Modify

### New Design Assets:
- `iOS/Mindly/Mindly/Shared/Resources/Images/AI-Generated/[asset-name].png`
- `iOS/Mindly/Mindly/Shared/Resources/Images/AI-Generated/[asset-name]@2x.png`
- `iOS/Mindly/Mindly/Shared/Resources/Images/AI-Generated/[asset-name]@3x.png`

### Code Integration:
- `iOS/Mindly/Mindly/Shared/UI/Components/[ComponentName].swift` (if UI component)
- Update relevant view files to use new assets

### Design System Documentation:
- `Design-System-Assets.md` - Document the new assets

## ✅ Acceptance Criteria

### AI Generation Quality
- [ ] Generated assets match Mindly's brand colors (check current Theme.colors for latest palette)
- [ ] Style is calming and therapeutic (not clinical)
- [ ] Assets are high resolution (300+ DPI for graphics)
- [ ] SVG format for scalable icons
- [ ] Multiple variations generated (3-5 options)

### Technical Requirements  
- [ ] Assets exported in all required iOS sizes (@1x, @2x, @3x)
- [ ] File sizes optimized (< 500KB for illustrations)
- [ ] Proper naming convention followed
- [ ] Assets added to Xcode project
- [ ] Dark mode variants created (if needed)

### Brand Compliance
- [ ] Colors extracted and verified against current Theme system (MindlyTheme.swift)
- [ ] Style consistent with existing app assets
- [ ] Accessibility contrast ratios met (WCAG AA)
- [ ] No conflicting visual languages introduced

### Documentation
- [ ] AI prompts documented for future reference
- [ ] Asset usage guidelines created
- [ ] Source files backed up (Figma/PSD)
- [ ] Design system updated with new components

## 🤖 AI Generation Process

### Iteration Workflow
1. **Generate Initial Options** (5-10 variations)
2. **Select Best Candidates** (top 3)
3. **Refine Prompts** for selected options
4. **Generate Refined Versions**
5. **Final Selection** and optimization

### Prompt Optimization Tips
```markdown
# Effective Prompt Structure:
[Subject] + [Style] + [Mood] + [Technical specs] + [Brand context]

# Example:
"A gentle illustration of a person meditating in a peaceful garden, 
minimalist vector style with soft curves and calming primary brand tones,
warm and therapeutic mood, suitable for mobile app interface,
for Mindly mental wellness brand, check MindlyTheme.swift for current brand colors, SVG format"
```

## 🎨 Post-Generation Tasks

### Asset Optimization
- [ ] Compress images using TinyPNG or similar
- [ ] Convert to appropriate formats (SVG for icons, PNG for illustrations)
- [ ] Generate all iOS size variants
- [ ] Test assets in actual app context

### Integration Testing
- [ ] Assets display correctly in light mode
- [ ] Assets display correctly in dark mode  
- [ ] No pixelation on different device sizes
- [ ] Loading performance acceptable

## 🔗 AI Tools & Resources

### Primary Tools
- **Figma AI**: [figma.com/ai](https://figma.com/ai) - For UI components and icons
- **Midjourney**: [midjourney.com](https://midjourney.com) - For illustrations and graphics
- **DALL-E 3**: Via ChatGPT Plus - For specific concept art

### Support Tools
- **Adobe Firefly**: [firefly.adobe.com](https://firefly.adobe.com) - For brand-safe assets
- **Uizard**: [uizard.io](https://uizard.io) - For UI mockups and layouts
- **Vectorizer AI**: [vectorizer.ai](https://vectorizer.ai) - For converting to vectors

### Figma Plugins
- **Builder.io Visual Copilot**: Design-to-code conversion
- **Magician**: Content and icon generation
- **Automator**: Batch design operations

## 💡 Quality Guidelines

### Style Consistency
- Maintain visual hierarchy consistent with Mindly brand
- Use rounded corners and soft edges (8px border radius standard)
- Avoid harsh lines or aggressive styling
- Include breathing room and negative space

### Emotional Resonance
- Assets should evoke calmness and trust
- Avoid anxiety-inducing imagery (clocks, deadlines, etc.)
- Use nature-inspired elements when appropriate
- Include inclusive and diverse representation

## 🚫 What NOT to Generate
- Medical or clinical imagery
- Anxiety-inducing visuals (stress, pressure, urgency)
- Corporate or sterile aesthetics
- Overly complex or busy designs
- Assets that require licensed fonts
- Images with text that can't be localized

## 📊 Success Metrics
- **Visual Consistency**: 95%+ brand compliance score
- **User Feedback**: Positive sentiment on design assets
- **Performance**: No impact on app load times
- **Accessibility**: WCAG AA compliance maintained
- **Reusability**: Assets suitable for multiple contexts

---

**Success looks like**: Beautiful, on-brand AI-generated assets that enhance the user experience while maintaining technical quality and brand consistency.