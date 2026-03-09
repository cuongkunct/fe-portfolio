"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Loader2 } from "lucide-react";

import { BlogPost } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export default function BlogPostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch("/api/blogs");
                const data = await res.json();
                const foundPost = data.blogs.find((b: BlogPost) => b.slug === slug);
                setPost(foundPost || null);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto py-24 px-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Post not found</h1>
                <Button asChild>
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    return (
        <article className="container py-10 max-w-3xl mx-auto px-4 md:px-8">
            <div>
                <Button asChild variant="ghost" className="mb-8 pl-0 text-muted-foreground hover:text-foreground">
                    <Link href="/blog">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>
            </div>

            <div className="mb-8 text-center sm:text-left">
                <Badge variant="secondary" className="mb-4">
                    {post.category}
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-heading leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {siteConfig.author}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </div>
            </div>

            {post.imageUrl && (
                <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            {/* 
        For a real project you'd use a markdown renderer like 'react-markdown' here 
        Since we have simple mock content, we'll just render it inside a prose block.
      */}
            <div className="prose dark:prose-invert max-w-none text-lg">
                {post.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                        return <h2 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h2>;
                    }
                    if (paragraph.trim() === '') return <br key={index} />;
                    return <p key={index} className="mb-4 leading-8">{paragraph}</p>;
                })}
            </div>
        </article>
    );
}
