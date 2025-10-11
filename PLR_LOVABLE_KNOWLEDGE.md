# PLR Organizer Pro - Lovable Project Knowledge

## Product Overview
SaaS platform for organizing and managing Private Label Rights (PLR) content with AI-powered tools. Built with React, TypeScript, Tailwind CSS, shadcn/ui components, and Lovable Cloud (Supabase backend).

**Core Value Proposition:** Transform chaotic PLR content libraries into organized, trackable, profitable assets through AI-powered content enhancement, SEO analysis, brand customization, and batch editing capabilities.

---

## Design System

### Color Palette (HSL Format - ALWAYS USE THESE)

#### Light Mode
```css
--background: 0 0% 100%;           /* White backgrounds */
--foreground: 210 50% 25%;         /* Navy text */
--card: 0 0% 100%;                 /* White cards */
--card-foreground: 210 50% 25%;    /* Navy card text */

/* Primary - Royal Purple */
--primary: 250 70% 65%;            /* #6B5CE7 - CTAs, brand elements */
--primary-foreground: 0 0% 100%;   /* White text on primary */

/* Secondary - Teal */
--secondary: 190 100% 43%;         /* #00BCD4 - Accents, highlights */
--secondary-foreground: 0 0% 100%; /* White text on secondary */

/* Muted */
--muted: 214 27% 97%;              /* Light gray backgrounds */
--muted-foreground: 215 16% 47%;   /* Muted text */

/* Accent - Navy Blue */
--accent: 210 55% 24%;             /* #1E3A5F - Important elements */
--accent-foreground: 0 0% 100%;    /* White text on accent */

/* Destructive */
--destructive: 0 84% 60%;          /* Red for errors/delete */
--destructive-foreground: 0 0% 100%;

/* Borders & Input */
--border: 214 32% 91%;             /* #E2E8F0 */
--input: 223 17% 84%;              /* Input borders */
--ring: 250 70% 65%;               /* Focus rings (primary color) */

/* State Colors */
--success: 152 69% 39%;            /* #10B981 - Green */
--warning: 38 92% 50%;             /* #F59E0B - Orange */
--info: 217 91% 60%;               /* #3B82F6 - Blue */
```

#### Dark Mode
```css
--background: 222 47% 11%;         /* #0F1419 - Page background */
--foreground: 210 40% 98%;         /* #F7FAFC - Light text */
--card: 220 26% 14%;               /* #1A1F2E - Card backgrounds */
--card-foreground: 210 40% 98%;    /* Light card text */

/* Primary - Lighter Purple for Dark Mode */
--primary: 250 65% 70%;            /* #7C6FE8 */
--primary-foreground: 220 26% 14%; /* Dark text on primary */

/* Secondary - Bright Teal for Dark Mode */
--secondary: 190 95% 55%;          /* #22D3EE */
--secondary-foreground: 220 26% 14%;

/* Muted */
--muted: 217 33% 17%;              /* #252A3A - Dimmed backgrounds */
--muted-foreground: 215 20% 65%;   /* #A0AEC0 - Dimmed text */

/* Accent - Light Blue for Dark Mode */
--accent: 213 94% 68%;             /* Bright blue */
--accent-foreground: 220 26% 14%;

/* Borders & Input */
--border: 215 28% 17%;             /* #2D3748 */
--input: 215 28% 17%;
--ring: 190 95% 55%;               /* Teal focus rings */

/* State Colors */
--success: 152 76% 56%;            /* #34D399 */
--warning: 38 100% 56%;            /* #FBBF24 */
--info: 213 94% 68%;               /* #60A5FA */
```

### Typography
- **Font Family:** Inter (system fonts fallback)
- **Heading Weights:** 700-800 bold
- **Body Weight:** 400 regular, 500-600 medium/semibold for emphasis
- **Base Size:** 16px
- **Dark Mode:** Slightly increased letter-spacing for readability

