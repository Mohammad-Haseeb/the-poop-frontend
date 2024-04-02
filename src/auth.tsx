import { Outlet, Navigate } from 'react-router-dom';
import Loader from './common/Loader';

const PrivateRoutes = () => {
  let auth = { token: false };
  return auth.token != null ? <Navigate to="signin" /> : <h1>Hello</h1>;
};

export default PrivateRoutes;
