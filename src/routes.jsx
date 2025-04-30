import App from './App.jsx'
import Homepage from './components/hompage/Homepage.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: "/home", element: <Homepage /> },
        ],
        errorElement: <ErrorPage />
      },
];

export default routes;