### Spacing & Layout
- **Base Unit:** 4px (use Tailwind's spacing scale)
- **Border Radius:** `--radius: 0.5rem` (8px)
  - Small: `calc(var(--radius) - 4px)` = 4px
  - Medium: `calc(var(--radius) - 2px)` = 6px
  - Large: `var(--radius)` = 8px
- **Container Max Width:** 1280px (Tailwind container)

---

## Component Guidelines

### CRITICAL: Always Use Semantic Tokens
**NEVER** use direct colors like `text-white`, `bg-blue-500`, etc.
**ALWAYS** use semantic tokens from the design system:

```tsx
// ❌ WRONG - Direct colors
className="bg-purple-600 text-white"

// ✅ CORRECT - Semantic tokens
className="bg-primary text-primary-foreground"
```

### Shadcn Component Variants
All shadcn components are customizable. Use built-in variants:

```tsx
// Buttons
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete Action</Button>

// Cards
<Card className="hover:shadow-lg transition-all">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>

// Badges
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Common Patterns

#### Loading State
```tsx
import { Loader2 } from "lucide-react";

{isLoading ? (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="ml-2 text-muted-foreground">Loading...</span>
  </div>
) : (
  <Content />
)}
```

#### Empty State
```tsx
import { FolderOpen } from "lucide-react";

<Card>
  <CardContent className="p-12 text-center">
    <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <p className="text-muted-foreground mb-4">
      No items yet. Get started by uploading your first PLR content!
    </p>
    <Button>Upload Content</Button>
  </CardContent>
</Card>
```

#### Error State
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)}
```

---

## Database Schema

### Tables

#### `profiles`
```sql
id: uuid (primary key)
user_id: uuid (references auth.users)
full_name: text
avatar_url: text
created_at: timestamptz
updated_at: timestamptz
```

#### `categories`
```sql
id: uuid (primary key)
name: text (unique)
description: text
icon: text
created_at: timestamptz
```

**Default Categories:**
- Articles (FileText icon)
- eBooks (Book icon)
- Graphics (Image icon)
- Templates (Layout icon)
- Videos (Video icon)
- Audio (Music icon)
- Software (Code icon)
- Other (Package icon)

#### `plr_items`
```sql
id: uuid (primary key)
user_id: uuid (references auth.users)
category_id: uuid (references categories)
title: text
description: text
file_url: text
file_size: bigint
file_type: text
tags: text[]
license_type: text
license_restrictions: text[]
purchase_price: numeric(10,2)
purchase_date: date
quality_rating: text ('A', 'B', 'C', 'D')
created_at: timestamptz
updated_at: timestamptz
```

#### `brand_kits`
```sql
id: uuid (primary key)
user_id: uuid (references auth.users)
name: text
logo_url: text
primary_color: text (default: '#6B5CE7')
secondary_color: text (default: '#00BCD4')
font_heading: text (default: 'Inter')
font_body: text (default: 'Inter')
created_at: timestamptz
updated_at: timestamptz
```

### Storage Buckets
- **`plr-files`**: User-uploaded PLR content files
  - Authenticated access only
  - RLS policies restrict to owner

### Row Level Security (RLS)
All tables have RLS enabled with policies:
- Users can only SELECT, INSERT, UPDATE, DELETE their own records
- Uses `auth.uid()` to match `user_id` column

---

## Architecture & File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ... (all shadcn components)
│   ├── Header.tsx             # App header with navigation
│   ├── Footer.tsx             # App footer
│   ├── PLRItemCard.tsx        # PLR item display card
│   ├── PLRUploadDialog.tsx    # Upload dialog component
│   └── blog/                  # Blog-specific components
│       ├── BlogHeader.tsx
│       ├── BlogCategories.tsx
│       └── BlogSidebar.tsx
├── pages/
│   ├── Index.tsx              # Homepage
│   ├── Dashboard.tsx          # Main PLR library dashboard
│   ├── Auth.tsx               # Sign in/Sign up page
│   ├── About.tsx              # About page
│   ├── Pricing.tsx            # Pricing page
│   ├── Contact.tsx            # Contact page
│   ├── Blog.tsx               # Blog listing
│   ├── BlogPost.tsx           # Individual blog post
│   ├── BlogCategory.tsx       # Blog category view
│   ├── Privacy.tsx            # Privacy policy
│   ├── Terms.tsx              # Terms of service
│   ├── Cookies.tsx            # Cookie policy
│   ├── NotFound.tsx           # 404 page
│   ├── features/              # Feature landing pages
│   │   ├── BatchProcessing.tsx
│   │   ├── ContentEnhancement.tsx
│   │   ├── LicenseTracking.tsx
│   │   └── SmartOrganization.tsx
│   └── tools/                 # Tool pages
│       ├── ContentSpinner.tsx      # Landing page
│       ├── ContentSpinnerApp.tsx   # Functional app
│       ├── SEOAnalyzer.tsx         # Landing page
│       ├── SEOAnalyzerApp.tsx      # Functional app
│       ├── BrandKit.tsx            # Landing page
│       ├── BrandKitApp.tsx         # Functional app
│       ├── BatchEditor.tsx         # Landing page
│       └── BatchEditorApp.tsx      # Functional app
├── integrations/
│   └── supabase/
│       ├── client.ts          # Supabase client (auto-generated)
│       └── types.ts           # Database types (auto-generated)
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notifications hook
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
├── data/
│   └── blog-data.ts           # Blog mock data
├── index.css                  # Design system tokens
├── main.tsx                   # App entry point
└── App.tsx                    # Routes configuration

supabase/
├── functions/
│   ├── spin-content/
│   │   └── index.ts           # AI content rewriting
│   └── analyze-seo/
│       └── index.ts           # AI SEO analysis
├── migrations/                # Database migrations
└── config.toml                # Supabase configuration
```

---

## Features & Functionality

### Implemented Features

#### 1. Authentication System
- **Location:** `/auth`
- Email/password authentication
- Sign up and sign in forms
- Session management with redirects
- Protected routes (Dashboard, Tools)

#### 2. PLR Library Dashboard
- **Location:** `/dashboard`
- **Features:**
  - View all PLR items in grid layout
  - Search functionality (title, description)
  - Category filtering (visual category cards)
  - Upload new PLR items (file upload to storage)
  - Edit item details (inline dialog)
  - Delete items (with confirmation)
  - Download original files
- **Authentication:** Required

#### 3. Content Spinner Tool
- **Landing Page:** `/tools/content-spinner`
- **App:** `/tools/content-spinner/app`
- **Features:**
  - AI-powered content rewriting using Gemini 2.5 Flash
  - Uniqueness level slider (30-100%)
  - Side-by-side comparison view
  - Copy to clipboard
  - Option to save as new PLR item
- **Edge Function:** `spin-content`
- **Authentication:** Required

#### 4. SEO Analyzer Tool
- **Landing Page:** `/tools/seo-analyzer`
- **App:** `/tools/seo-analyzer/app`
- **Features:**
  - AI-powered SEO analysis using Gemini 2.5 Flash
  - Overall SEO score (0-100)
  - Keyword density calculation
  - Readability score (Flesch-Kincaid)
  - Categorized recommendations (critical, warning, success, info)
  - Target keyword optimization
- **Edge Function:** `analyze-seo`
- **Authentication:** Required

#### 5. Brand Kit Tool
- **Landing Page:** `/tools/brand-kit`
- **App:** `/tools/brand-kit/app`
- **Features:**
  - Create and manage brand kits
  - Logo upload (to plr-files storage)
  - Color pickers (primary, secondary)
  - Font selection (heading, body)
  - Preview brand kit
  - List all saved brand kits
  - Apply brand kit to PLR items
- **Database Table:** `brand_kits`
- **Authentication:** Required

#### 6. Batch Editor Tool
- **Landing Page:** `/tools/batch-editor`
- **App:** `/tools/batch-editor/app`
- **Features:**
  - Multi-select PLR items from library
  - Find and replace text operations
  - Case-sensitive option
  - Preview changes before applying
  - Batch update to database
  - Progress tracking
  - Success/failure reporting
- **Authentication:** Required

#### 7. Marketing Pages
- Homepage with hero, features, testimonials, CTA
- About page
- Pricing page (3-tier plans)
- Contact page
- Feature landing pages (4 features)
- Blog system (categories, posts, sidebar)

#### 8. Legal Pages
- Privacy Policy
- Terms of Service
- Cookie Policy

---

## Lovable Cloud (Backend)

### Edge Functions

#### `spin-content`
**Purpose:** AI content rewriting for uniqueness

**Request:**
```typescript
{
  content: string;          // Original text
  uniquenessLevel: number;  // 30-100
}
```

**Response:**
```typescript
{
  originalContent: string;
  spunContent: string;
  uniquenessLevel: number;
}
```

**AI Model:** `google/gemini-2.5-flash`
**CORS:** Enabled for web app calls

#### `analyze-seo`
**Purpose:** AI-powered SEO analysis with structured output

**Request:**
```typescript
{
  content: string;
  targetKeyword?: string;
}
```

**Response:**
```typescript
{
  seoScore: number;          // 0-100
  keywordDensity: number;    // 0-100
  readabilityScore: number;  // 0-100
  recommendations: Array<{
    category: 'critical' | 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }>;
}
```

**AI Model:** `google/gemini-2.5-flash` with tool calling
**CORS:** Enabled

### Authentication
- Email/password signup and login
- Auto-confirm email enabled (no verification needed)
- Session-based authentication
- `auth.uid()` used for RLS policies

### Storage
- **Bucket:** `plr-files`
- **Access:** Authenticated users only
- **Policies:** Users can upload/download their own files
- **File Types:** PDF, DOC, DOCX, MP4, MP3, JPG, PNG, ZIP
- **Max Size:** 50MB

---

## Coding Standards

### TypeScript Guidelines
```typescript
// Use functional components with explicit typing
interface Props {
  title: string;
  description?: string;
  onAction?: () => void;
}

export const Component: React.FC<Props> = ({ title, description, onAction }) => {
  // Always destructure props
  // Hooks at top
  const [state, setState] = useState<string>("");
  
  // Early returns for loading/error states
  if (isLoading) return <LoadingState />;
  
  return <div>{title}</div>;
};
```

### Naming Conventions
- **Components:** PascalCase (`PLRItemCard.tsx`)
- **Functions:** camelCase (`loadPLRItems`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types/Interfaces:** PascalCase (`PLRItem`)
- **Files:** PascalCase for components, kebab-case for utilities

### State Management
- Use `useState` for simple local state
- Use `useEffect` for data fetching and subscriptions
- Custom hooks for reusable logic (prefix with `use`)
- React Query for server state (if added)

### Code Quality Rules
- No `any` types - use proper TypeScript types
- Use optional chaining: `data?.user?.name`
- Use nullish coalescing: `value ?? defaultValue`
- Keep components under 250 lines
- Extract complex logic to custom hooks
- Use early returns for clarity

---

## User Personas

### Primary Users

1. **Digital Product Creators** (35%)
   - Creates courses, ebooks, templates
   - Pain: Scattered content, can't find what they need
   - Need: Fast search, organization, quality tracking

2. **Content Marketers** (30%)
   - Manages content campaigns
   - Pain: Duplicate content issues, SEO optimization
   - Need: SEO analysis, content spinning, batch editing

3. **PLR Resellers** (20%)
   - Resells PLR products
   - Pain: License confusion, inventory management
   - Need: License tracking, categorization

4. **Coaches & Consultants** (10%)
   - Uses PLR for client materials
   - Pain: Customization, branding
   - Need: Brand kit application, content modification

5. **Bloggers & Publishers** (5%)
   - Publishing content regularly
   - Pain: Content quality, uniqueness
   - Need: SEO optimization, content enhancement

---

## AI Integration (Lovable AI)

### Supported Models
This project uses **Lovable AI** - no API keys required!

**Models Used:**
- `google/gemini-2.5-flash` - Fast, cost-effective, excellent for:
  - Content rewriting (Content Spinner)
  - SEO analysis with structured output (tool calling)
  - Text analysis and recommendations

**Why Gemini 2.5 Flash?**
- FREE during Lovable AI promotion
- Fast response times (< 3 seconds)
- Excellent at text transformation
- Supports tool calling for structured JSON output
- Good at following complex prompts

### Edge Function Pattern for AI
```typescript
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'System prompt here' },
          { role: 'user', content: input }
        ],
      }),
    });

    const data = await response.json();
    const result = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

