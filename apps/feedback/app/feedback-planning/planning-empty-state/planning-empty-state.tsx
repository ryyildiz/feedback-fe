import { useState } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, ThunderboltFilled } from '@ant-design/icons';
import { triggerAnalysis } from '../../services/feedback.service';
import type { PlanningTask } from '../feedback-planning.types';
import { useAppNotification } from '../../hooks/use-app-notification';
import styles from './planning-empty-state.module.scss';

interface PlanningEmptyStateProps {
  onGoBack?: () => void;
  onAnalysisComplete: (tasks: PlanningTask[]) => void;
}

export function PlanningEmptyState({ onGoBack, onAnalysisComplete }: PlanningEmptyStateProps) {
  const { contextHolder, showError } = useAppNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async () => {
    setIsLoading(true);
    try {
      const tasks = await triggerAnalysis();
      onAnalysisComplete(tasks);
    } catch {
      showError('Analiz Hatası', 'Analiz tetiklenirken bir hata oluştu.', 'Bağlantı Hatası');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.card}>
        <div className={styles['icon-wrapper']}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
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
