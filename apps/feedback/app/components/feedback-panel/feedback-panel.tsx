import { Button, Card, Space, Typography } from 'antd';
import { CloseOutlined, StarFilled } from '@ant-design/icons';
import type { FeedbackFormData } from '../../types';
import { FeedbackForm } from '../feedback-form/feedback-form';
import { SuccessView } from '../success-view/success-view';
import styles from './feedback-panel.module.scss';

const { Text } = Typography;

interface FeedbackPanelProps {
  isSubmitted: boolean;
  lastTicketId: string;
  formData: FeedbackFormData;
  onClose: () => void;
  onChange: (data: FeedbackFormData) => void;
  onSubmit: () => void;
}

export function FeedbackPanel({
  isSubmitted,
  lastTicketId,
  formData,
  onClose,
  onChange,
  onSubmit,
}: FeedbackPanelProps) {
  return (
    <div className={styles.overlay}>
      <Card
        variant="borderless"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 40,
          boxShadow: '0 40px 80px -15px rgba(0,40,85,0.35)',
          overflow: 'hidden',
        }}
        styles={{
          body: {
            padding: '24px',
            height: 'calc(100% - 74px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          },
          header: { background: '#002855', padding: '18px 24px', border: 0 },
        }}
        title={
          <div className={styles.panelHeader}>
            <Space size="middle">
              <div className={styles.headerIcon}>
                <StarFilled style={{ color: '#002855' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <Text className={styles.panelTitle}>Birlikte Geliştirelim</Text>
                <Text className={styles.panelSubtitle}>
                  Deneyimi Paylaş, Turkcell'i Güçlendir
                </Text>
              </div>
            </Space>
            <Button
              type="text"
              shape="circle"
              data-testid="panel-close-btn"
              icon={<CloseOutlined style={{ color: '#fff' }} />}
              onClick={onClose}
            />
          </div>
        }
      >
        {!isSubmitted ? (
          <FeedbackForm formData={formData} onChange={onChange} onSubmit={onSubmit} />
        ) : (
          <SuccessView ticketId={lastTicketId} onClose={onClose} />
        )}
      </Card>
    </div>
  );
}

export default FeedbackPanel;
