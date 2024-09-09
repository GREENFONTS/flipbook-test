import { Metadata } from 'next';
import { FlipbookData } from '@/app/types';
import FlipbookClient from '@/app/components/FlipBookClient';



interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const flipbookData = await getFlipbookData(params.id);
  
  return {
    title: flipbookData.title,
    description: flipbookData.description,
    openGraph: {
      title: flipbookData.title,
      description: flipbookData.description,
      images: [flipbookData.coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: flipbookData.title,
      description: flipbookData.description,
      images: [flipbookData.coverImage],
    },
  };
}

async function getFlipbookData(id: string): Promise<FlipbookData> {
  const response = await fetch(`https://flipbook-api.yougazine.com/get-flipbook?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch flipbook data');
  }
  const data = await response.json();
  return {
    id: data._id,
    images: data.images,
    coverImage: data.previewImage,
    title: data.pdfName,
    description: "Your PDF converted to a flipbook",
  };
}

export default async function FlipbookPage({ params }: Props) {
  const flipbookData = await getFlipbookData(params.id);

  return (
    <FlipbookClient flipbookData={flipbookData} />
  );
}