import  { useState } from 'react'
import FlipbookComponent from './flipbook';
import UploadPage from './UploadPage';
import { FlipbookData } from './FlipBookPage';

const HomeLayout = () => {
  const [flipbookData, setFlipbookData] = useState<FlipbookData | null>(null);

  return (
    <>
     {flipbookData &&  flipbookData.images.length > 0 ? (
        <FlipbookComponent  isPublic={false} flipbookData={flipbookData} />
      ) : (
        <UploadPage setFlipbookData={setFlipbookData} />
      )
    } </>
  
  )
}

export default HomeLayout