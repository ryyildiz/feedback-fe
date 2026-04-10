import { Button, Input, Typography, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useFeedbackStore } from '../../store/feedback.store';
import type { IssueType } from '../../types';
import styles from './feedback-form.module.scss';

const { TextArea } = Input;
const { Text } = Typography;

const TOPICS: { id: IssueType; label: string; emoji: string }[] = [
  { id: 'BUG',         label: 'Hata',    emoji: '🛠️' },
  { id: 'DESIGN',      label: 'Tasarım', emoji: '🎨' },
  { id: 'PERFORMANCE', label: 'Hız',     emoji: '⚡' },
  { id: 'SUGGESTION',  label: 'Öneri',   emoji: '💡' },
];

export function FeedbackForm() {
  const { formData, setFormData, submitFeedback, isSubmitting, submitError } =
    useFeedbackStore();

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles.section}>
        <Text strong className={styles.label}>Kategori Seçimi</Text>
        <div className={styles['topic-grid']}>
          {TOPICS.map((topic) => {
            const isSelected = formData.issueType === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => setFormData({ issueType: topic.id })}
                className={[
                  styles['topic-card'],
                  isSelected ? styles['topic-card-selected'] : '',
                ].join(' ')}
              >
                <span className={styles['topic-emoji']}>{topic.emoji}</span>
                <Text
                  strong
                  className={[
                    styles['topic-label'],
                    isSelected
                      ? styles['topic-label-active']
                      : styles['topic-label-default'],
                  ].join(' ')}
                >
                  {topic.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles['textarea-section']}>
        <Text strong className={styles.label}>Görüşlerin</Text>
        <TextArea
          className={styles.textarea}
          placeholder="Lütfen yaşadığınız durumu detaylıca anlatın..."
          value={formData.feedbackText}
          onChange={(e) => setFormData({ feedbackText: e.target.value })}
        />
      </div>

      {submitError && (
        <Text type="danger" className={styles['error-text']}>
          {submitError}
        </Text>
      )}

      <Button
        type="primary"
        size="large"
        block
        icon={isSubmitting ? <Spin size="small" /> : <SendOutlined />}
        onClick={submitFeedback}
        disabled={!formData.issueType || !formData.feedbackText || isSubmitting}
        className={styles['submit-btn']}
      >
        {isSubmitting ? 'GÖNDERİLİYOR…' : 'HEMEN GÖNDER'}
      </Button>
    </div>
  );
}

