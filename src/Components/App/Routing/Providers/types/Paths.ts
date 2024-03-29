//@ Route pathes
export enum Paths {
    Root = '/',
    Home = '/home',
    NotFound = '*',
    Test = '/test',
    Example = '/example',
    Dashbord = '/dashbord',
    //@ `/api` Authentication
    Signup = '/signup',
    Login = '/login',
    Logout = '/logout',
    Users = '/api/users',
    Account = '/account',
    Timetable = '/timetable'
  }
  
export enum AdminPaths {
  Panel = '/apanel',
  //? Students
  StudentsList = '/studentslist',
  StudentDetails = '/student/:studentId',
  AddStudent = '/addstudent',
  AddGroup = '/addgroup',
  //? TimeTable
  TimeTable = '/alltimetable',
  AddTimeTable = '/addtimetable',
  //? Teachers
  TeachersList = '/teacherslist',
  TeacherDetails = '/teacher/:teacherId',
  AddTeacher = '/addteacher'
}

  //@ Route pathes inside the application
  export enum PathsDashboard {
    Main = '/dashbord/main',
    Settings = '/dashbord/settings',
    UpdatePassword = '/dashbord/update-password',
    Account = '/dashbord/account',
    Tests = '/dashbord/tests',
    MBTI = '/dashbord/tests/mbti',
    SMIL = '/dashbord/tests/smil'
  }