---

## UX Principles

### Core Principles
1. **Speed First:** Users should complete tasks in under 30 seconds
2. **Clear Feedback:** Always show loading, success, and error states
3. **Confirmation:** Confirm destructive actions (delete, overwrite)
4. **Mobile Responsive:** All pages work on mobile devices
5. **Dark Mode Support:** All components support dark mode

### State Management
```tsx
// Loading State
{isLoading && <Loader2 className="animate-spin" />}

// Success State
{success && <Alert variant="default">Success message</Alert>}

// Error State
{error && <Alert variant="destructive">{error}</Alert>}

// Empty State
{items.length === 0 && <EmptyStateComponent />}
```

### Accessibility
- Use semantic HTML elements
- Add `aria-label` to icon buttons
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios meet WCAG AA

---

## Security & Best Practices

### Row Level Security (RLS)
All database tables use RLS policies:
```sql
-- Users can only access their own data
CREATE POLICY "policy_name" ON table_name
FOR SELECT USING (auth.uid() = user_id);
```

### File Upload Security
- Max file size: 50MB
- Allowed types: PDF, DOC, DOCX, MP4, MP3, JPG, PNG, ZIP
- Files stored with unique names in isolated storage
- Access restricted via RLS policies

### Authentication
- Session-based authentication
- Protected routes redirect to `/auth` if not logged in
- Session stored securely via Supabase
- Sign out clears session

