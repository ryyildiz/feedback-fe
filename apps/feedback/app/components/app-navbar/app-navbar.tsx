import React from 'react';
import { Badge, Button, Segmented, Space, Typography } from 'antd';
import { EnvironmentOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { Role } from '../../types';
import styles from './app-navbar.module.scss';

const { Title, Text } = Typography;

interface AppNavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function AppNavbar({ currentRole, onRoleChange }: AppNavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Space size="large">
          <div className={styles.logoBox}>
            <div className={styles.logoDot} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <Title level={4} className={styles.brandTitle}>
              Turkcell
            </Title>
            <span className={styles.brandSubtitle}>DENEYİM MERKEZİ</span>
          </div>
        </Space>

        <Segmented
          size="large"
          value={currentRole}
          onChange={(value) => onRoleChange(value as Role)}
          options={[
            { label: 'Müşteri Görünümü', value: 'user', icon: <UserOutlined /> },
            { label: 'Teknik Ekip Havuzu', value: 'team', icon: <TeamOutlined /> },
          ]}
          style={{ padding: '4px', borderRadius: '18px' }}
        />

        <div className={styles.navRight}>
          <Badge dot status="processing">
            <Button type="text" shape="circle" icon={<EnvironmentOutlined />} />
          </Badge>
          <div className={styles.divider} />
          <div className={styles.adminInfo}>
            <Text strong className={styles.adminTitle}>Admin Paneli</Text>
            <Text type="secondary" className={styles.adminVersion}>v2.4.0 Stable</Text>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
