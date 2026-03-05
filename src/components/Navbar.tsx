"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mainNav = [
    { title: "Home", href: "/" },
    { title: "About me", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Close mobile menu when changing routes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 w-full border-b">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">

                {/* Logo / Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logoHome.png"
                            width={250}
                            height={250}
                            alt="logo"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === item.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <div className="flex md:hidden items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle mobile menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container px-4 py-4 flex flex-col space-y-4 shadow-lg bg-background">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-foreground/80 block w-full py-2",
                                    pathname === item.href ? "text-foreground font-bold" : "text-foreground/70"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
