import { useCallback, useState } from 'react';
import axios from 'axios';
import { Card, Select, Space, Table, Tooltip, Typography, notification } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import type { Feedback, FeedbackStatus, TriggerAnalysisResponse } from '../../types';
import styles from './team-view.module.scss';

const { Title, Text } = Typography;

interface TeamViewProps {
  feedbacks: Feedback[];
  onUpdateStatus: (id: number, status: FeedbackStatus) => void;
}

const STATUS_OPTIONS: { value: FeedbackStatus; label: string; dot: string }[] = [
  { value: 'AWAITING',     label: 'Beklemede',      dot: '#f97316' },
  { value: 'IN_PROGRESS',  label: 'Planlamaya Al',  dot: '#3b82f6' },
  { value: 'RESOLVED',     label: 'Tamamlandi',     dot: '#22c55e' },
  { value: 'CANCELLED',    label: 'Iptal Edildi',   dot: '#ef4444' },
];

const statusOption = (opt: typeof STATUS_OPTIONS[number]) => (
  <Space size={6}>
    <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: opt.dot, display: 'inline-block', flexShrink: 0 }} />
    <span>{opt.label}</span>
  </Space>
);

export function TeamView({ feedbacks, onUpdateStatus }: TeamViewProps) {
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <Text strong className={styles['id-text']}>{text}</Text>
      ),
    },
    { title: 'Ekran', dataIndex: 'screenName', key: 'screenName' },
    { title: 'Görüş', dataIndex: 'feedbackText', key: 'feedbackText', width: '35%' },
    {
      title: 'Durum',
      key: 'action',
      render: (_: unknown, record: Feedback) => (
        <Select
          value={record.status}
          className={`status-select-premium status-${record.status} ${styles.select}`}
          classNames={{ popup: { root: 'premium-dropdown' } }}
          onChange={(val) => onUpdateStatus(record.id, val)}
          options={STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: statusOption(opt),
          }))}
        />
      ),
    },
  ];

  const pendingCount = feedbacks.filter((f) => !f.isAnalysis).length;

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles['header-text']}>
          <Title level={2} className={styles.title}>Talepler ve Aksiyonlar</Title>
          <Text className={styles.subtitle}>Operasyonel Durum Yönetim Ekranı</Text>
        </div>

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
                {feedbacks.filter((f) => f.status === 'AWAITING').length}
              </Text>
            </div>
          </Space>
        </Card>
      </div>

      <Table
        dataSource={feedbacks}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="custom-table"
      />

      <Tooltip
        title={pendingCount === 0 ? 'Analiz edilecek kayıt yok' : undefined}
        placement="left"
      >
        <button
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
        </button>
      </Tooltip>
    </div>
  );
}
