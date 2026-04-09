export interface TeamRoute {
  pathPattern: string;   // URL içinde aranacak segment
  teamId: string;
  teamLabel: string;
}

export const TEAM_ROUTING: TeamRoute[] = [
  { pathPattern: '/fatura',         teamId: 'fatura-ekibi',    teamLabel: 'Fatura Ekibi'        },
  { pathPattern: '/paketlerim',     teamId: 'paket-ekibi',     teamLabel: 'Paket Ekibi'         },
  { pathPattern: '/hat-islemleri',  teamId: 'hat-op-ekibi',    teamLabel: 'Hat Operasyon Ekibi' },
  { pathPattern: '/superonline', teamId: 'altyapi-ekibi', teamLabel: 'Altyapı Ekibi' },
];

/** URL'e bakarak hangi ekibe ait olduğunu döner. Eşleşme yoksa 'Genel' */
export function resolveTeamByUrl(url: string): string {
  const match = TEAM_ROUTING.find((r) => url.includes(r.pathPattern));
  return match ? match.teamLabel : 'Genel';
}
