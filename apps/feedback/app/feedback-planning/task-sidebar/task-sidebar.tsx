import { Space, Tag, Typography } from 'antd';
import { CommentOutlined, RightOutlined } from '@ant-design/icons';
import type { PlanningTask } from '../feedback-planning.types';
import { SEVERITY_OPTIONS } from '../feedback-planning.types';
import styles from './task-sidebar.module.scss';

const { Title, Text } = Typography;

interface TaskSidebarProps {
  tasks: PlanningTask[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export function TaskSidebar({ tasks, selectedId, onSelect }: TaskSidebarProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Title level={5} className={styles['title']}>
          ADAY GÖREVLER
        </Title>
        <Text type="secondary" className={styles['subtitle']}>
          AI tarafından gruplanmış ({tasks.length})
        </Text>
      </div>

      <div className={styles['scroll-area']}>
        {tasks.map((task) => {
          const sev = SEVERITY_OPTIONS.find((o) => o.value === task.severity);
          const isActive = selectedId === task.id;
          return (
            <div
              key={task.id}
              onClick={() => onSelect(task.id)}
              className={[styles['task-card'], isActive ? styles['active'] : ''].join(' ')}
            >
              <div
                className={styles['severity-bar']}
                style={{ '--sev-bg': sev?.color } as React.CSSProperties}
              />
              <div className={styles['card-body']}>
                <div className={styles['card-header']}>
                  <span className={styles['id-badge']}>#{task.id}</span>
                  <Tag
                    className={styles['severity-tag']}
                    style={{ '--sev-color': sev?.color, '--sev-bg-color': sev?.bgColor } as React.CSSProperties}
                  >
                    {task.severity}
                  </Tag>
                </div>

                <Text strong className={styles['card-title']}>
                  {task.title}
                </Text>

                <div className={styles['card-footer']}>
                  <Space size={4} className={styles['feedback-count']}>
                    <CommentOutlined />
                    <span>{task.referenceTicketIds.length} bildirim</span>
                  </Space>
                  <RightOutlined
                    className={[styles['arrow'], isActive ? styles['arrow-active'] : ''].join(' ')}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskSidebar;
