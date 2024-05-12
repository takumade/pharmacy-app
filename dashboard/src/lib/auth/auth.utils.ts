import { User } from '@/types/user.type';
import { paths } from '@/paths';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


export const checkUserPermissions = (user: User, router: AppRouterInstance) => {
  if (user) {

    if (user.role === 'pharmacy') {
      if (!user.pharmacy) {
        router.replace(paths.auth.registerPharmacy);
      } else if (user.pharmacy && user.pharmacy.applicationStatus === 'pending') {
        router.replace(paths.registration.pending);
      } else if (user.pharmacy && user.pharmacy.applicationStatus === 'declined') {
        router.replace(paths.registration.declined);
      } else if (user.pharmacy && user.pharmacy.applicationStatus === 'approved') {
        router.replace(paths.dashboard.overview);
      }
    }

    if (user.role === 'admin') router.replace(paths.dashboard.overview);
  }

  return
};
