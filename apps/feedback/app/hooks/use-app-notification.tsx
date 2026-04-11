import { notification } from 'antd';
import { ThunderboltFilled, ThunderboltOutlined, WarningFilled } from '@ant-design/icons';
import { Badge } from 'antd';

export function useAppNotification() {
  const [notifApi, contextHolder] = notification.useNotification();

  const showSuccess = (title: string, text: string, badgeText: string) => {
    notifApi.success({
      message: <span className="app-notif-title">{title}</span>,
      description: (
        <div className="app-notif-body">
          <span className="app-notif-text">{text}</span>
          <div className="app-notif-badge">
            <span className="app-notif-dot app-notif-dot--success" />
            <span className="app-notif-badge-text">{badgeText}</span>
          </div>
        </div>
      ),
      icon: <ThunderboltFilled className="app-notif-icon app-notif-icon--success" />,
      placement: 'bottomRight',
      duration: 4,
      className: 'app-notif-container',
    });
  };

  const showError = (title: string, text: string, badgeText: string) => {
    notifApi.error({
      message: <span className="app-notif-title">{title}</span>,
      description: (
        <div className="app-notif-body">
          <span className="app-notif-text">
            {text}{' '}
            <span className="app-notif-bold">Lütfen tekrar deneyin.</span>
          </span>
          <div className="app-notif-badge">
            <span className="app-notif-dot app-notif-dot--error" />
            <span className="app-notif-badge-text">{badgeText}</span>
          </div>
        </div>
      ),
      icon: <WarningFilled className="app-notif-icon app-notif-icon--error" />,
      placement: 'bottomRight',
      duration: 5,
      className: 'app-notif-container',
    });
  };

  const showJiraSuccess = (title: string, boldParts: string[], plainParts: string[], badgeText: string) => {
    notifApi.success({
      message: <span className="app-notif-title">{title}</span>,
      description: (
        <div className="app-notif-body">
          <span className="app-notif-text">
            <span className="app-notif-bold">"{boldParts[0]}"</span>
            {' '}{plainParts[0]}{' '}
            <span className="app-notif-bold">{boldParts[1]}</span>
            {' '}{plainParts[1]}
          </span>
          <div className="app-notif-badge">
            <Badge status="processing" color="#FFD200" />
            <span className="app-notif-badge-text">{badgeText}</span>
          </div>
        </div>
      ),
      icon: <ThunderboltOutlined className="app-notif-icon app-notif-icon--success" />,
      placement: 'bottomRight',
      duration: 5,
      className: 'app-notif-container',
    });
  };

  const showInfo = (message: string, description: string) => {
    notifApi.info({ message, description, placement: 'bottomRight' });
  };

  return { notifApi, contextHolder, showSuccess, showError, showJiraSuccess, showInfo };
}
