// components/CoverImagePicker.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

type CoverImagePickerProps = {
  onFileSelected: (fileContent: string | null) => void;
};

const CoverImagePicker = ({ onFileSelected }: CoverImagePickerProps) => {
  const [selectedImage, setSelectedImage] = useState(false);

  const { openFilePicker, filesContent, plainFiles, clear, errors, loading } =
    useFilePicker({
      multiple: false,
      accept: "image/*",
      readAs: "DataURL",
      onFilesSuccessfullySelected: () => {
        setSelectedImage(true);
      },
      onClear: () => {
        setSelectedImage(false);
      },
    });

  useEffect(() => {
    if (filesContent.length > 0) {
      onFileSelected(filesContent[0].content); // Base64-encoded file content.
    }
  }, [filesContent, onFileSelected]);

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => openFilePicker()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {loading ? "Loading..." : "Select Cover Image"}
      </button>
      {filesContent.length > 0 && (
        <img
          src={filesContent[0].content}
          alt="Cover Preview"
          className="mt-2 max-h-64 w-full object-cover rounded shadow"
        />
      )}
      {errors.length > 0 && (
        <div className="text-red-500 text-sm">
          {/* {errors[0]?.fileSizeTooSmall
            ? "File is too small."
            : "An error occurred during the file upload."} */}{" "}
          error
        </div>
      )}
    </div>
  );
};

export default CoverImagePicker;
