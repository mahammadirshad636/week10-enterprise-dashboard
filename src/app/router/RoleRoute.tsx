import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';

interface RoleRouteProps {
  allowedRoles: Array<'admin' | 'analyst' | 'viewer'>;
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const role = useAppSelector((state) => state.auth.user?.role);
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
