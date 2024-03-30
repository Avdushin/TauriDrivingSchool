import { createBrowserRouter } from 'react-router-dom';
import { AdminPaths, Paths, PathsDashboard } from './Providers/types/Paths';
import { Layout } from '../../Layouts/Layout';
import { Account, Home, TimeTable, AddTeacherForm, Panel, TeachersList, TeacherDetails, StudentsList, StudentDetails, AddStudent, AddGroupForm, AddTimetableEntryForm, TimeTableViewer, AddPayment, PaymentsList, Settings } from '../..';
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
          path: Paths.Payment,
          element: (
            <AuthGuard>
              <PaymentsList />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.Settings,
          element: (
            <AuthGuard>
              <Settings />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.Panel,
          element: (
            <AuthGuard isAdmin>
              <Panel />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.TeachersList,
          element: (
            <AuthGuard isAdmin>
              <TeachersList />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.TeacherDetails,
          element: (
            <AuthGuard isAdmin>
              <TeacherDetails />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddTeacher,
          element: (
            <AuthGuard isAdmin>
              <AddTeacherForm />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.StudentsList,
          element: (
            <AuthGuard isAdmin>
              <StudentsList />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.StudentDetails,
          element: (
            <AuthGuard isAdmin>
              <StudentDetails />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddStudent,
          element: (
            <AuthGuard isAdmin>
              <AddStudent />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddGroup,
          element: (
            <AuthGuard isAdmin>
              <AddGroupForm />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddTimeTable,
          element: (
            <AuthGuard isAdmin>
              <AddTimetableEntryForm />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.TimeTable,
          element: (
            <AuthGuard isAdmin>
              <TimeTableViewer />
            </AuthGuard>
          ),
        },
        { //! Admin access
          path: AdminPaths.AddPayment,
          element: (
            <AuthGuard isAdmin>
              <AddPayment />
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
