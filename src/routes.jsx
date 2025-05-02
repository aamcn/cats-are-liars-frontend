import App from "./App.jsx";
import Homepage from "./components/homepage/Homepage.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import IndividualCatPage from "./components/individualCatPage/IndividualCatPage.jsx";
import FeedHistoryPage from "./components/feedHistory/FeedHistoryPage.jsx";
import UserCatsControlPage from "./components/userCatsControlPanel/UserCatsControlPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/home", element: <Homepage /> },
      { path: "/cat-control-page", element: <UserCatsControlPage /> },
      { path: "feed-history", element: <FeedHistoryPage /> },
      { path: "/cat-view/:catName", element: <IndividualCatPage /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
