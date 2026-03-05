"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadPreviewProps {
    value: string;
    onChange: (url: string) => void;
}

export function ImageUploadPreview({ value, onChange }: ImageUploadPreviewProps) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Mock upload process by creating object URL
        const url = URL.createObjectURL(file);
        onChange(url);
    };

    const removeImage = () => {
        onChange('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            {value ? (
                <div className="relative rounded-md overflow-hidden aspect-video border group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button type="button" variant="destructive" size="sm" onClick={removeImage}>
                            <X className="w-4 h-4 mr-2" /> Remove Image
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <Upload className="w-8 h-8 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">Click or drag image here</p>
                    <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP</p>
                </div>
            )}
        </div>
    );
}
