"use client";

import { useState } from "react";
import UploadPage from "@/app/components/UploadPage";
import { FlipbookData } from "@/app/types";
import FlipbookComponent from "./components/flipbook";

export default function Home() {
  const [flipbookData, setFlipbookData] = useState<FlipbookData | null>(null);
  console.log("hey");

  return (
    <main>
      {flipbookData && flipbookData.images.length > 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <FlipbookComponent isPublic={false} flipbookData={flipbookData} />
        </div>
      ) : (
        <UploadPage setFlipbookData={setFlipbookData} />
      )}
    </main>
  );
}
