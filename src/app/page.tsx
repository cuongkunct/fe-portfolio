"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight, Download, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import ParticlesLinks from "@/components/particles/ParticlesLinks";
import { DownloadIcon } from "lucide-react";


import TextType from '@/components/TextType';
const basePath = `/images/home/`;

export default function Home() {
    return (
        <>
            <div className="flex flex-col">
                <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
                        <motion.h4
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-heading sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
                        >
                            Hi, I&apos;m <span className="text-primary text-red-400">{siteConfig.author}</span>
                        </motion.h4>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="font-heading sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                        >
                            <TextType
                                text={siteConfig.description}
                                typingSpeed={75}
                                pauseDuration={1500}
                                cursorBlinkDuration={0.5}
                            />
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                        >
                            I&apos;m a passionate Software Engineer specializing in building exceptional digital experiences.
                            Currently, I&apos;m focused on building accessible, human-centered products.
                        </motion.p>


                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col items-center justify-center gap-6 mt-6"
                        >


                            <Button
                                // onClick={handleDownloadCv}
                                className="rounded-full capitalize text-white transition-all duration-300 active:translate-y-px group py-6 w-full"
                                style={{
                                    filter: "drop-shadow(0px 3px 10px rgba(250, 221, 220, 0.3))",
                                    background:
                                        "linear-gradient(60deg, rgba(241, 48, 36, 1) 50%, rgba(255, 248, 0, 1) 100%)",
                                }}
                            >
                                <TextType
                                    text={"Download CV"}
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    cursorBlinkDuration={0.5}
                                />
                                <DownloadIcon
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                />
                            </Button>
                            <div style={{ position: "relative", width: "200px", height: "200px" }}>
                                <Image
                                    src={`${basePath}circle-star.svg`}
                                    width={200}
                                    height={200}
                                    alt="circle-start.svg"
                                    priority={true}
                                />
                                <Link
                                    href={"/projects"}
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={`${basePath}rounded-text.png`}
                                        width={170}
                                        height={170}
                                        alt="rounded-text.png"
                                        priority={true}
                                        style={{
                                            animation: "spin 10s linear infinite",
                                            position: "absolute",
                                        }}

                                    />

                                    <ArrowRight
                                        style={{
                                            color: "white",
                                            fontSize: "40px",
                                        }}
                                    />
                                </Link>
                            </div>

                        </motion.div>

                    </div>
                </section>

            </div>
            <div className="fixed inset-0 -z-1 w-screen h-screen overflow-hidden">
                <div
                    id="ParticlesLinks"
                    className="w-full h-full transform-gpu"
                >
                    <Image
                        fill
                        src={`${basePath}bg-explosion.png`}
                        alt={`bg-explosion.png`}
                        priority
                        style={{
                            verticalAlign: "middle",
                            position: "absolute",
                            objectFit: "cover",
                            opacity: ".5",
                            mixBlendMode: "color-dodge",
                            filter: "blur(5px)",
                        }}
                    />

                    <ParticlesLinks />
                </div>
            </div>
        </>
    );
}
