import { Avatar, Segmented, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router';
import type { Role } from '../../types';
import { MOCK_USER } from '../../data/mock-user';
import styles from './main-navbar.module.scss';

const { Title, Text } = Typography;

const PAGE_LINKS = [
  { to: '/',              label: 'Anasayfa'      },
  { to: '/fatura',        label: 'Fatura'        },
  { to: '/paketlerim',    label: 'Paketlerim'    },
  { to: '/hat-islemleri', label: 'Hat İşlemleri'  },
  { to: '/superonline',   label: 'Superonline'  },
];

interface MainNavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function MainNavbar({ currentRole, onRoleChange }: MainNavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles['nav-inner']}>
        <Space size="large">
          <div className={styles['logo-box']}>
            <div className={styles['logo-dot']} />
          </div>
          <div className={styles['brand-text']}>
            <Title level={4} className={styles['brand-title']}>
              Turkcell
            </Title>
            <span className={styles['brand-subtitle']}>DENEYİM MERKEZİ</span>
          </div>
        </Space>

        <div className={styles['page-nav']}>
          {PAGE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                [styles['page-link'], isActive ? styles['page-link-active'] : ''].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className={styles['nav-right']}>
          <Avatar size={32} className={styles.avatar}>{MOCK_USER.initials}</Avatar>
          <div className={styles['user-info']}>
            <Text strong className={styles['user-name']}>{MOCK_USER.name}</Text>
            <Text className={styles['user-role']}>{MOCK_USER.role}</Text>
          </div>
        </div>

        <Segmented
          size="large"
          value={currentRole}
          onChange={(value) => onRoleChange(value as Role)}
          options={[
            { label: 'Müşteri Görünümü', value: 'user', icon: <UserOutlined /> },
            { label: 'Teknik Ekip Havuzu', value: 'team', icon: <TeamOutlined /> },
          ]}
          className={styles.segmented}
        />
      </div>
    </nav>
  );
}
