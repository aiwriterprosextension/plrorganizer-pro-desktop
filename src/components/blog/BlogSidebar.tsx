import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogCategories, blogPosts } from "@/data/blog-data";

export default function BlogSidebar() {
  const recentPosts = blogPosts.slice(0, 5);

  return (
    <aside className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {blogCategories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/blog/${category.slug}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.category.slug}/${post.slug}`}
                  className="text-sm hover:text-primary transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
