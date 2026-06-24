import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import NotFound from "@/pages/not-found";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Peters Medicare Services`;
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  // Simple formatter to convert plain text with linebreaks to paragraphs
  const renderContent = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-6">{paragraph}</p>
    ));
  };

  return (
    <article className="w-full pb-24 bg-card">
      {/* Article Header */}
      <header className="pt-16 pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
            <Link href="/blog" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </Button>
          
          <div className="mb-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm py-1 px-3 border-none">
              {post.category}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-foreground">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center text-muted-foreground gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>By Medical Team</span>
          </div>
        </div>
      </header>

      {/* Feature Image */}
      {post.imageUrl && (
        <div className="container mx-auto px-4 md:px-6 max-w-4xl mb-12">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-lg border">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-a:text-primary max-w-none text-muted-foreground">
          {renderContent(post.content)}
        </div>
        
        <div className="mt-16 pt-8 border-t">
          <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
            <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">Need medical advice?</h3>
            <p className="text-muted-foreground mb-6">Our doctors are available for consultation six days a week in Kyenjojo.</p>
            <Button asChild>
              <Link href="/contact">Book an Appointment</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
