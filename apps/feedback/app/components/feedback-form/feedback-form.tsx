import React from 'react';
import { Button, Input, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import type { FeedbackFormData } from '../../types';
import styles from './feedback-form.module.scss';

const { TextArea } = Input;
const { Text } = Typography;

const TOPICS = [
  { id: 'hata',      label: 'Hata',    emoji: '🛠️' },
  { id: 'tasarim',   label: 'Tasarım', emoji: '🎨' },
  { id: 'performans',label: 'Hız',     emoji: '⚡' },
  { id: 'oneri',     label: 'Öneri',   emoji: '💡' },
];

interface FeedbackFormProps {
  formData: FeedbackFormData;
  onChange: (data: FeedbackFormData) => void;
  onSubmit: () => void;
}

export function FeedbackForm({ formData, onChange, onSubmit }: FeedbackFormProps) {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.section}>
        <Text strong className={styles.label}>Kategori Seçimi</Text>
        <div className={styles.topicGrid}>
          {TOPICS.map((topic) => {
            const isSelected = formData.topic === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => onChange({ ...formData, topic: topic.id })}
                className={[styles.topicCard, isSelected ? styles.topicCardSelected : ''].join(' ')}
              >
                <span className={styles.topicEmoji}>{topic.emoji}</span>
                <Text
                  strong
                  className={styles.topicLabel}
                  style={{ color: isSelected ? '#002855' : '#8c8c8c' }}
                >
                  {topic.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.textareaSection}>
        <Text strong className={styles.label}>Görüşlerin</Text>
        <TextArea
          className={styles.textarea}
          placeholder="Lütfen yaşadığınız durumu detaylıca anlatın..."
          value={formData.feedback}
          onChange={(e) => onChange({ ...formData, feedback: e.target.value })}
        />
      </div>

      <Button
        type="primary"
        size="large"
        block
        icon={<SendOutlined />}
        onClick={onSubmit}
        disabled={!formData.topic || !formData.feedback}
        style={{ height: 58, fontWeight: 900, background: '#002855', borderRadius: 18 }}
      >
        HEMEN GÖNDER
      </Button>
    </div>
  );
}

export default FeedbackForm;
