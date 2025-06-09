import App from "./App.jsx";
import Homepage from "./components/homepageComponents/homepage/Homepage.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import IndividualCatPage from "./components/individualCatPageComponents/individualCatPage/IndividualCatPage.jsx";
import FeedHistoryPage from "./components/feedHistoryPageComponents/feedHistoryPage/FeedHistoryPage.jsx";
import MyCatsPage from "./components/myCatsPageComponents/myCatsPage/MyCatsPage.jsx";

const routes = [
  {
    path: "/", 
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/home", element: <Homepage /> },
      { path: "/my-cats", element: <MyCatsPage /> },
      { path: "feed-history", element: <FeedHistoryPage /> },
      { path: "/cat-view/:catName", element: <IndividualCatPage /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
