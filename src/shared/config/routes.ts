export const routes = {
  home: '/',
  login: '/login',
  telemetry: '/telemetry/:tripId',
  analytics: '/analytics/:tripId',
  notFound: '*',
} as const;
