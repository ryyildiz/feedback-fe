export interface PlanningTask {
  id: number;
  title: string;
  description: string;
  screenName: string;
  issueType: string;
  referenceTicketIds: string[];
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export const SEVERITY_OPTIONS = [
  { value: 'CRITICAL', label: 'KRİTİK', color: '#ff4d4f', bgColor: '#fff1f0' },
  { value: 'HIGH',     label: 'YÜKSEK', color: '#fa8c16', bgColor: '#fff7e6' },
  { value: 'MEDIUM',   label: 'ORTA',   color: '#1890ff', bgColor: '#e6f7ff' },
  { value: 'LOW',      label: 'DÜŞÜK',  color: '#52c41a', bgColor: '#f6ffed' },
] as const;

export const TEAM_OPTIONS = [
  { value: 'fatura-ekibi',  label: 'Fatura Ekibi'          },
  { value: 'paket-ekibi',   label: 'Paket Ekibi'           },
  { value: 'altyapi-ekibi', label: 'Altyapı Ekibi'         },
  { value: 'hat-op-ekibi',  label: 'Hat Operasyon Ekibi'   },
] as const;

export const MOCK_PLANNING_TASKS: PlanningTask[] = [
  {
    id: 1,
    title: 'Ödeme Butonu Pasif Kalıyor',
    description:
      "Kullanıcılar ödeme sayfasında kart bilgilerini eksiksiz ve doğru girmelerine rağmen 'Öde' butonunun tıklanamaz durumda kaldığını raporluyor. Bu durum dönüşüm oranlarını doğrudan etkilemektedir. Hata özellikle iOS Safari tarayıcılarında daha sık gözlemlenmiştir.",
    screenName: 'Payment',
    issueType: 'BUG',
    referenceTicketIds: ['TK-A1B2', 'TK-C3D4', 'TK-E5F6', 'TK-G7H8', 'TK-I9J0'],
    severity: 'CRITICAL',
  },
  {
    id: 2,
    title: 'Paket Aşım Görseli Hatalı',
    description:
      "Dashboard ekranında kalan kullanım bilgisi dairesel grafik üzerinde %100'den fazla gösteriliyor. Görsel bir kayma mevcut.",
    screenName: 'Dashboard',
    issueType: 'UX',
    referenceTicketIds: ['TK-8877', 'TK-4433'],
    severity: 'HIGH',
  },
];
