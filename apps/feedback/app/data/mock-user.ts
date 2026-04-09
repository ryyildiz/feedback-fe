export interface MockUser {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export const MOCK_USER: MockUser = {
  id: 'usr-tc-001',
  name: 'Mercan Tekin',
  initials: 'MT',
  role: 'Ürün Geliştirme',
};
