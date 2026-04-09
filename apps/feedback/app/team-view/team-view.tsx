import { Card, Select, Space, Table, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { Feedback } from '../../types';
import styles from './team-view.module.scss';

const { Title, Text } = Typography;

interface TeamViewProps {
  feedbacks: Feedback[];
  onUpdateStatus: (id: string, status: Feedback['status']) => void;
}

export function TeamView({ feedbacks, onUpdateStatus }: TeamViewProps) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <Text strong style={{ fontStyle: 'italic', color: '#002855' }}>{text}</Text>
      ),
    },
    { title: 'Ekran',  dataIndex: 'screenName', key: 'screenName' },
    { title: 'Görüş',  dataIndex: 'feedback',   key: 'feedback', width: '35%' },
    {
      title: 'Durum',
      key: 'action',
      align: 'right' as const,
      render: (_: unknown, record: Feedback) => (
        <Select
          value={record.status}
          className={`status-select-premium status-${record.status}`}
          popupClassName="premium-dropdown"
          style={{ width: 190 }}
          onChange={(val) => onUpdateStatus(record.id, val)}
          options={[
            { value: 'awaiting',  label: <Space><ClockCircleOutlined />  <span>Beklemede</span></Space> },
            { value: 'backlog',   label: <Space><DashboardOutlined />    <span>Planlamaya Al</span></Space> },
            { value: 'resolved',  label: <Space><CheckCircleOutlined />  <span>Tamamlandı</span></Space> },
            { value: 'canceled',  label: <Space><CloseCircleOutlined />  <span>İptal Edildi</span></Space> },
          ]}
        />
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Title level={2} className={styles.title}>Talepler ve Aksiyonlar</Title>
          <Text className={styles.subtitle}>Operasyonel Durum Yönetim Ekranı</Text>
        </div>

        <Card
          variant="borderless"
          size="small"
          style={{ borderRadius: 20, background: '#fff', boxShadow: '0 8px 24px rgba(0,40,85,0.04)' }}
        >
          <Space
            split={<div className={styles.divider} />}
            size="large"
            style={{ padding: '4px 12px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Text className={styles.statLabel}>TOPLAM HAVUZ</Text>
              <br />
              <Text strong className={styles.statValue}>{feedbacks.length}</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text style={{ fontSize: 10, fontWeight: 900, color: '#faad14' }}>BEKLEYEN</Text>
              <br />
              <Text strong className={styles.statValuePending}>
                {feedbacks.filter((f) => f.status === 'awaiting').length}
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
    </div>
  );
}

export default TeamView;