### API Security
- Edge functions validate user sessions
- CORS enabled for web app only
- Rate limiting on AI endpoints (handled by Lovable AI)
- Input validation on all edge functions

---

## Performance Optimization

### Best Practices
- Lazy load images with `loading="lazy"`
- Code split routes with React lazy loading
- Virtualize long lists (if > 100 items)
- Use Suspense boundaries for async components
- Optimize images before upload
- Use skeleton loaders for better perceived performance

### Targets
- Initial page load: < 2 seconds
- Search results: < 500ms
- AI tools response: < 5 seconds
- File upload: Show progress for files > 5MB

---

## Brand Voice & Messaging

### Tone
- Professional but friendly
- Helpful and educational
- Confident and reliable
- Solution-focused

### Key Messages
1. "Organize your PLR library with AI-powered tools"
2. "Transform PLR content into unique, optimized assets"
3. "Track licenses, apply branding, and maximize ROI"
4. "Built for creators, marketers, and entrepreneurs"

### Common CTAs
- "Start Organizing Your PLR Library"
- "Try Free Tools"
- "Upload Your First PLR Item"
- "See How It Works"
- "Get Started Free"

---

## Common Patterns & Snippets

### Supabase Client Usage
```typescript
import { supabase } from "@/integrations/supabase/client";

// Query data
const { data, error } = await supabase
  .from("plr_items")
  .select("*, categories(name)")
  .eq("user_id", session.user.id)
  .order("created_at", { ascending: false });

// Insert data
const { error } = await supabase
  .from("plr_items")
  .insert({ title, description, user_id: session.user.id });

// Update data
const { error } = await supabase
  .from("plr_items")
  .update({ title: newTitle })
  .eq("id", itemId);

// Delete data
const { error } = await supabase
  .from("plr_items")
  .delete()
  .eq("id", itemId);

// Upload file
const { error } = await supabase.storage
  .from("plr-files")
  .upload(`${userId}/${fileName}`, file);

// Get public URL
const { data } = supabase.storage
  .from("plr-files")
  .getPublicUrl(filePath);
```

