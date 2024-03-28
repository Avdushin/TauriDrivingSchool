import { createBrowserRouter } from 'react-router-dom';
import { AdminPaths, Paths, PathsDashboard } from './Providers/types/Paths';
import { Layout } from '../../Layouts/Layout';
import { Example, Account, Home, TimeTable, AddTeacherForm, Panel, TeachersList, TeacherDetails } from '../..';
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
              <Home />
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
          path: Paths.Account,
          element: (
            <AuthGuard>
              <Account />
            </AuthGuard>
          ),
        },
        {
          path: Paths.Timetable,
          element: (
            <AuthGuard>
              <TimeTable />
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
        { //! Admin access
          path: AdminPaths.Panel,
          element: (
            <AuthGuard>
              <Panel />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.TeachersList,
          element: (
            <AuthGuard>
              <TeachersList />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.TeacherDetails,
          element: (
            <AuthGuard>
              <TeacherDetails />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddTeacher,
          element: (
            <AuthGuard>
              <AddTeacherForm />
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
