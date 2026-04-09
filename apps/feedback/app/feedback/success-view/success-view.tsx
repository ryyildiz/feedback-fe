import React from 'react';
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
      <div className={styles.iconWrapper}>
        <CheckCircleOutlined className={styles.successIcon} />
      </div>

      <div className={styles.textBlock}>
        <Title level={3} className={styles.title}>Harika!</Title>
        <Text type="secondary" style={{ fontWeight: 500 }}>
          Fikriniz teknik ekibimize ulaştı.
        </Text>
      </div>

      <div className={styles.ticketBox}>
        <span className={styles.ticketLabel}>TAKİP NUMARASI</span>
        <Title level={2} className={styles.ticketId}>{ticketId}</Title>
      </div>

      <Button
        block
        size="large"
        onClick={onClose}
        style={{ borderRadius: 16, height: 54, fontWeight: 700 }}
      >
        KAPAT
      </Button>
    </div>
  );
}

export default SuccessView;
