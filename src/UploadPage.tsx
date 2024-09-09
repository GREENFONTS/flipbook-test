import React, { useState } from "react";
import { FaCloudUploadAlt, FaFolder, FaFilePdf, FaTimes } from "react-icons/fa";
import styles from "./css/UploadPage.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { FlipbookData } from "./FlipBookPage";

const UploadPage = ({
  setFlipbookData,
}: {
  setFlipbookData: React.Dispatch<React.SetStateAction<FlipbookData | null>>;
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      } else {
        alert("Please select a PDF file.");
      }
    } else {
      alert("No file selected. Please choose a PDF file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    } else {
      alert("Please drop a PDF file.");
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("pdf", uploadedFile);

    try {
      const response = await fetch(
        "https://flipbook-api.yougazine.com/final-pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const flipbookData = {
        id: result._id,
        images: result.images,
        coverImage: result.previewImage,
        title: result.pdfName,
        description: "Your PDF converted to a flipbook",

      }
      setFlipbookData(flipbookData);

      setIsUploading(false);
      setUploadedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      alert("An error occurred while uploading the file. Please try again.");
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className={styles.uploadPage}>
      <h1>Upload PDF</h1>
      <div className={styles.uploadContainer}>
        <div
          className={styles.dropZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FaCloudUploadAlt size={48} />
          <p>Click to upload or drag and drop</p>
          <span>PDF files only</span>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileUpload}
            accept=".pdf"
            className={styles.fileInput}
          />
        </div>
        <div className={styles.divider}>OR</div>
        <button
          className={styles.browseButton}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FaFolder /> Browse Files
        </button>
      </div>

      {uploadedFile && (
        <div className={styles.fileList}>
          <div className={styles.fileItem}>
            <FaFilePdf />
            <span>{uploadedFile.name}</span>
            <button onClick={removeFile} className={styles.removeButton}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {isUploading && <LoadingSpinner message="Uploading your PDF..." />}

      {!isUploading && uploadedFile && (
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit PDF
        </button>
      )}
    </div>
  );
};

export default UploadPage;
