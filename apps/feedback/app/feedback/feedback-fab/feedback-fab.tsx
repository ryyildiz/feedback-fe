import { MessageOutlined } from '@ant-design/icons';
import styles from './feedback-fab.module.scss';

interface FeedbackFabProps {
  onClick: () => void;
}

export function FeedbackFab({ onClick }: FeedbackFabProps) {
  return (
    <div className={styles.fab} onClick={onClick}>
      <MessageOutlined className={styles['fab-icon']} />
      <span className={styles['fab-text']}>FİKRİNİ PAYLAŞ</span>
    </div>
  );
}
