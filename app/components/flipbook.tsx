import { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import SocialShare from "./SocialShare";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "@/app/styles/FlipbookPage.module.css";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { FlipbookData } from "@/app/types";

const FlipbookComponent = ({
  isPublic,
  flipbookData,
}: {
  isPublic: boolean;
  flipbookData: FlipbookData;
}) => {
  const flipbookRef = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [maxHeight, setMaxHeight] = useState(535);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const updateMaxHeight = () => {
      const vh = window.innerHeight;
      setMaxHeight(Math.floor(vh * 0.8)); // 80% of viewport height
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  useEffect(() => {
    if (flipbookData) {
    setLoadedImages(flipbookData.images);
    setIsLoading(false);
    }
  }, [flipbookData]);

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handlePageFlip = (e: any) => {
    const newPage = e.data + 1;
    if (newPage >= 1 && newPage <= flipbookData.images.length) {
      setPage(newPage);
    }
  };

  const nextPage = () => {
    flipbookRef.current?.pageFlip().flipNext("bottom");
  };

  const prevPage = () => {
    flipbookRef.current?.pageFlip().flipPrev("bottom");
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner message="Preparing your flipbook..." />
      </div>
    );
  }

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {!isPublic && (
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            className="share-button"
            onClick={toggleShareMenu}
            style={{
              zIndex: 2,
              cursor: "pointer",
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              alignItems: "center",
              gap: "5px",
              width: "fit-content",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "50px",
            }}
          >
            <i className="fas fa-share-alt"></i> Share
          </div>

          {showShareMenu && (
            <div
              className="share-menu"
              style={{
                position: "absolute",
                top: "40px",
                right: "10px",
                zIndex: 2,
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <SocialShare url={`${window.location.href}flipbook/${flipbookData.id}`} />
            </div>
          )}
        </div>
      )}

      <div>
        {/* {page === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              cursor: "pointer",
              transition: "opacity 0.5s ease-out",
              opacity: 1,
            }}
            onClick={() => {
              setPage(1);
              const coverElement = document.getElementById("cover");
              const flipbookElement = document.getElementById("flipbook");
              if (coverElement && flipbookElement) {
                coverElement.style.opacity = "0";
                setTimeout(() => {
                  coverElement.style.display = "none";
                  flipbookElement.style.display = "block";
                  setTimeout(() => {
                    flipbookElement.style.opacity = "1";
                  }, 50);
                }, 500);
              }
            }}
            id="cover"
          >
            <img
              src={images[0]} 
              alt="Cover"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ) : ( */}
        <div
          style={{
            opacity: 1,
            transition: "opacity 0.5s ease-in",
            display: page === 0 ? "none" : "block",
            
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              padding: "10px 25px",
            }}
          >
            <div
              className="arrow left"
              onClick={prevPage}
              style={{
                position: "absolute",
                left: "10px",
                cursor: "pointer",
                opacity: page === 1 ? 0.5 : 1,
                zIndex: 1,
              }}
            >
              &#10094;
            </div>
            <div style={{width: "100%"}}>
            <HTMLFlipBook
              width={350}
              height={533}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={300} // Reduced from 400
              maxHeight={maxHeight} // Changed to use viewport height
              maxShadowOpacity={0.5}
              showCover={false} // Changed to true to show cover
              mobileScrollSupport={true}
              className="demo-book"
              ref={flipbookRef as any}
              startPage={0}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={0}
              showPageCorners={true}
              disableFlipByClick={false}
              onFlip={handlePageFlip}
              style={{ margin: "0 auto" }}
            >
              {loadedImages.map((image, index) => (
                <div key={index} className="demoPage">
                  <LazyLoadImage
                    src={image}
                    alt={`Page ${index + 1}`}
                    effect="blur"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </HTMLFlipBook>
            </div>
          
            
            <div
              className="arrow right"
              onClick={nextPage}
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                opacity: page === flipbookData.images.length ? 0.5 : 1, // Changed condition
                zIndex: 1,
              }}
            >
              &#10095;
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "0px 10px", width: "100%" }}>
            <span className="page-info">
              {page} / {flipbookData.images.length}
            </span>
          </div>
          <div style={{ width: "90%", padding: "10px 10px", margin: "0 auto" }}>
            <input
              type="range"
              min="1"
              max={flipbookData.images.length}
              value={page}
              onChange={(e) => {
                const newPage = parseInt(e.target.value);
                setPage(newPage);
                flipbookRef.current?.pageFlip().flip(newPage - 1);
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default FlipbookComponent;
