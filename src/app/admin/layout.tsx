import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Header for mobile view could go here */}
                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
