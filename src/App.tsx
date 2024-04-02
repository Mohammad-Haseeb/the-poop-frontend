// import { ReactNode, useEffect, useState } from 'react';
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   const isAuthenticated = () => {
//     // You should replace this with your actual logic
//     // to check if the user is authenticated
//     return !!localStorage.getItem('user');
//   };

//   interface PrivateRouteProps {
//     children: ReactNode;
//   }

//   // PrivateRoute component
//   const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//     const location = useLocation();

//     if (!isAuthenticated()) {
//       // Redirect to the login page if the user is not authenticated
//       return <Navigate to="/auth/signin" state={{ from: location }} replace />;
//     }

//     return <>{children}</>;
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Routes>
//         <Route
//           path="/auth/signin"
//           element={
//             <>
//               <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignIn />
//             </>
//           }
//         />
//         <Route
//           path="/auth/signup"
//           element={
//             <>
//               <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignUp />
//             </>
//           }
//         />
//         <PrivateRoute>
//           <Route
//             index
//             element={
//               <>
//                 <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <ECommerce />
//               </>
//             }
//           />
//           <Route
//             path="/calendar"
//             element={
//               <>
//                 <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Calendar />
//               </>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <>
//                 <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Profile />
//               </>
//             }
//           />
//           <Route
//             path="/forms/form-elements"
//             element={
//               <>
//                 <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <FormElements />
//               </>
//             }
//           />
//           <Route
//             path="/forms/form-layout"
//             element={
//               <>
//                 <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <FormLayout />
//               </>
//             }
//           />
//           <Route
//             path="/tables"
//             element={
//               <>
//                 <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Tables />
//               </>
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               <>
//                 <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Settings />
//               </>
//             }
//           />
//           <Route
//             path="/chart"
//             element={
//               <>
//                 <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Chart />
//               </>
//             }
//           />
//           <Route
//             path="/ui/alerts"
//             element={
//               <>
//                 <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Alerts />
//               </>
//             }
//           />
//           <Route
//             path="/ui/buttons"
//             element={
//               <>
//                 <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//                 <Buttons />
//               </>
//             }
//           />
//         </PrivateRoute>
//       </Routes>
//     </>
//   );
// }

// export default App;

import React, { ReactNode, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Joke from './pages/Joke';
import Poop from './pages/Poop';
import User from './pages/User';
import Review from './pages/Review';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const location = useLocation();

  let userData = localStorage.getItem('user');
  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };
  if (userData) {
    userData = JSON.parse(userData).access_token;
  }

  interface PrivateRouteProps {
    children: ReactNode;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    return <>{children}</>;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route
          index
          element={
            <PrivateRoute>
              <PageTitle title="The Poop" />
              <ECommerce />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/forms/form-elements"
          element={
            <PrivateRoute>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </PrivateRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <PrivateRoute>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <PageTitle title="The Poop | Users" />
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/trivia"
          element={
            <PrivateRoute>
              <PageTitle title="The Poop | Trivia" />
              <Trivia />
            </PrivateRoute>
          }
        />

        <Route
          path="/joke"
          element={
            <PrivateRoute>
              <PageTitle title="The Poop | Joke" />
              <Joke />
            </PrivateRoute>
          }
        />
        <Route
          path="/poop"
          element={
            <PrivateRoute>
              <PageTitle title="The Poop | Poop" />
              <Poop />
            </PrivateRoute>
          }
        />
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <PageTitle title="" />
              <Review />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/settings"
          element={
            <PrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <PrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </PrivateRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <PrivateRoute>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </PrivateRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <PrivateRoute>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
