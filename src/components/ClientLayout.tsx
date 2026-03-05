"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";
import Image from "next/image";
const basePath = `/images/layout/`;

export function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname.startsWith("/admin") || pathname.startsWith("/login");

    if (isAdminPath) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                style={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Image
                    fill
                    src={`${basePath}bg.svg`}
                    alt={`bg.svg`}
                    priority
                    style={{
                        verticalAlign: "middle",
                        position: "absolute",
                        objectFit: "cover",
                        zIndex: `-1`,
                    }}
                />
                <Image
                    width={400}
                    height={400}
                    src={`${basePath}top-left.png`}
                    alt={`top-left.png`}
                    priority
                    style={{
                        top: "0",
                        left: "0",
                        verticalAlign: "middle",
                        position: "absolute",
                        objectFit: "cover",
                        mixBlendMode: "color-dodge",
                        opacity: ".5",
                        zIndex: `-1`,
                    }}
                />
                <Navbar />
                <main className="flex-1">{children}</main>

            </div>

        </>
    );
}
