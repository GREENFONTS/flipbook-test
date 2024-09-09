'use client';
import styles from '@/app/styles/FlipbookPage.module.css';
import FlipbookComponent from '@/app/components/flipbook';
import { FlipbookData } from '../types';

interface Props {
  flipbookData: FlipbookData;
}

export default function FlipbookClient({ flipbookData }: Props) {

  return (
    <div className={styles.sharedFlipbook}>
    <header className={styles.header}>
      <h1>{flipbookData.title}</h1>
      <p className={styles.welcome}>
        Welcome to this interactive flipbook experience!
      </p>
    </header>
    <div className={styles.flipbookContainer}>
      <FlipbookComponent isPublic={true} flipbookData={flipbookData} />
    </div>
    <footer className={styles.footer}>
      <p>Enjoy flipping through the pages of {flipbookData.title}</p>
      <p>Total pages: {flipbookData.images.length}</p>
    </footer>
  </div>
  );
}