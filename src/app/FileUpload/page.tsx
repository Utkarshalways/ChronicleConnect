'use client';

import React, { useState, useRef } from 'react';
import { storage, ID } from '@/lib/appwrite';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const BUCKET_ID = '687dc47c000778f8ab2a'; // Your Appwrite bucket ID

export default function FileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string>('');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [editorKey, setEditorKey] = useState(0);

  // Prepare BlockNote editor
  const editor = useCreateBlockNote();

  // File input ref for resetting the field
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection: preview only, do NOT upload yet
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Add only unique files by name (optional: for preventing duplicates)
    const newFiles = Array.from(files).filter(f =>
      !selectedFiles.some(sf => sf.name === f.name && sf.size === f.size)
    );

    setSelectedFiles(prev => [...prev, ...newFiles]);
    setImagePreviews(prev => [...prev, ...newFiles.map(f => URL.createObjectURL(f))]);

    // Reset file input so same file can be re-added if needed
    if (inputRef.current) inputRef.current.value = '';
  };

  // Remove a selected (not yet uploaded) image
  const handleRemoveImage = (idx: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== idx));
    setImagePreviews(previews => {
      URL.revokeObjectURL(previews[idx]);
      return previews.filter((_, i) => i !== idx);
    });
  };

  // Main submit function: upload images, get BlockNote content, show result
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage('');
    setUploadedUrls([]);
    if (selectedFiles.length === 0) {
      setFormMessage('Please add at least one image.');
      return;
    }
    setIsLoading(true);
    try {
      // 1️⃣ Upload images to Appwrite
      const appwriteUrls: string[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const response = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          selectedFiles[i]
        );
        const url = storage.getFileView(BUCKET_ID, response.$id);
        appwriteUrls.push(url);
      }

      // 2️⃣ Get BlockNote content as Markdown (or switch to .blocksToHTML for HTML)
      const contentMarkdown = await editor.blocksToMarkdownLossy(editor.document);

      // 3️⃣ Use image URLs + content as needed (send to backend, DB etc.)
      // This demo logs it:
      setFormMessage('Form submitted! Check console for data.');
      setUploadedUrls(appwriteUrls);
      console.log({
        blockNoteContent: contentMarkdown,
        uploadedImageUrls: appwriteUrls,
      });

      // 4️⃣ Reset: clear files, previews, BlockNote
      setSelectedFiles([]);
      setImagePreviews([]);
      setEditorKey(k => k + 1); // Remount BlockNote
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setFormMessage('Form submission failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-2">Post with Images &amp; Rich Text</h1>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={isLoading}
          className="block mb-2 bg-white"
        />

        {imagePreviews.length > 0 && (
          <div>
            <p className="mt-2">Selected Previews (remove any):</p>
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Selected ${idx + 1}`}
                    className="mt-2 border rounded w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    title="Remove"
                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full shadow opacity-80 group-hover:opacity-100"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Remount the editor with new key on reset */}
        <BlockNoteView key={editorKey} editor={editor} className="w-full" />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {formMessage && (
          <div className="mt-3 text-sm text-green-600">{formMessage}</div>
        )}

        {uploadedUrls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">Uploaded Images (Appwrite URLs):</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {uploadedUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Uploaded ${idx + 1}`}
                  className="border rounded w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
