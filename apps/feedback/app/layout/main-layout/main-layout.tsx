import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import type { Feedback, FeedbackFormData, Role } from '../../types';
import { MainNavbar } from '../main-navbar/main-navbar';
import { FeedbackFab } from '../../feedback/feedback-fab/feedback-fab';
import { FeedbackPanel } from '../../feedback/feedback-panel/feedback-panel';
import { TeamView } from '../../team/team-view/team-view';

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: 'TK-8421',
    topic: 'Tasarım',
    screenName: 'Fatura Detayları',
    url: '/hesabim/fatura/detay',
    feedback: 'Karanlık modda fatura tutarı zor okunuyor, kontrast artırılmalı.',
    status: 'awaiting',
    date: '12.10.2023',
  },
];

export function MainLayout() {
  const [currentRole, setCurrentRole] = useState<Role>('user');
  const [isOpen, setIsOpen]           = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastTicketId, setLastTicketId] = useState('');
  const [formData, setFormData]       = useState<FeedbackFormData>({ topic: '', feedback: '' });
  const [feedbacks, setFeedbacks]     = useState<Feedback[]>(INITIAL_FEEDBACKS);

  const handleUpdateStatus = (id: string, newStatus: Feedback['status']) => {
    setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));
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
    const tId = 'TK-' + Math.floor(1000 + Math.random() * 9000);
    setLastTicketId(tId);
    setFeedbacks((prev) => [
      {
        id: tId,
        topic: formData.topic.charAt(0).toUpperCase() + formData.topic.slice(1),
        screenName: 'Fatura Detayları',
        url: '/hesabim/fatura/detay',
        feedback: formData.feedback,
        status: 'awaiting',
        date: new Date().toLocaleDateString('tr-TR'),
      },
      ...prev,
    ]);
    setIsSubmitted(true);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002855',
          borderRadius: 14,
          fontFamily: 'Noto Sans, sans-serif',
        },
        components: {
          Segmented: { itemSelectedBg: '#002855', itemSelectedColor: '#fff', trackBg: '#f1f3f6' },
          Table: { headerBg: '#f8fafc', headerColor: '#64748b' },
        },
      }}
    >
      <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', position: 'relative', overflowX: 'hidden' }}>
        <MainNavbar currentRole={currentRole} onRoleChange={setCurrentRole} />

        <main style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>
          {currentRole === 'user' ? (
            <div style={{ textAlign: 'center', paddingTop: '100px', animation: 'fadeIn 0.6s ease-out' }}>
              <h1 style={{ fontSize: 72, color: '#002855', fontStyle: 'italic', fontWeight: 900, letterSpacing: -2, marginBottom: 16 }}>
                Birlikte Daha Güçlüyüz
              </h1>
              <p style={{ fontSize: 20, fontStyle: 'italic', color: '#94a3b8', maxWidth: 600, display: 'inline-block', lineHeight: 1.6 }}>
                Geri bildirim paneli sağ alttaki buton ile açılır. Görüşleriniz doğrudan ürün sahiplerine iletilir.
              </p>
            </div>
          ) : (
            <TeamView feedbacks={feedbacks} onUpdateStatus={handleUpdateStatus} />
          )}
        </main>

        {currentRole === 'user' && (
          !isOpen ? (
            <FeedbackFab onClick={() => setIsOpen(true)} />
          ) : (
            <FeedbackPanel
              isSubmitted={isSubmitted}
              lastTicketId={lastTicketId}
              formData={formData}
              onClose={closeAndReset}
              onChange={setFormData}
              onSubmit={handleSubmit}
            />
          )
        )}
      </div>
    </ConfigProvider>
  );
}

export default MainLayout;