### Authentication Pattern
```typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export default function ProtectedPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!session) return <div>Loading...</div>;

  return <div>Protected content</div>;
}
```

### Toast Notifications
```typescript
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Success
toast({
  title: "Success",
  description: "Item uploaded successfully",
});

// Error
toast({
  title: "Error",
  description: "Failed to upload item",
  variant: "destructive",
});
```

---

## SEO Best Practices

### Page Structure
```tsx
import { Helmet } from "react-helmet-async";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Page Title | PLR Organizer Pro</title>
        <meta name="description" content="Page description max 160 characters" />
        <meta name="keywords" content="plr, content, organizer" />
      </Helmet>
      
      <main>
        <h1>Single H1 per page with main keyword</h1>
        {/* Rest of content */}
      </main>
    </>
  );
}
```

### Semantic HTML
- Use `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<nav>`, `<footer>`
- Always include alt text on images
- Use proper heading hierarchy (h1 → h2 → h3)

---

## Testing Guidelines

### What to Test
1. User can sign up and sign in
2. User can upload PLR items
3. User can search and filter items
4. User can edit and delete items
5. Content Spinner rewrites text correctly
6. SEO Analyzer returns structured results
7. Brand Kit saves and displays correctly
8. Batch Editor finds and replaces text
9. Dark mode works on all pages
10. Mobile responsive on all pages

