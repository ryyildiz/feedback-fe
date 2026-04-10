import { useCallback, useState } from 'react';
import axios from 'axios';
import { Button, Card, Space, Table, Tooltip, Typography, notification } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import type { Feedback, TriggerAnalysisResponse } from '../types';
import styles from './feedback-board.module.scss';

const { Title, Text } = Typography;

interface FeedbackBoardProps {
  feedbacks: Feedback[];
}

export function FeedbackBoard({ feedbacks }: FeedbackBoardProps) {
  const [notifApi, contextHolder] = notification.useNotification();

  const [isTriggering, setIsTriggering] = useState(false);

  const handleTriggerAnalysis = useCallback(async () => {
    const unanalyzedIds = feedbacks
      .filter((f) => !f.isAnalysis)
      .map((f) => f.id);

    if (unanalyzedIds.length === 0) {
      notifApi.info({
        message: 'Analiz Yapılacak Kayıt Yok',
        description: 'Tüm geri bildirimler zaten analiz edilmiş.',
        placement: 'bottomRight',
      });
      return;
    }

    setIsTriggering(true);
    try {
      const { data } = await axios.post<TriggerAnalysisResponse>(
        'http://localhost:8080/api/v1/analyses/trigger',
      );
      notifApi.success({
        message: 'Analiz Başlatıldı',
        description: `${data.triggeredCount} geri bildirim Gemini analizine gönderildi.`,
        placement: 'bottomRight',
        duration: 4,
      });
    } catch {
      notifApi.error({
        message: 'Analiz Hatası',
        description: 'Analiz tetiklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        placement: 'bottomRight',
        duration: 5,
      });
    } finally {
      setIsTriggering(false);
    }
  }, [feedbacks, notifApi]);

  const columns = [
    {
      title: 'Ticket',
      dataIndex: 'ticketId',
      key: 'ticketId',
      render: (ticketId: string) => (
        <Text strong className={styles['id-text']}>
          {ticketId ?? '—'}
        </Text>
      ),
    },
    { title: 'Ekran', dataIndex: 'screenName', key: 'screenName' },
    {
      title: 'Tür',
      dataIndex: 'issueType',
      key: 'issueType',
      render: (val: string) =>
        ({
          BUG: 'Hata',
          PERFORMANCE: 'Performans',
          DESIGN: 'Tasarım',
          SUGGESTION: 'Öneri',
        })[val] ?? val,
    },
    {
      title: 'Görüş',
      dataIndex: 'feedbackText',
      key: 'feedbackText',
    },
    {
      title: 'Analiz',
      dataIndex: 'isAnalysis',
      key: 'isAnalysis',
      render: (val: boolean) => (
        <span
          className={val ? styles['badge-analyzed'] : styles['badge-pending']}
        >
          {val ? 'Edildi' : 'Bekliyor'}
        </span>
      ),
    },
  ];

  const pendingCount = feedbacks.filter((f) => !f.isAnalysis).length;

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles['header-text']}>
          <Title level={2} className={styles.title}>Talepler</Title>
          <Text className={styles.subtitle}>Operasyonel Durum Yönetim Ekranı</Text>
        </div>

        <div className={styles['header-right']}>
          <Card variant="borderless" size="small" className={styles['stat-card']}>
            <Space separator={<div className={styles.divider} />} size="large" className={styles['stat-space']}>
              <div className={styles['stat-item']}>
                <Text className={styles['stat-label']}>TOPLAM HAVUZ</Text>
                <br />
                <Text strong className={styles['stat-value']}>{feedbacks.length}</Text>
              </div>
              <div className={styles['stat-item']}>
                <Text className={styles['stat-label-pending']}>BEKLEYEN</Text>
                <br />
                <Text strong className={styles['stat-value-pending']}>
                  {pendingCount}
                </Text>
              </div>
            </Space>
          </Card>

          <Tooltip
            title={pendingCount === 0 ? 'Analiz edilecek kayıt yok' : undefined}
            placement="left"
          >
            <Button
              className={styles['ai-fab']}
              onClick={handleTriggerAnalysis}
              disabled={isTriggering || pendingCount === 0}
              aria-label="Gemini ile analiz başlat"
            >
              {isTriggering ? (
                <span className={styles['ai-fab-spinner']} />
              ) : (
                <ThunderboltFilled className={styles['ai-fab-icon']} />
              )}
              <span className={styles['ai-fab-label']}>
                {isTriggering ? 'Analiz ediliyor...' : 'AI Analiz'}
              </span>
              {pendingCount > 0 && !isTriggering && (
                <span className={styles['ai-fab-badge']}>{pendingCount}</span>
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table
        dataSource={feedbacks}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="custom-table"
      />
    </div>
  );
}
