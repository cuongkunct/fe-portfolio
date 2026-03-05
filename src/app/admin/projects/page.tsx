"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Github } from "lucide-react";
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

import { ImageUploadPreview } from "@/components/admin/ImageUploadPreview";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    technologies: z.string().min(2, "List at least one technology (comma separated)"),
    demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    imageUrl: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof formSchema>;

export default function ManageProjectsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            technologies: "",
            demoUrl: "",
            githubUrl: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            // The mock API returns an array directly
            setProjects(Array.isArray(data) ? data : data.projects || []);
        } catch (error) {
            toast.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (project: any) => {
        form.reset({
            id: project.id,
            title: project.title || project.name || "",
            description: project.description || "Project description placeholder",
            technologies: (project.technologies || project.tags || ["React"]).join(", "),
            demoUrl: project.demoUrl || project.link || "",
            githubUrl: project.githubUrl || project.github || "",
            imageUrl: project.imageUrl || project.image || "",
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Project deleted successfully");
                setProjects(projects.filter((p) => p.id !== id));
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const onSubmit = async (values: ProjectFormValues) => {
        setIsSubmitting(true);
        const isEditing = !!values.id;
        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch("/api/projects", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    technologies: values.technologies.split(",").map(t => t.trim()),
                }),
            });

            if (res.ok) {
                toast.success(`Project ${isEditing ? "updated" : "created"} successfully`);
                setIsFormOpen(false);
                fetchProjects(); // reload
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
                    <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
                    <p className="text-muted-foreground">Add new projects to your portfolio or edit existing ones.</p>
                </div>
                {!isFormOpen && (
                    <Button onClick={() => { form.reset({}); setIsFormOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                )}
            </div>

            {isFormOpen ? (
                <Card>
                    <CardHeader>
                        <CardTitle>{form.getValues().id ? "Edit Project" : "Create New Project"}</CardTitle>
                        <CardDescription>Fill in the details for your portfolio project.</CardDescription>
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
                                                    <FormLabel>Project Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Awesome Project" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="What is this project about?" className="resize-none" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="technologies"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tech Stack (comma separated)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="React, Next.js, TailwindCSS" {...field} />
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
                                                    <FormLabel>Project Screenshot</FormLabel>
                                                    <FormControl>
                                                        <ImageUploadPreview value={field.value || ""} onChange={field.onChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="demoUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Live Demo URL (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="githubUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Github Repo URL (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save Project"}
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
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Tech Stack</TableHead>
                                    <TableHead>Links</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell><Skeleton className="h-5 w-[150px]" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[200px]" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-[80px] ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : projects.length > 0 ? (
                                    projects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.title || project.name}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">
                                                {(project.technologies || project.tags || []).join(", ")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    {(project.demoUrl || project.link) && (
                                                        <a href={project.demoUrl || project.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                    {(project.githubUrl || project.github) && (
                                                        <a href={project.githubUrl || project.github} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-700">
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                                    <Edit2 className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No projects found.
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
