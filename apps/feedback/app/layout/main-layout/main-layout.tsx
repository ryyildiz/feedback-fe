import { useState } from 'react';
import { useLocation } from 'react-router';
import { ConfigProvider } from 'antd';
import type { Role } from '../../types';
import { MOCK_USER } from '../../mock/mock-user';
import { useFeedbackStore } from '../../store/feedback.store';
import { MainNavbar } from '../main-navbar/main-navbar';
import { FeedbackFab } from '../../feedback-widget/feedback-fab/feedback-fab';
import { FeedbackPanel } from '../../feedback-widget/feedback-panel/feedback-panel';
import { FeedbackBoard } from '../../feedback-board/feedback-board';
import { FeedbackPlanning } from '../../feedback-planning/feedback-planning';
import styles from './main-layout.module.scss';

const SCREEN_CONFIG: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Ana Sayfa',
    description: 'Geri bildirim icin sag alttaki buyuk butonu kullanin.',
  },
  '/fatura': {
    title: 'Fatura Merkezi',
    description: 'Fatura ile ilgili sorulari Fatura Ekibine bildirin.',
  },
  '/paketlerim': {
    title: 'Paketlerim',
    description: 'Paket ile ilgili sorulari Paket Ekibine bildirin.',
  },
  '/kampanyalar': {
    title: 'Kampanyalar',
    description: 'Kampanyalarla ilgili sorulari Hat Operasyon Ekibine bildirin.',
  },
  '/superonline': {
    title: 'Superonline',
    description: 'Internet baglanti sorunlarini Altyapi Ekibine bildirin.',
  },
};

export function MainLayout() {
  const location = useLocation();
  const screen = SCREEN_CONFIG[location.pathname] ?? SCREEN_CONFIG['/'];

  const [currentRole, setCurrentRole] = useState<Role>('user');
  const [isOpen, setIsOpen] = useState(false);

  const {
    feedbacks,
    isLoading,
    fetchError,
    setFormData,
    resetForm,
    fetchFeedbacks,
  } = useFeedbackStore();

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === 'action') fetchFeedbacks();
  };

  const handleOpenPanel = () => {
    setFormData({
      url: window.location.href,
      createdBy: MOCK_USER.id,
      screenName: screen.title,
    });
    setIsOpen(true);
  };

  const handleClosePanel = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002855',
          borderRadius: 14,
          fontFamily: "'Greycliff CF', -apple-system, sans-serif",
        },
        components: {
          Segmented: {
            itemSelectedBg: '#002855',
            itemSelectedColor: '#fff',
            trackBg: '#f1f3f6',
          },
          Table: { headerBg: '#f8fafc', headerColor: '#64748b' },
        },
      }}
    >
      <div className={styles.container}>
        <MainNavbar currentRole={currentRole} onRoleChange={handleRoleChange} />

        <main className={styles.main}>
          {currentRole === 'user' ? (
            <div className={styles.hero}>
              <h1 className={styles['hero-title']}>{screen.title}</h1>
              <p className={styles['hero-description']}>{screen.description}</p>
            </div>
          ) : currentRole === 'team' ? (
            <FeedbackPlanning />
          ) : isLoading ? (
            <div className={styles['loading-state']}>
              <span>Yükleniyor...</span>
            </div>
          ) : fetchError ? (
            <div className={styles['error-state']}>
              <span>{fetchError}</span>
            </div>
          ) : (
            <FeedbackBoard feedbacks={feedbacks} />
          )}
        </main>

        {currentRole === 'user' &&
          (!isOpen ? (
            <FeedbackFab onClick={handleOpenPanel} />
          ) : (
            <FeedbackPanel onClose={handleClosePanel} />
          ))}
      </div>
    </ConfigProvider>
  );
}
