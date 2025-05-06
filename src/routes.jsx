import App from "./App.jsx";
import Homepage from "./components/homepage/Homepage.jsx";
import LandingPage from "./components/landingLogInPage/LandingPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import IndividualCatPage from "./components/individualCatPage/IndividualCatPage.jsx";
import FeedHistoryPage from "./components/feedHistoryPage/FeedHistoryPage.jsx";
import MyCatsPage from "./components/myCatsPage/MyCatsPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/home", element: <Homepage /> },
      { path: "/cat-control-page", element: <MyCatsPage /> },
      { path: "feed-history", element: <FeedHistoryPage /> },
      { path: "/cat-view/:catName", element: <IndividualCatPage /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
