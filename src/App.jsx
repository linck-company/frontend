import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import ClubPage from "./components/club_page/cubingclubpage";
import HomePage from "./components/home_page/clubspage";
import Home from "./components/home_page/homepage";
import EventsPage from "./components/club_page/cubing_club_events_page";
import frame from "../assets/Loginpic.svg";
import frame1 from "../assets/Linck_Logo.svg";
import Profile_page from "./components/user_onboarding/profile_page";
import EventPage from "./components/events/eventspage";
import EventDetailsPage from "./components/events/EventDetailsPage";
import DesignPage from "./components/events/dashboard";
// Define dynamic routes

/* eslint-disable react/prop-types */


const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },
  { path: "/home", component: Home },
  { path: "/clubpage", component: HomePage },
  { path: "/clubpage/:clubName", component: ClubPage }, // Dynamic club page
  { path: "/activitiespage", component: EventsPage },
  { path: "/profile", component: Profile_page },
  { path: "/events", component: EventPage }, // Existing events page
  { path: "/event-details/:eventTitle", component: EventDetailsPage }, // Existing dynamic route
  { path: "/dashboard", component: DesignPage }, // New path for DesignPage
];

const AppLayout = ({ children }) => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";
  const isClubPage = location.pathname.startsWith("/clubpage") ||
    location.pathname.startsWith("/activitiespage") ||
    location.pathname === "/home" ||
    location.pathname.startsWith("/profile") ||
    location.pathname === "/events" ||
    location.pathname.startsWith("/event-details") ||
    location.pathname === "/dashboard" ||
    location.pathname === "/create-event";

  return (
    <div className={`main-container ${isClubPage ? "clubpage-background" : ""}`}>
      {/* Show Logo only on Login and Signup pages */}
      {isAuthPage && (
        <>
          <img src={frame1} alt="Logo" className="logo" />
          <img src={frame} alt="Decorative Design" className="left-image" />
          <div className="ball"></div>
        </>
      )}

      <div className={isClubPage ? "" : "content-container"}>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;