### Test Data
Use realistic PLR content:
- eBook titles: "Social Media Marketing Guide", "Email Marketing Mastery"
- Article packs: "50 Health & Wellness Articles"
- Graphics: "Instagram Post Templates Bundle"
- Various license types and dates

---

## Decision-Making Framework

### When to Add a Feature
Ask: Does it help users organize, enhance, or leverage their PLR content?
- If yes → Consider priority and implementation
- If no → Defer or reject

### When to Simplify
If a feature requires:
- More than 3 clicks to access
- Explanation to understand
- Multiple forms or wizards
→ Simplify the UX

### When to Use AI
Use Lovable AI when:
- Text transformation needed
- Content analysis required
- Structured output needed (tool calling)
- Speed is important (< 5 seconds)

---

## Known Limitations

1. **File Size:** Max 50MB per upload
2. **File Types:** Limited to specified types for security
3. **AI Response Time:** 2-5 seconds depending on content length
4. **Batch Operations:** Process up to 50 items at once
5. **Search:** Basic text search (no fuzzy matching yet)

---

## Future Enhancements (Not Yet Implemented)

1. **Advanced Search:** Full-text search with filters and tags
2. **ROI Analytics:** Financial tracking and profit calculations
3. **Duplicate Detection:** AI-powered similarity detection
4. **Team Collaboration:** Multi-user workspaces
5. **API Access:** Public API for integrations
6. **Scheduled Publishing:** Calendar-based content planning
7. **Export Options:** Bulk export to various formats
8. **Integration Marketplace:** Connect with other tools

---

## External References

### Documentation
- **Lovable Docs:** https://docs.lovable.dev/
- **Lovable Cloud:** https://docs.lovable.dev/features/cloud
- **Lovable AI:** https://docs.lovable.dev/features/ai
- **shadcn/ui:** https://ui.shadcn.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/
- **React Router:** https://reactrouter.com/
- **Supabase Docs:** https://supabase.com/docs

### Development
- **React Docs:** https://react.dev/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Vite:** https://vitejs.dev/

---

## Quick Reference

### Important File Paths
- Design System: `src/index.css`, `tailwind.config.ts`
- Supabase Client: `src/integrations/supabase/client.ts`
- Types: `src/integrations/supabase/types.ts`
- Routes: `src/App.tsx`
- Utils: `src/lib/utils.ts`

### Key Commands
```bash
# Development
npm run dev

# Build
npm run build

# Deploy (via Lovable UI)
Click "Publish" button in top right
```

### Environment Variables
```
VITE_SUPABASE_URL          # Auto-configured
VITE_SUPABASE_ANON_KEY     # Auto-configured
LOVABLE_API_KEY            # Auto-configured for AI
```

---

**Last Updated:** Based on current project implementation with all 4 AI tools functional.