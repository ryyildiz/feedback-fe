import React, { useState } from 'react';
import {
Button,
Input,
Select,
Table,
Badge,
Typography,
ConfigProvider,
Card,
Space,
Segmented,
} from 'antd';
import {
CommentOutlined,
StarFilled,
CloseOutlined,
SendOutlined,
DashboardOutlined,
CheckCircleOutlined,
ClockCircleOutlined,
CloseCircleOutlined,
EnvironmentOutlined,
UserOutlined,
TeamOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

// --- TİP TANIMLAMALARI ---
interface Feedback {
id: string;
topic: string;
screenName: string;
url: string;
feedback: string;
status: 'awaiting' | 'backlog' | 'resolved' | 'canceled';
date: string;
}

const App: React.FC = () => {
const [currentRole, setCurrentRole] = useState<'user' | 'team'>('user');
const [isOpen, setIsOpen] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [lastTicketId, setLastTicketId] = useState('');
const [formData, setFormData] = useState({ topic: '', feedback: '' });

const [feedbacks, setFeedbacks] = useState<Feedback[]>([
{
id: 'TK-8421',
topic: 'Tasarım',
screenName: 'Fatura Detayları',
url: '/hesabim/fatura/detay',
feedback:
'Karanlık modda fatura tutarı zor okunuyor, kontrast artırılmalı.',
status: 'awaiting',
date: '12.10.2023',
},
]);

// --- FONKSİYONLAR ---
const handleUpdateStatus = (id: string, newStatus: Feedback['status']) => {
setFeedbacks((prev) =>
prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)),
);
};

const closeAndReset = () => {
setIsOpen(false);
setTimeout(() => {
setIsSubmitted(false);
setFormData({ topic: '', feedback: '' });
}, 300);
};

const handleSubmit = () => {
if (!formData.topic || !formData.feedback) return;
const tId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
setLastTicketId(tId);

    const newEntry: Feedback = {
      id: tId,
      topic: formData.topic.charAt(0).toUpperCase() + formData.topic.slice(1),
      screenName: 'Fatura Detayları',
      url: '/hesabim/fatura/detay',
      feedback: formData.feedback,
      status: 'awaiting',
      date: new Date().toLocaleDateString('tr-TR'),
    };

    setFeedbacks((prev) => [newEntry, ...prev]);
    setIsSubmitted(true);
};

const columns = [
{
title: 'ID',
dataIndex: 'id',
key: 'id',
render: (text: string) => (
<Text strong style={{ fontStyle: 'italic', color: '#002855' }}>
{text}
</Text>
),
},
{ title: 'Ekran', dataIndex: 'screenName', key: 'screenName' },
{ title: 'Görüş', dataIndex: 'feedback', key: 'feedback', width: '35%' },
{
title: 'Durum',
key: 'action',
align: 'right' as const,
render: (_: any, record: Feedback) => (
<Select
value={record.status}
className={`status-select-premium status-${record.status}`}
popupClassName="premium-dropdown"
style={{ width: 190 }}
onChange={(val) => handleUpdateStatus(record.id, val)}
options={[
{
value: 'awaiting',
label: (
<Space>
<ClockCircleOutlined /> <span>Beklemede</span>
</Space>
),
},
{
value: 'backlog',
label: (
<Space>
<DashboardOutlined /> <span>Planlamaya Al</span>
</Space>
),
},
{
value: 'resolved',
label: (
<Space>
<CheckCircleOutlined /> <span>Tamamlandı</span>
</Space>
),
},
{
value: 'canceled',
label: (
<Space>
<CloseCircleOutlined /> <span>İptal Edildi</span>
</Space>
),
},
]}
/>
),
},
];

