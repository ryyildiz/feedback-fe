import { useCallback, useState } from 'react';
import axios from 'axios';
import { Button, Card, Space, Table, Tooltip, Typography, notification } from 'antd';
import { ThunderboltFilled, WarningFilled } from '@ant-design/icons';
import type { Feedback } from '../types';
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
      await axios.post(
        'http://localhost:8080/api/v1/analyses/trigger',
      );
      notifApi.success({
        message: <span className={styles['notif-title']}>Analiz Tamamlandı</span>,
        description: (
          <div className={styles['notif-body']}>
            <span className={styles['notif-text']}>
              Geri bildirimler Gemini tarafından başarıyla analiz edildi.
            </span>
            <div className={styles['notif-badge']}>
              <span className={styles['notif-dot-success']} />
              <span className={styles['notif-badge-text']}>Gemini Analizi Tamamlandı</span>
            </div>
          </div>
        ),
        icon: <ThunderboltFilled className={styles['notif-icon-success']} />,
        placement: 'bottomRight',
        duration: 4,
        className: styles['notif-container'],
      });
    } catch {
      notifApi.error({
        message: <span className={styles['notif-title']}>Analiz Hatası</span>,
        description: (
          <div className={styles['notif-body']}>
            <span className={styles['notif-text']}>
              Analiz tetiklenirken bir hata oluştu.{' '}
              <span className={styles['notif-bold']}>Lütfen tekrar deneyin.</span>
            </span>
            <div className={styles['notif-badge']}>
              <span className={styles['notif-dot-error']} />
              <span className={styles['notif-badge-text']}>Bağlantı Hatası</span>
            </div>
          </div>
        ),
        icon: <WarningFilled className={styles['notif-icon-error']} />,
        placement: 'bottomRight',
        duration: 5,
        className: styles['notif-container'],
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
        <span className={styles['id-text']}>
          {ticketId ?? '—'}
        </span>
      ),
    },
    {
      title: 'Ekran',
      dataIndex: 'screenName',
      key: 'screenName',
      render: (val: string) => (
        <span className={styles['cell-text']}>{val}</span>
      ),
    },
    {
      title: 'Tür',
      dataIndex: 'issueType',
      key: 'issueType',
      render: (val: string) => {
        const labels: Record<string, string> = {
          BUG: 'Hata',
          PERFORMANCE: 'Performans',
          DESIGN: 'Tasarım',
          SUGGESTION: 'Öneri',
        };
        return (
          <span
            className={styles['issue-type-badge']}
            data-type={val}
          >
            {labels[val] ?? val}
          </span>
        );
      },
    },
    {
      title: 'Görüş',
      dataIndex: 'feedbackText',
      key: 'feedbackText',
      render: (val: string) => (
        <span className={styles['feedback-text']}>{val}</span>
      ),
    },
    {
      title: 'Analiz',
      dataIndex: 'isAnalysis',
      key: 'isAnalysis',
      render: (val: boolean) => (
        <span className={val ? styles['badge-analyzed'] : styles['badge-pending']}>
          <span className={val ? styles['badge-dot-analyzed'] : styles['badge-dot-pending']} />
          {val ? 'EDİLDİ' : 'BEKLİYOR'}
        </span>
      ),
    },
  ];

  const pendingCount = feedbacks.filter((f) => !f.isAnalysis).length;

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (a.isAnalysis === b.isAnalysis) return 0;
    return a.isAnalysis ? -1 : 1;
  });

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
        dataSource={sortedFeedbacks}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="custom-table"
      />
    </div>
  );
}
