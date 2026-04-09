import { Button, Card, Space } from 'antd';
import { CloseOutlined, StarFilled } from '@ant-design/icons';
import { useFeedbackStore } from '../../store/feedback.store';
import { FeedbackForm } from '../feedback-form/feedback-form';
import { SuccessView } from '../success-view/success-view';
import styles from './feedback-panel.module.scss';

interface FeedbackPanelProps {
  onClose: () => void;
}

export function FeedbackPanel({ onClose }: FeedbackPanelProps) {
  const { isSubmitted, lastTicketId } = useFeedbackStore();

  return (
    <div className={styles.overlay}>
      <Card
        variant="borderless"
        className={styles.card}
        styles={{
          body:   { padding: '1.5rem', height: 'calc(100% - 4.625rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
          header: { background: '#002855', padding: '1.125rem 1.5rem', border: 0 },
        }}
        title={
          <div className={styles['panel-header']}>
            <Space size="middle">
              <div className={styles['header-icon']}>
                <StarFilled style={{ color: '#002855' }} />
              </div>
              <div className={styles['header-text']}>
                <span className={styles['panel-title']}>Birlikte Geliştirelim</span>
                <span className={styles['panel-subtitle']}>
                  Deneyimi Paylaş, Turkcell'i Güçlendir
                </span>
              </div>
            </Space>
            <Button
              type="text"
              shape="circle"
              data-testid="panel-close-btn"
              icon={<CloseOutlined className={styles['close-icon']} />}
              onClick={onClose}
            />
          </div>
        }
      >
        {!isSubmitted ? (
          <FeedbackForm />
        ) : (
          <SuccessView ticketId={lastTicketId} onClose={onClose} />
        )}
      </Card>
    </div>
  );
}

