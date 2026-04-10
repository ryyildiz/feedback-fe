import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./app.tsx'),
  route('fatura',         './routes/fatura.tsx'),
  route('paketlerim',     './routes/paketlerim.tsx'),
  route('kampanyalar',     './routes/kampanyalar.tsx'),
  route('superonline',     './routes/superonline.tsx'),
] satisfies RouteConfig;
