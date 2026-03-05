"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Manage Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Update Info", href: "/admin/profile", icon: User },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r bg-card min-h-screen hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b">
                <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
