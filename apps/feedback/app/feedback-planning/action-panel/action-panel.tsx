import { Button, Card, Select, Space, Typography } from 'antd';
import { InfoCircleOutlined, RocketOutlined, SettingOutlined } from '@ant-design/icons';
import type { PlanningTask } from '../feedback-planning.types';
import { TEAM_OPTIONS } from '../feedback-planning.types';
import styles from './action-panel.module.scss';

const { Text } = Typography;

interface ActionPanelProps {
  task: PlanningTask;
  team: string;
  onTeamChange: (team: string) => void;
  onCreate: () => void;
}

export function ActionPanel({ task, team, onTeamChange, onCreate }: ActionPanelProps) {
  return (
    <div className={styles['container']}>
      <Card
        className={`${styles['card']} ${styles['shadow']}`}
        title="PLANLAMA"
      >
        <div className={styles['form-group']}>
          <Text className={styles['form-label']}>ATANACAK EKİP</Text>
          <Select
            className={styles['select-full']}
            size="large"
            value={team}
            onChange={onTeamChange}
            options={[...TEAM_OPTIONS]}
            placeholder="Ekip Seçiniz"
            suffixIcon={<SettingOutlined />}
          />
        </div>

        <div className={styles['alert']}>
          <Space align="start">
            <InfoCircleOutlined className={styles['alert-icon']} />
            <Text className={styles['alert-text']}>
              Sistem bu görevi{' '}
              <b>{task.screenName.toUpperCase()}</b> modülüyle eşleştirdi.
            </Text>
          </Space>
        </div>
      </Card>

      <Button
        type="primary"
        size="large"
        block
        onClick={onCreate}
        icon={<RocketOutlined />}
        className={styles['create-btn']}
      >
        JIRA TASK OLUŞTUR
      </Button>
    </div>
  );
}

export default ActionPanel;
