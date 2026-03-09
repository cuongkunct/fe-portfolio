"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Project } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ParticlesColors from "@/components/particles/ParticlesColors";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto py-12 px-4 md:px-8 max-w-7xl">
                <div className="space-y-6 text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading">My Projects</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A selection of my recent work. Swipe through to see more details and links.
                    </p>
                </div>

                <div className="w-full max-w-5xl mx-auto pb-12">
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="w-full py-12 px-4"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.id} className="max-w-sm sm:max-w-md bg-transparent">
                                <Card className="border-0 shadow-lg overflow-hidden h-[450px] flex flex-col group bg-card">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            {project.githubUrl && (
                                                <Button asChild size="icon" variant="secondary" className="rounded-full">
                                                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                </Button>
                                            )}
                                            {project.demoUrl && (
                                                <Button asChild size="icon" className="rounded-full">
                                                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="flex flex-col flex-1 p-6 z-10 bg-card">
                                        <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="fixed inset-0 -z-1 w-screen h-screen overflow-hidden">
                <div
                    id="ParticlesTriangles"
                    className="w-full h-full transform-gpu"
                >
                    <ParticlesColors />
                </div>
            </div>
        </>
    );
}
