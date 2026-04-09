import { Button, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './success-view.module.scss';

const { Title, Text } = Typography;

interface SuccessViewProps {
  ticketId: string;
  onClose: () => void;
}

export function SuccessView({ ticketId, onClose }: SuccessViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles['icon-wrapper']}>
        <CheckCircleOutlined className={styles['success-icon']} />
      </div>

      <div className={styles['text-block']}>
        <Title level={3} className={styles.title}>Harika!</Title>
        <Text type="secondary" className={styles.subtitle}>
          Fikriniz teknik ekibimize ulaştı.
        </Text>
      </div>

      <div className={styles['ticket-box']}>
        <span className={styles['ticket-label']}>TAKİP NUMARASI</span>
        <Title level={2} className={styles['ticket-id']}>{ticketId}</Title>
      </div>

      <Button
        block
        size="large"
        onClick={onClose}
        className={styles['close-btn']}
      >
        KAPAT
      </Button>
    </div>
  );
}
