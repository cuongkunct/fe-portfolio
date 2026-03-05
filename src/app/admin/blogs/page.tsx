"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import mock Image upload preview once it's created
import { ImageUploadPreview } from "@/components/admin/ImageUploadPreview";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(5, "Title must be at least 5 characters"),
    category: z.string().min(2, "Category is required"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    imageUrl: z.string().optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

export default function ManageBlogsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            excerpt: "",
            content: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlogs(data.blogs);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (blog: any) => {
        form.reset({
            id: blog.id,
            title: blog.title,
            category: blog.category,
            excerpt: blog.excerpt || blog.summary || "This is a fetched excerpt placeholder",
            content: blog.content || "This is a full content placeholder for the form.",
            imageUrl: blog.imageUrl || blog.image || "",
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Blog deleted successfully");
                setBlogs(blogs.filter((b) => b.id !== id));
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const onSubmit = async (values: BlogFormValues) => {
        setIsSubmitting(true);
        const isEditing = !!values.id;
        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch("/api/blogs", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                toast.success(`Blog ${isEditing ? "updated" : "created"} successfully`);
                setIsFormOpen(false);
                fetchBlogs(); // reload
            } else {
                toast.error("An error occurred");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
                    <p className="text-muted-foreground">Create, edit, and delete your blog posts.</p>
                </div>
                {!isFormOpen && (
                    <Button onClick={() => { form.reset({}); setIsFormOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Blog
                    </Button>
                )}
            </div>

            {isFormOpen ? (
                <Card>
                    <CardHeader>
                        <CardTitle>{form.getValues().id ? "Edit Blog" : "Create New Blog"}</CardTitle>
                        <CardDescription>Fill in the details for your blog post.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Blog title" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Category" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="excerpt"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Excerpt / Summary</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Short description..." className="resize-none" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="imageUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Thumbnail Image</FormLabel>
                                                    <FormControl>
                                                        <ImageUploadPreview value={field.value || ""} onChange={field.onChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content (Markdown or Text)</FormLabel>
                                            <FormControl>
                                                <Textarea rows={10} placeholder="Write your full content here..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save Blog"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-[80px] ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : blogs.length > 0 ? (
                                    blogs.map((blog) => (
                                        <TableRow key={blog.id}>
                                            <TableCell className="font-medium">{blog.title}</TableCell>
                                            <TableCell>{blog.category}</TableCell>
                                            <TableCell>{blog.date || "Just now"}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(blog)}>
                                                    <Edit2 className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No blogs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
