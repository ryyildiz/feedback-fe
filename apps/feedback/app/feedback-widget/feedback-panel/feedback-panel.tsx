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
        classNames={{ body: styles['card-body'], header: styles['card-header'] }}
        title={
          <div className={styles['panel-header']}>
            <Space size="middle">
              <div className={styles['header-icon']}>
                <StarFilled className={styles['star-icon']} />
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

