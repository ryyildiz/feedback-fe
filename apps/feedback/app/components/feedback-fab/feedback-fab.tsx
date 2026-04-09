import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import styles from './feedback-fab.module.scss';

interface FeedbackFabProps {
  onClick: () => void;
}

export function FeedbackFab({ onClick }: FeedbackFabProps) {
  return (
    <div className={styles.fab} onClick={onClick}>
      <CommentOutlined className={styles.fabIcon} />
      <span className={styles.fabText}>FİKRİNİ PAYLAŞ</span>
    </div>
  );
}

export default FeedbackFab;
