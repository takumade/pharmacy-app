export const paths = {
  home: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
    registerPharmacy: '/auth/register-pharmacy'},
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    users: '/dashboard/users',
    pharmacies: '/dashboard/pharmacies',
    medicine: '/dashboard/medicine',
    prescriptions: '/dashboard/prescriptions',
    transactions: '/dashboard/transactions',
    orders: '/dashboard/orders',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
