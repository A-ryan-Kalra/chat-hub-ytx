"use client";

import { UploadDropzone } from "@/lib/uploadThing";
import React from "react";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20  rounded-full  ">
        <Image
          fill
          src={value}
          alt="upload"
          className=" object-cover p-0.5 rounded-full"
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full shadow-sm absolute top-0 right-0 "
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
}

export default FileUpload;
