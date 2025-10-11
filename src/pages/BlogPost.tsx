
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { blogPosts } from "@/data/blog-data";

export default function BlogPost() {
  const { categorySlug, postSlug } = useParams<{ categorySlug: string; postSlug: string }>();
  
  // Find the current post
  const post = blogPosts.find(post => post.slug === postSlug && post.category.slug === categorySlug);
  
  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category.slug === categorySlug && p.id !== post?.id)
    .slice(0, 3);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Article Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button className="mt-6">Return to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to={`/blog/${post.category.slug}`} className="text-primary hover:underline">
            &larr; Back to {post.category.name}
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <article className="w-full md:w-3/4">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
                <span>{post.publishDate}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.category.name}</span>
              </div>
              
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </header>
            
            {/* Article Content */}
            <div className="prose max-w-none">
              <p className="text-lg font-medium mb-6">{post.excerpt}</p>
              
              {/* This would normally be the full article content */}
              <p className="mb-4">
                In today's digital landscape, content creators and marketers are constantly seeking efficient ways to produce high-quality materials. PLR (Private Label Rights) content offers a valuable shortcut, providing pre-made assets that can be customized and used as your own. However, the true power of PLR lies not just in the content itself, but in how well you organize and manage these resources.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Why Organization Matters</h2>
              <p className="mb-4">
                Without a proper organization system, your PLR investments quickly become digital clutter—difficult to find when needed and impossible to leverage effectively. The right system transforms your PLR content from a disorganized collection into a strategic asset.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
              <p className="mb-4">
                Begin by conducting a comprehensive inventory of your existing PLR content. Categorize materials by type (articles, ebooks, videos, etc.), topic, and potential use cases. This initial assessment provides the foundation for developing an organization system tailored to your specific needs.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p className="mb-4">
                Effective PLR organization isn't just about tidiness—it's about transforming your content resources into strategic assets that save time and maximize ROI. By implementing the strategies outlined in this guide, you'll create a system that ensures your PLR investments remain accessible, usable, and valuable for years to come.
              </p>
            </div>
            
            {/* Tags */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 bg-muted rounded-lg p-6">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">Content Specialist</p>
                </div>
              </div>
              <p className="mt-4">
                A digital marketing expert specializing in content strategy and PLR implementation. With over 8 years of experience helping businesses leverage pre-created content effectively.
              </p>
            </div>
            
            <Separator className="my-12" />
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.category.slug}/${relatedPost.slug}`}>
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <div className="aspect-video w-full">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                          <p className="text-sm text-muted-foreground">{relatedPost.publishDate}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
          
          <div className="w-full md:w-1/4">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
