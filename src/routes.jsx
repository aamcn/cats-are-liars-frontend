import App from "./App.jsx";
import Homepage from "./components/homepageComponents/homepage/Homepage.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import CatProfilePage from "./components/catProfilePageComponents/catProfilePage/CatProfilePage.jsx";
import FeedHistoryPage from "./components/feedHistoryPageComponents/feedHistoryPage/FeedHistoryPage.jsx";
import MyCatsPage from "./components/myCatsPageComponents/myCatsPage/MyCatsPage.jsx";
import SignUpPage from "./components/signUpPage/signUpPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/cats-are-liars-frontend/", element: <LandingPage /> },
      { path: "/cats-are-liars-frontend/sign-up", element: <SignUpPage /> },
      { path: "/cats-are-liars-frontend/home", element: <Homepage /> },
      { path: "/cats-are-liars-frontend/my-cats", element: <MyCatsPage /> },
      { path: "/cats-are-liars-frontend/feed-history", element: <FeedHistoryPage /> },
      { path: "/cats-are-liars-frontend/cat-view/:catName", element: <CatProfilePage /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
