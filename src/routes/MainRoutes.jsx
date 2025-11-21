import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilitiesIT routing
const UserManagePage = Loadable(lazy(() => import('views/user/UserManagePage')));
const CoursePage = Loadable(lazy(() => import('views/course/CoursePage')));
const StudentPage = Loadable(lazy(() => import('views/student/StudentPage')))

// utilitiesLecturer routing
const AttendancePage = Loadable(lazy(() => import('views/attendance/AttendancePage')));
const ResultPage = Loadable(lazy(() => import('views/result/ResultPage')));
const PlanePage = Loadable(lazy(() => import('views/plane/PlanePage')));
const LecturerPage = Loadable(lazy(() => import('views/userLecturer/LecturerPage')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'user',
      element: <UserManagePage />
    },
    {
      path: 'course',
      element: <CoursePage />
    },
    {
      path: 'student',
      element: <StudentPage />
    },
    {
      path: 'attendance',
      element: <AttendancePage />
    },
    {
      path: 'result',
      element: <ResultPage />
    },
    {
      path: 'plane',
      element: <PlanePage />
    },
    {
      path: 'userLecturer',
      element: <LecturerPage/>
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};


export default MainRoutes;

