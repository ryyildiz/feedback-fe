import { useMemo, useState } from 'react';
import { Badge, ConfigProvider, Typography, notification } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { TaskSidebar } from './task-sidebar/task-sidebar';
import { JiraEditor } from './jira-editor/jira-editor';
import { ActionPanel } from './action-panel/action-panel';
import {
  MOCK_PLANNING_TASKS,
  TEAM_OPTIONS,
  type PlanningTask,
} from './feedback-planning.types';
import styles from './feedback-planning.module.scss';

const { Text } = Typography;

const FeedbackPlanning = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [team, setTeam] = useState('fatura-ekibi');
  const [tasks, setTasks] = useState<PlanningTask[]>(MOCK_PLANNING_TASKS);

  const activeTask = useMemo(
    () => tasks.find((t) => t.id === selectedId) ?? tasks[0],
    [selectedId, tasks],
  );

  const handleUpdate = (field: keyof PlanningTask, value: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === selectedId ? { ...t, [field]: value } : t)),
    );
  };

  const handleJiraCreate = () => {
    const selectedTeamLabel =
      TEAM_OPTIONS.find((o) => o.value === team)?.label ?? 'İlgili Ekip';

    notification.success({
      message: (
        <span className={styles['notif-title']}>Aksiyon Planı Devreye Alındı</span>
      ),
      description: (
        <div className={styles['notif-body']}>
          <Text className={styles['notif-text']}>
            <span className={styles['notif-bold']}>"{activeTask.title}"</span>{' '}
            taskı Jira'ya başarıyla aktarılarak
            <span className={styles['notif-bold']}> {selectedTeamLabel}</span>{' '}
            backlog havuzuna iletildi.
          </Text>
          <div className={styles['notif-badge']}>
            <Badge status="processing" color="#FFD200" />
            <Text className={styles['notif-badge-text']}>
              Jira Senkronizasyonu Aktif
            </Text>
          </div>
        </div>
      ),
      icon: <ThunderboltOutlined className={styles['notif-icon']} />,
      duration: 5,
      className: styles['notif-container'],
    });
  };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#002855', borderRadius: 16 } }}
    >
      <div className={styles['wrapper']}>
        <div className={styles['layout']}>
          <TaskSidebar
            tasks={tasks}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className={styles['editor-layout']}>
            <JiraEditor task={activeTask} onUpdate={handleUpdate} />
            <ActionPanel
              task={activeTask}
              team={team}
              onTeamChange={setTeam}
              onCreate={handleJiraCreate}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export { FeedbackPlanning };
export default FeedbackPlanning;