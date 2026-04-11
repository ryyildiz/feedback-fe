import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider, Spin } from 'antd';
import { TaskSidebar } from './task-sidebar/task-sidebar';
import { JiraEditor } from './jira-editor/jira-editor';
import { ActionPanel } from './action-panel/action-panel';
import { PlanningEmptyState } from './planning-empty-state/planning-empty-state';
import {
  TEAM_OPTIONS,
  type PlanningTask,
} from './feedback-planning.types';
import { getAnalyses } from '../services/feedback.service';
import { useAppNotification } from '../hooks/use-app-notification';
import styles from './feedback-planning.module.scss';

interface FeedbackPlanningProps {
  onGoBack?: () => void;
}

export const FeedbackPlanning = ({ onGoBack }: FeedbackPlanningProps) => {
  const { contextHolder, showJiraSuccess } = useAppNotification();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [team, setTeam] = useState('fatura-ekibi');
  const [tasks, setTasks] = useState<PlanningTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    getAnalyses()
      .then((data) => {
        setTasks(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setFetchError('Analiz verileri yüklenirken bir hata oluştu.'))
      .finally(() => setIsLoading(false));
  }, []);

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

    showJiraSuccess(
      'Aksiyon Planı Devreye Alındı',
      [activeTask.title, selectedTeamLabel],
      ["taskı Jira'ya başarıyla aktarılarak", 'backlog havuzuna iletildi.'],
      'Jira Senkronizasyonu Aktif',
    );
  };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#002855', borderRadius: 16 } }}
    >
      <div className={styles['wrapper']}>
        {contextHolder}
        {isLoading ? (
          <div className={styles['loading-state']}>
            <Spin size="large" />
          </div>
        ) : fetchError || tasks.length === 0 ? (
          <PlanningEmptyState
            onGoBack={onGoBack}
            onAnalysisComplete={(newTasks) => {
              setTasks(newTasks);
              if (newTasks.length > 0) setSelectedId(newTasks[0].id);
            }}
          />
        ) : (
          <div className={styles['layout']}>
            <TaskSidebar
              tasks={tasks}
              selectedId={selectedId ?? tasks[0]?.id}
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
        )}
      </div>
    </ConfigProvider>
  );
};
