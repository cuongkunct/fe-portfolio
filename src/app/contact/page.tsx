"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        e.currentTarget.reset();

        // Reset success message after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <div className="container mx-auto py-12 px-4 md:px-8 max-w-5xl">
            <div className="space-y-6 text-center mb-16">
                <h1 className="text-4xl font-bold font-heading">Get In Touch</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Have a question or want to work together? Leave me a message and I will get back to you as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Contact Information */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="h-full bg-card/60 backdrop-blur-sm shadow-md border-primary/10">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Reach out through the form or using details below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold hover:text-primary transition-colors">
                                        {siteConfig.contact.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="font-semibold hover:text-primary transition-colors">
                                        {siteConfig.contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                                    <p className="font-semibold">
                                        {siteConfig.contact.location}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-3">
                    <Card className="h-full shadow-lg border-primary/20 p-2 relative overflow-hidden">
                        {/* Background design element */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />

                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Name
                                        </label>
                                        <Input id="name" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Email
                                        </label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="How can I help you?" required />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Your message here..."
                                        className="min-h-[150px] resize-y"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full sm:w-auto px-8" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : isSuccess ? (
                                        "Message Sent!"
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>

                                {isSuccess && (
                                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center sm:text-left transition-opacity">
                                        Thank you! Your message has been successfully sent.
                                    </p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
