import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

export function Blog() {
  useSEO({
    title: "Health Tips & News | Peters Medicare Services Uganda",
    description: "Read health advice, disease prevention guides, and community health news from Peters Medicare Services — your trusted clinic in Kyenjojo, Uganda.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/blog",
  });

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Health Tips & News</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stay informed with expert health advice, community news, and preventive care tips from our medical team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col hover-elevate border-border/60">
                <div className="aspect-[16/9] w-full bg-muted relative">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary p-6 text-center font-serif font-bold text-xl">
                      {post.category}
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-sm border-none">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pt-6 pb-4">
                  <div className="flex items-center text-xs text-muted-foreground mb-3 gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-primary font-medium inline-flex items-center gap-1.5 hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
