export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  category: BlogCategory;
  tags: string[];
  featured?: boolean;
}

export const blogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "PLR Guides",
    slug: "plr-guides",
    description: "Comprehensive guides to help you master PLR content management"
  },
  {
    id: "2",
    name: "Content Strategy",
    slug: "content-strategy",
    description: "Learn effective strategies for leveraging PLR content"
  },
  {
    id: "3",
    name: "Tools & Tips",
    slug: "tools-tips",
    description: "Tips, tricks, and tool recommendations for PLR success"
  },
  {
    id: "4",
    name: "Marketing",
    slug: "marketing",
    description: "Marketing strategies for promoting your PLR products"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Organizing PLR Content",
    slug: "ultimate-guide-organizing-plr-content",
    excerpt: "Learn proven strategies for organizing thousands of PLR files efficiently.",
    content: `# The Ultimate Guide to Organizing PLR Content\n\nManaging PLR content can be overwhelming, especially when you have thousands of files. This comprehensive guide will help you create a system that works.\n\n## Why Organization Matters\n\nProper organization saves you hours of searching and helps you maximize the value of your PLR investments.\n\n## Best Practices\n\n1. **Create a consistent folder structure**\n2. **Use descriptive file names**\n3. **Tag everything properly**\n4. **Track licenses meticulously**\n\nImplementing these strategies will transform your PLR workflow.`,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    author: "Sarah Johnson",
    publishDate: "2024-01-15",
    category: blogCategories[0],
    tags: ["organization", "productivity", "workflow"],
    featured: true
  },
  {
    id: "2",
    title: "10 Ways to Maximize Your PLR ROI",
    slug: "maximize-plr-roi",
    excerpt: "Discover proven strategies to get more value from every PLR purchase.",
    content: `# 10 Ways to Maximize Your PLR ROI\n\nPLR content is a powerful asset when used correctly. Here are 10 strategies to maximize your return on investment.\n\n## Strategy 1: Rebrand Everything\n\nMake the content truly yours by rebranding with your voice and style.\n\n## Strategy 2: Bundle Related Content\n\nCreate valuable packages by bundling complementary PLR pieces.`,
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    author: "Michael Chen",
    publishDate: "2024-01-20",
    category: blogCategories[1],
    tags: ["roi", "strategy", "business"],
    featured: true
  },
  {
    id: "3",
    title: "Essential Tools Every PLR Marketer Needs",
    slug: "essential-plr-tools",
    excerpt: "A curated list of must-have tools for serious PLR content marketers.",
    content: `# Essential Tools Every PLR Marketer Needs\n\nHaving the right tools can dramatically improve your PLR workflow. Here are the essentials.\n\n## Content Organization Tools\n\nPLR Organizer Pro leads the pack with its comprehensive feature set.\n\n## Editing and Enhancement\n\nInvest in quality editing tools to make your PLR content stand out.`,
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: "Emma Williams",
    publishDate: "2024-02-01",
    category: blogCategories[2],
    tags: ["tools", "software", "productivity"],
    featured: true
  }
];

export const featuredPosts = blogPosts.filter(post => post.featured);
