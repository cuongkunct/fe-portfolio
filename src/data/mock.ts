export interface Skill {
    name: string;
    level: number;
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
    description: string;
}

export interface Certification {
    name: string;
    issuer: string;
    year: string;
    link?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    demoUrl?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    imageUrl?: string;
}

export const mockSkills: Record<string, Skill[]> = {
    "Frontend": [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 95 },
    ],
    "Backend": [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "PostgreSQL", level: 70 },
    ],
    "Tools": [
        { name: "Git / GitHub", level: 90 },
        { name: "Docker", level: 65 },
        { name: "Figma", level: 80 },
    ]
};

export const mockEducation: Education[] = [
    {
        degree: "Bachelor of Software Engineering",
        institution: "University of Technology",
        year: "2018 - 2022",
        description: "Graduated with honors. Specialization in web development and software architecture."
    }
];

export const mockCertifications: Certification[] = [
    {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        year: "2023"
    },
    {
        name: "Meta Front-End Developer Professional",
        issuer: "Coursera",
        year: "2022",
    }
];

export const mockProjects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce application built with Next.js, Stripe, and Prisma.",
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
        githubUrl: "#",
        demoUrl: "#"
    },
    {
        id: "2",
        title: "Task Management SaaS",
        description: "A collaborative task manager featuring real-time updates using WebSockets.",
        imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
        tags: ["React", "Node.js", "Socket.io", "MongoDB"],
        githubUrl: "#"
    },
    {
        id: "3",
        title: "AI Image Generator",
        description: "Web interface for an AI image generation model, utilizing OpenAI API.",
        imageUrl: "https://images.unsplash.com/photo-1620712948343-008423675ddb?w=800&q=80",
        tags: ["Next.js", "OpenAI API", "Framer Motion"],
        demoUrl: "#"
    }
];

export const mockCategories = ["All", "Web Development", "Tutorial", "Career", "Life"];

export const mockBlogs: BlogPost[] = [
    {
        id: "1",
        slug: "getting-started-with-nextjs-14",
        title: "Getting Started with Next.js 14 App Router",
        excerpt: "Learn how to build modern web applications using the new Next.js 14 App Router and its powerful features.",
        content: "# Next.js 14 \n\nNext.js 14 is a major release emphasizing performance and developer experience...",
        category: "Web Development",
        date: "2023-11-15",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
        id: "2",
        slug: "tailwind-css-best-practices",
        title: "Tailwind CSS Best Practices for Large Projects",
        excerpt: "Discover strategies to maintain clean and scalable Tailwind CSS code in complex applications.",
        content: "# Tailwind in Large Projects\n\nWhen working with Tailwind CSS on large-scale applications, keeping classes organized is crucial...",
        category: "Tutorial",
        date: "2023-12-05",
        imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80"
    },
    {
        id: "3",
        slug: "developer-productivity-tips",
        title: "10 Tips to Boost Your Developer Productivity",
        excerpt: "Simple yet effective habits and tools to help you write better code faster.",
        content: "# Developer Productivity\n\n1. Use a good IDE.\n2. Master shortcuts...",
        category: "Career",
        date: "2024-01-20",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    }
];
