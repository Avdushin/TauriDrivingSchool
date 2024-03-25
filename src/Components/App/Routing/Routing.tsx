import { createBrowserRouter } from 'react-router-dom';
import { Paths, PathsDashboard } from './Providers/types/Paths';
import { Layout } from '../../Layouts/Layout';
import { Example, Hero, Home } from '../..';

const Routing = () => {
  return createBrowserRouter([
    {
      //@ Routes with Sidebar and global Container
      element: <Layout showSidebar={true} noContainer={false} />,
      //   errorElement: <NotFoundPage />,
      children: [
        {
          path: Paths.Root,
          element: <Hero />,
        },
        {
          path: Paths.Home,
          element: <Home />,
        },
        {
          path: PathsDashboard.Settings,
          element: <Example />,
        },
      ],
    },
  ]);
};

export default Routing;
