export interface PlanningTask {
  id: number;
  title: string;
  description: string;
  screenName: string;
  issueType: string;
  referenceTicketIds: string[];
  referenceFeedbackIds: number[];
  tag: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
  analyzedAt: string;
  createdAt: string;
  updatedAt: string;
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
