import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./css/FlipbookPage.module.css";
import FlipbookComponent from "./flipbook";

export interface FlipbookData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
}

const SharedFlipbook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flipbookData, setFlipbookData] = useState<FlipbookData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlipbookData = async () => {
      try {
        const response = await fetch(`https://flipbook-api.yougazine.com/get-flipbook?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch flipbook data');
        }
        const data= await response.json();
        const flipbookData = {
          id: data._id,
          images: data.images,
          coverImage: data.previewImage,
          title: data.pdfName,
          description: "Your PDF converted to a flipbook",
  
        }
        setFlipbookData(flipbookData);
      } catch (err) {
        setError("Failed to load the flipbook. Please try again later.");
      }
    };

    fetchFlipbookData();
  }, [id]);



  if (error || !flipbookData) {
    return <div className={styles.error}>{error}</div>;
  }

  const { title, description, coverImage } = flipbookData;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={coverImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="pinterest" content="nopin" />
        <meta name="linkedin:title" content={title} />
        <meta name="linkedin:description" content={description} />
      </Helmet>
      <div className={styles.sharedFlipbook}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <p className={styles.welcome}>
            Welcome to this interactive flipbook experience!
          </p>
        </header>
        <div className={styles.flipbookContainer}>
          <FlipbookComponent   isPublic={true} flipbookData={flipbookData}/>
        </div>
        <footer className={styles.footer}>
          <p>Enjoy flipping through the pages of {flipbookData.title}"</p>
          <p>Total pages: {flipbookData.images.length}</p>
        </footer>
      </div>
    </>
  );
};

export default SharedFlipbook;