return (
<ConfigProvider
theme={{
token: {
colorPrimary: '#002855',
borderRadius: 14,
fontFamily: 'Noto Sans, sans-serif',
},
components: {
Segmented: {
itemSelectedBg: '#002855',
itemSelectedColor: '#fff',
trackBg: '#f1f3f6',
},
Table: {
headerBg: '#f8fafc',
headerColor: '#64748b',
},
},
}}
>
<div style={layoutStyles.container}>
<style>{`
/* FAB Genişleme Efekti ve İkon Hizalaması */
.fab-trigger {
position: fixed;
bottom: 40px;
right: 40px;
height: 72px;
padding: 0 22px;
background: #FFD200;
border: 4px solid #fff;
border-radius: 36px;
box-shadow: 0 15px 35px rgba(255, 210, 0, 0.4);
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
z-index: 1000;
color: #002855;
width: 72px;
overflow: hidden;
}
.fab-trigger:hover {
width: 220px;
transform: scale(1.05);
}
.fab-icon {
font-size: 26px;
display: flex;
align-items: center;
justify-content: center;
}
.fab-text {
white-space: nowrap;
font-weight: 900;
font-size: 14px;
letter-spacing: 0.5px;
opacity: 0;
max-width: 0;
transition: all 0.3s ease;
margin-left: 0;
line-height: 1;
}
.fab-trigger:hover .fab-text {
opacity: 1;
max-width: 150px;
margin-left: 12px;
}

          /* Durum Seçimi (Select) Chevron Hizalaması */
          .status-select-premium .ant-select-selector {
            border-radius: 14px !important;
            font-weight: 700 !important;
            font-size: 12px !important;
            border: 2px solid transparent !important;
            transition: all 0.3s ease !important;
            height: 42px !important;
            display: flex !important;
            align-items: center !important;
            padding: 0 16px !important;
            box-shadow: none !important;
          }

          /* Chevron (Ok) İkonu Hizalaması */
          .status-select-premium .ant-select-arrow {
            top: 50% !important;
            margin-top: 0 !important;
            transform: translateY(-50%) !important;
            right: 14px !important;
            color: currentColor !important;
            font-size: 10px !important;
          }

          /* İçerik Hizalaması */
          .status-select-premium .ant-select-selection-item {
            line-height: 38px !important;
            display: flex !important;
            align-items: center !important;
          }

          /* Durum Renkleri */
          .status-awaiting .ant-select-selector { background: #fff7ed !important; color: #c2410c !important; }
          .status-backlog .ant-select-selector { background: #eff6ff !important; color: #1d4ed8 !important; }
          .status-resolved .ant-select-selector { background: #f0fdf4 !important; color: #15803d !important; }
          .status-canceled .ant-select-selector { background: #fef2f2 !important; color: #b91c1c !important; }

          .status-select-premium:hover .ant-select-selector {
             filter: brightness(0.97);
             transform: translateY(-1px);
          }

          .premium-dropdown .ant-select-item {
            border-radius: 10px;
            margin: 4px 8px;
            font-weight: 600;
            font-size: 12px;
            transition: all 0.2s;
          }

          .topic-card {
            padding: 16px;
            border-radius: 16px;
            border: 2px solid #f0f0f0;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            background: #fff;
          }
          .topic-card:hover { border-color: #FFD200; }
          .topic-card-selected {
            background: #fffbeb !important;
            border-color: #FFD200 !important;
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(255, 210, 0, 0.15);
          }
          .custom-table .ant-table {
            background: #fff;
            border-radius: 24px !important;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 40, 85, 0.06);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* --- NAVİGASYON --- */}
        <nav style={layoutStyles.nav}>
          <div style={layoutStyles.navInner}>
            <Space size="large">
              <div style={layoutStyles.logoBox}>
                <div style={layoutStyles.logoDot} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 900,
                    color: '#002855',
                  }}
                >
                  Turkcell
                </Title>
                <Text
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#FFD200',
                    letterSpacing: '1px',
                    display: 'block',
                    marginTop: '-4px',
                  }}
                >
                  DENEYİM MERKEZİ
                </Text>
              </div>
            </Space>

            <Segmented
              size="large"
              value={currentRole}
              onChange={(value) => setCurrentRole(value as any)}
              options={[
                {
                  label: 'Müşteri Görünümü',
                  value: 'user',
                  icon: <UserOutlined />,
                },
                {
                  label: 'Teknik Ekip Havuzu',
                  value: 'team',
                  icon: <TeamOutlined />,
                },
              ]}
              style={{ padding: '4px', borderRadius: '18px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Badge dot status="processing">
                <Button
                  type="text"
                  shape="circle"
                  icon={<EnvironmentOutlined />}
                />
              </Badge>
              <div
                style={{ width: '1px', height: '28px', background: '#e2e8f0' }}
              />
              <div style={{ textAlign: 'right', lineHeight: 1.1 }}>
                <Text
                  strong
                  style={{
                    fontSize: '12px',
                    display: 'block',
                    color: '#002855',
                  }}
                >
                  Admin Paneli
                </Text>
                <Text
                  type="secondary"
                  style={{ fontSize: '10px', fontWeight: 700 }}
                >
                  v2.4.0 Stable
                </Text>
              </div>
            </div>
          </div>
        </nav>

        <main style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>
          {currentRole === 'user' ? (
            <div
              style={{
                textAlign: 'center',
                paddingTop: '100px',
                animation: 'fadeIn 0.6s ease-out',
              }}
            >
              <Title
                level={1}
                style={{
                  fontSize: '72px',
                  color: '#002855',
                  fontStyle: 'italic',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  marginBottom: '16px',
                }}
              >
                Birlikte Daha Güçlüyüz
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: '20px',
                  fontStyle: 'italic',
                  maxWidth: '600px',
                  display: 'inline-block',
                  lineHeight: 1.6,
                }}
              >
                Geri bildirim paneli sağ alttaki buton ile açılır. Görüşleriniz
                doğrudan ürün sahiplerine iletilir.
              </Text>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '32px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      fontStyle: 'italic',
                      fontWeight: 900,
                      color: '#002855',
                    }}
                  >
                    Talepler ve Aksiyonlar
                  </Title>
                  <Text
                    type="secondary"
                    style={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: 12,
                      letterSpacing: '1px',
                    }}
                  >
                    Operasyonel Durum Yönetim Ekranı
                  </Text>
                </div>
                <Card
                  variant="borderless"
                  size="small"
                  style={{
                    borderRadius: '20px',
                    background: '#fff',
                    boxShadow: '0 8px 24px rgba(0,40,85,0.04)',
                  }}
                >
                  <Space
                    split={
                      <div
                        style={{ width: 1, height: 24, background: '#f1f5f9' }}
                      />
                    }
                    size="xlarge"
                    style={{ padding: '4px 12px' }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Text
                        type="secondary"
                        style={{ fontSize: 10, fontWeight: 900 }}
                      >
                        TOPLAM HAVUZ
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: 20, color: '#002855' }}>
                        {feedbacks.length}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 900,
                          color: '#faad14',
                        }}
                      >
                        BEKLEYEN
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: 20, color: '#faad14' }}>
                        {
                          feedbacks.filter((f) => f.status === 'awaiting')
                            .length
                        }
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
          )}
        </main>

        {/* --- MÜŞTERİ PANELİ & FAB --- */}
        {currentRole === 'user' && (
          <>
            {!isOpen ? (
              <div className="fab-trigger" onClick={() => setIsOpen(true)}>
                <CommentOutlined className="fab-icon" />
                <span className="fab-text">FİKRİNİ PAYLAŞ</span>
              </div>
            ) : (
              <div style={layoutStyles.panelOverlay}>
                <Card
                  title={
                    <div style={layoutStyles.panelHeader}>
                      <Space size="middle">
                        <div style={layoutStyles.headerIcon}>
                          <StarFilled style={{ color: '#002855' }} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <Text
                            strong
                            style={{
                              color: '#fff',
                              display: 'block',
                              lineHeight: 1.2,
                              fontSize: '16px',
                            }}
                          >
                            Birlikte Geliştirelim
                          </Text>
                          <Text
                            style={{
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '10px',
                              textTransform: 'uppercase',
                              fontWeight: 700,
                            }}
                          >
                            Deneyimi Paylaş, Turkcell'i Güçlendir
                          </Text>
                        </div>
                      </Space>
                      <Button
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined style={{ color: '#fff' }} />}
                        onClick={closeAndReset}
                      />
                    </div>
                  }
                  variant="borderless"
                  style={layoutStyles.sidePanel}
                  styles={{
                    body: {
                      padding: '24px',
                      height: 'calc(100% - 74px)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    },
                    header: {
                      background: '#002855',
                      padding: '18px 24px',
                      border: 0,
                    },
                  }}
                >
                  {!isSubmitted ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={layoutStyles.label}>
                          Kategori Seçimi
                        </Text>
                        <div style={layoutStyles.topicGrid}>
                          {[
                            { id: 'hata', label: 'Hata', emoji: '🛠️' },
                            { id: 'tasarim', label: 'Tasarım', emoji: '🎨' },
                            { id: 'performans', label: 'Hız', emoji: '⚡' },
                            { id: 'oneri', label: 'Öneri', emoji: '💡' },
                          ].map((topic) => {
                            const isSelected = formData.topic === topic.id;
                            return (
                              <div
                                key={topic.id}
                                onClick={() =>
                                  setFormData({ ...formData, topic: topic.id })
                                }
                                className={`topic-card ${isSelected ? 'topic-card-selected' : ''}`}
                              >
                                <span style={{ fontSize: '20px' }}>
                                  {topic.emoji}
                                </span>
                                <Text
                                  strong
                                  style={{
                                    fontSize: '11px',
                                    color: isSelected ? '#002855' : '#8c8c8c',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {topic.label}
                                </Text>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: '24px',
                          minHeight: 0,
                        }}
                      >
                        <Text strong style={layoutStyles.label}>
                          Görüşlerin
                        </Text>
                        <TextArea
                          placeholder="Lütfen yaşadığınız durumu detaylıca anlatın..."
                          value={formData.feedback}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              feedback: e.target.value,
                            })
                          }
                          style={layoutStyles.textArea}
                        />
                      </div>

                      <Button
                        type="primary"
                        size="large"
                        block
                        icon={<SendOutlined />}
                        onClick={handleSubmit}
                        disabled={!formData.topic || !formData.feedback}
                        style={{
                          height: '58px',
                          fontWeight: 900,
                          background: '#002855',
                          borderRadius: '18px',
                        }}
                      >
                        HEMEN GÖNDER
                      </Button>
                    </div>
                  ) : (
                    <div style={layoutStyles.successContainer}>
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          background: '#f0fdf4',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 24px',
                        }}
                      >
                        <CheckCircleOutlined
                          style={{
                            fontSize: '54px',
                            color: '#52c41a',
                            margin: 'auto',
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <Title
                          level={3}
                          style={{
                            margin: 0,
                            fontStyle: 'italic',
                            fontWeight: 900,
                          }}
                        >
                          Harika!
                        </Title>
                        <Text type="secondary" style={{ fontWeight: 500 }}>
                          Fikriniz teknik ekibimize ulaştı.
                        </Text>
                      </div>
                      <div style={layoutStyles.ticketBox}>
                        <Text
                          style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '11px',
                            fontWeight: 900,
                          }}
                        >
                          TAKİP NUMARASI
                        </Text>
                        <Title
                          level={2}
                          style={{
                            color: '#fff',
                            margin: '8px 0 0',
                            fontStyle: 'italic',
                            fontWeight: 900,
                            fontSize: '32px',
                          }}
                        >
                          {lastTicketId}
                        </Title>
                      </div>
                      <Button
                        block
                        size="large"
                        onClick={closeAndReset}
                        style={{
                          borderRadius: '16px',
                          height: '54px',
                          fontWeight: 700,
                        }}
                      >
                        KAPAT
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </ConfigProvider>
);
};

const layoutStyles: Record<string, React.CSSProperties> = {
container: {
minHeight: '100vh',
backgroundColor: '#F8FAFC',
position: 'relative',
overflowX: 'hidden',
},
nav: {
background: '#fff',
padding: '0 40px',
height: '90px',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
boxShadow: '0 4px 20px rgba(0, 40, 85, 0.04)',
position: 'sticky',
top: 0,
zIndex: 100,
},
navInner: {
width: '100%',
maxWidth: '1300px',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
},
logoBox: {
width: '42px',
height: '42px',
background: '#002855',
borderRadius: '14px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
transform: 'rotate(-4deg)',
boxShadow: '0 4px 12px rgba(0, 40, 85, 0.2)',
},
logoDot: {
width: '18px',
height: '18px',
background: '#FFD200',
borderRadius: '50%',
},
panelOverlay: {
position: 'fixed',
bottom: '40px',
right: '40px',
zIndex: 2000,
width: '400px',
height: '580px',
display: 'flex',
flexDirection: 'column',
animation: 'fadeIn 0.4s ease-out',
},
sidePanel: {
height: '100%',
width: '100%',
borderRadius: '40px',
boxShadow: '0 40px 80px -15px rgba(0, 40, 85, 0.35)',
overflow: 'hidden',
},
panelHeader: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
width: '100%',
},
headerIcon: {
background: '#FFD200',
padding: '10px',
borderRadius: '14px',
display: 'flex',
},
label: {
fontSize: '11px',
color: '#94a3b8',
textTransform: 'uppercase',
letterSpacing: '2px',
display: 'block',
marginBottom: '12px',
textAlign: 'left',
fontWeight: 800,
},
topicGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
textArea: {
flex: 1,
borderRadius: '24px',
padding: '20px',
background: '#f8fafc',
border: '2px solid #e2e8f0',
resize: 'none',
fontSize: '16px',
},
successContainer: {
height: '100%',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
},
ticketBox: {
width: '100%',
background: '#002855',
padding: '36px 20px',
borderRadius: '32px',
textAlign: 'center',
marginBottom: '12px',
},
};

export default App;
