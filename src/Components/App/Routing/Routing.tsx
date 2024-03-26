import { createBrowserRouter } from 'react-router-dom';
import { Paths, PathsDashboard } from './Providers/types/Paths';
import { Layout } from '../../Layouts/Layout';
import { Example, Hero, Home } from '../..';
import { AuthGuard } from './Providers/AuthGuard';
import { LoginPage, NotFound, RegisterPage } from '../../../Pages';

const Routing = () => {
  return createBrowserRouter([
    {
      //@ Routes with Sidebar and global Container
      element: <Layout showSidebar={true} noContainer={false} />,
      errorElement: <NotFound />,
      children: [
        {
          path: Paths.Root,
          element: (
            <AuthGuard>
              <Hero />
            </AuthGuard>
          ),
        },
        {
          path: Paths.Home,
          element: (
            <AuthGuard>
              <Home />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.Settings,
          element: (
            <AuthGuard>
              <Example />
            </AuthGuard>
          ),
        },
        {
          path: Paths.Signup,
          element: <RegisterPage />,
        },
        {
          path: Paths.Login,
          element: <LoginPage />,
        },
      ],
    },
  ]);
};

export default Routing;
