import { Card, Descriptions, Input, Select, Space, Typography } from 'antd';
import { CheckSquareOutlined, CommentOutlined } from '@ant-design/icons';
import type { PlanningTask } from '../feedback-planning.types';
import { SEVERITY_OPTIONS } from '../feedback-planning.types';
import styles from './jira-editor.module.scss';

const { Text, Paragraph } = Typography;

interface JiraEditorProps {
  task: PlanningTask;
  onUpdate: (field: keyof PlanningTask, value: string) => void;
}

export function JiraEditor({ task, onUpdate }: JiraEditorProps) {
  return (
    <Card
      className={`${styles['card']} ${styles['shadow']}`}
      title={
        <div className={styles['card-header']}>
          <Space>
            <CheckSquareOutlined className={styles['header-icon']} />
            <span className={styles['header-text']}>GÖREV ANALİZİ & TASLAK</span>
          </Space>
        </div>
      }
    >
      <Descriptions bordered column={1} className={styles['descriptions']}>
        <Descriptions.Item label="TASK ADI">
          <Input.TextArea
            value={task.title}
            onChange={(e) => onUpdate('title', e.target.value)}
            className={styles['title-input']}
            placeholder="Görev başlığı..."
            variant="borderless"
            autoSize={{ minRows: 1 }}
          />
        </Descriptions.Item>

        <Descriptions.Item label="ÖNCELİK">
          <Select
            value={task.severity}
            onChange={(val) => onUpdate('severity', val)}
            className={styles['select-full']}
            options={SEVERITY_OPTIONS.map((opt) => ({
              value: opt.value,
              label: (
                <Space>
                  <span
                    className={styles['status-dot']}
                    style={{ '--dot-bg': opt.color } as React.CSSProperties}
                  />
                  <span className={styles['severity-label']}>{opt.label}</span>
                </Space>
              ),
            }))}
          />
        </Descriptions.Item>

        <Descriptions.Item label="AÇIKLAMA">
          <div className={styles['description']}>
            <Paragraph className={styles['description-text']}>
              {task.description}
            </Paragraph>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <div className={styles['references']}>
        <div className={styles['ref-header']}>
          <Text strong className={styles['ref-title']}>
            Referans Müşteri Talepleri ({task.referenceTicketIds.length})
          </Text>
        </div>
        <div className={styles['ref-list']}>
          {task.referenceTicketIds.map((id) => (
            <div key={id} className={styles['ref-pill']}>
              <CommentOutlined className={styles['ref-icon']} />
              <span className={styles['ref-text']}>{id}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default JiraEditor;
