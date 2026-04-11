import { useState } from 'react';
import { Button, notification } from 'antd';
import { ArrowLeftOutlined, ThunderboltFilled } from '@ant-design/icons';
import { triggerAnalysis } from '../../services/feedback.service';
import type { PlanningTask } from '../feedback-planning.types';
import styles from './planning-empty-state.module.scss';

interface PlanningEmptyStateProps {
  onGoBack?: () => void;
  onAnalysisComplete: (tasks: PlanningTask[]) => void;
}

export function PlanningEmptyState({ onGoBack, onAnalysisComplete }: PlanningEmptyStateProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async () => {
    setIsLoading(true);
    try {
      const tasks = await triggerAnalysis();
      onAnalysisComplete(tasks);
    } catch {
      notification.error({
        message: 'Analiz Başlatılamadı',
        description: 'Servis bağlantısı sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        placement: 'bottomRight',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles['icon-wrapper']}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>

        <h2 className={styles.title}>Planlama Havuzu Henüz Boş</h2>
        <p className={styles.description}>
          Henüz AI tarafından analiz edilmiş ve gruplanmış bir aday görev bulunmuyor.
          Geri bildirimleri işlemek için önce analiz sürecini başlatmalısınız.
        </p>

        <div className={styles.actions}>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            className={styles['btn-secondary']}
            onClick={onGoBack}
          >
            Deneyim Havuzuna Dön
          </Button>
          <Button
            size="large"
            icon={<ThunderboltFilled />}
            className={styles['btn-primary']}
            loading={isLoading}
            onClick={handleTrigger}
          >
            AI Analizi Başlat
          </Button>
        </div>
      </div>
    </div>
  );
}
