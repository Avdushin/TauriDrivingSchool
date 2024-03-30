export { Home } from './Home/Home';
export { Example } from './Example';
export { default as App } from './App/App';
export { default as Account } from './Account/Account';
export { default as TimeTable } from './TimeTable/TimeTable';
export { default as StudentLoginForm } from './Auth/StudentLoginForm/StudentLoginForm';
export { default as StudentRegistrationForm } from './Auth/StudentRegistration/StudentRegistrationForm';

//! Admin access
export { default as Panel } from './Admin/Panel/Panel';

//@ Teacher operations
export { default as TeachersList } from './Admin/Teachers/TeachersList/TeachersList';
export { default as TeacherDetails } from './Admin/Teachers/TeacherDetails/TeacherDetails';
export { default as AddTeacherForm } from './Admin/Teachers/AddTeacherForm/AddTeacherForm';

//@ Student Operations
export { default as StudentsList } from './Admin/Students/StudentsList/StudentsList';
export { default as StudentDetails } from './Admin/Students/StudentDetails/StudentDetails';
export { default as AddStudent } from './Admin/Students/AddStudent/AddStudent';

//@ Group operations
export { default as AddGroupForm } from './Admin/AddGroupForm/AddGroupForm';

//@ TimeTable
export { default as AddTimetableEntryForm } from './Admin/Timetable/AddTimetableEntryForm/AddTimetableEntryForm';
export { default as TimeTableViewer } from './Admin/Timetable/TimetableViewer/TimetableViewer';

//@ Payments
export { default as AddPayment } from './Admin/Students/Payments/AddPayment/AddPayment';
export { default as PaymentsList } from './Admin/Students/Payments/PaymentsList/PaymentsList.tsx';

//@ Shared Components
export { AdminCard } from './Shared/AdminCard/AdminCard';
