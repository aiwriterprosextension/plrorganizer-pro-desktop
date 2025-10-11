
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { blogCategories, blogPosts } from "@/data/blog-data";

export default function BlogCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Find the current category
  const category = blogCategories.find(cat => cat.slug === categorySlug);
  
  // Filter posts by category
  const categoryPosts = blogPosts.filter(post => post.category.slug === categorySlug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Category Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The category you're looking for doesn't exist or has been removed.
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
        <div className="mb-8">
          <Link to="/blog" className="text-primary hover:underline mb-2 inline-block">
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg text-muted-foreground">{category.description}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            {categoryPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryPosts.map(post => (
                  <Link key={post.id} to={`/blog/${post.category.slug}/${post.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="object-cover w-full h-full rounded-t-lg"
                        />
                      </AspectRatio>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-2 line-clamp-3">{post.excerpt}</p>
                        <div className="flex justify-between text-sm text-muted-foreground mt-4">
                          <span>{post.author}</span>
                          <span>{post.publishDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  There are no articles in this category yet. Check back soon!
                </p>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/4">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
