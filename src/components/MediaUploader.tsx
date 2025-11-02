"use client";

import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface MediaUploaderProps {
  media: File[];
  setMedia: (files: File[]) => void;
}

export function MediaUploader({ media, setMedia }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);

    // ✅ Validate file type and size
    const validFiles = newFiles.filter((file) => {
      const isValidType = ["image/png", "image/jpeg", "video/mp4"].includes(
        file.type
      );
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50 MB
      return isValidType && isValidSize;
    });

    if (validFiles.length < newFiles.length) {
      alert("Some files were skipped (invalid type or too large)");
    }

    setMedia([...media, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 transition-colors",
        dragActive ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.mp4"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
        <Upload className="w-10 h-10 mb-2 text-muted-foreground" />
        <p className="font-medium">Drag and drop your files here</p>
        <p className="text-sm mb-4">
          or click to select files (PNG, JPG, MP4 – Max 50 MB)
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Select Files
        </Button>
      </div>

      {/* Preview section */}
      {media.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {media.map((file, index) => (
            <div
              key={index}
              className="relative rounded-md overflow-hidden border border-border group"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-32 object-cover"
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-background/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
