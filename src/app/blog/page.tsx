"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/mock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogList() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const query = selectedCategory === "All" ? "" : `?category=${selectedCategory}`;
                const res = await fetch(`/api/blogs${query}`);
                const data = await res.json();
                setBlogs(data.blogs);
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [selectedCategory]);

    return (
        <div className="container mx-auto py-12 px-4 md:px-8 max-w-5xl">
            <div className="space-y-6 text-center mb-12">
                <h1 className="text-4xl font-bold font-heading">Blog</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Thoughts, technical tutorials, and insights about web development.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        className={cn("rounded-full", selectedCategory === cat && "font-bold")}
                        onClick={() => setSelectedCategory(cat)}
                        disabled={loading}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-muted-foreground">No posts found in this category.</h3>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2">
                    {blogs.map((post) => (
                        <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-shadow bg-card/60 backdrop-blur-sm">
                            {post.imageUrl && (
                                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                                            {post.category}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                            <CardHeader>
                                {!post.imageUrl && (
                                    <Badge variant="outline" className="w-max mb-2">
                                        {post.category}
                                    </Badge>
                                )}
                                <div className="flex items-center text-xs text-muted-foreground mb-2">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="line-clamp-3 text-base">
                                    {post.excerpt}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="ghost" className="p-0 hover:bg-transparent hover:text-primary">
                                    <Link href={`/blog/${post.slug}`}>
                                        Read More <ChevronRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
