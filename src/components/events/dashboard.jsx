import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Navbar from "../menu/navbar";
import {
//   performGetEntityDetails,
  performGetRegisteredClub} from "../../../api/gandalf";
import { performGetUserDetails } from "../../../api/auth"; // Import from auth.jsx
import { performGetEventDetails } from "../../../api/hecate"; // Import from hecate.jsx
import { performLogout } from "../../../api/auth"; // Import from auth.jsx
import {GET_EVENT_DETAILS_ENDPOINT,GET_USER_DETAILS_ENDPOINT,GET_REGISTERED_CLUB_ENDPOINT} from "../../../api/api"
// import axios from "axios";
import { ERROR_STATUS_CODE } from "../../../api/api";

// Assume performLogout is defined or imported
// import { getLocalStorageData, JWT_TOKEN_KEY } from "../../../utils/local_storage.jsx";

// Assume ERROR_STATUS_CODE is defined (e.g., 401 for unauthorized)

const DesignPage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [registeredClub, setRegisteredClub] = useState(null); 
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
  
          // Fetch user details
          console.log("Fetching user details from:", GET_USER_DETAILS_ENDPOINT);
          const userResponse = await performGetUserDetails();
          if (userResponse.data.status_code === ERROR_STATUS_CODE) {
            await performLogout();
            navigate("/", { replace: true });
            return;
          }
          setUserDetails(userResponse.data);
  
          // Fetch registered club
          console.log("Fetching registered club from:", GET_REGISTERED_CLUB_ENDPOINT);
          const clubResponse = await performGetRegisteredClub();
          if (clubResponse.data.status_code === ERROR_STATUS_CODE) {
            await performLogout();
            navigate("/", { replace: true });
            return;
          }
          setRegisteredClub(clubResponse.data);
  
          // Fetch all events
          console.log("Fetching events from:", GET_EVENT_DETAILS_ENDPOINT);
          const eventsResponse = await performGetEventDetails();
          if (eventsResponse.data.status_code === ERROR_STATUS_CODE) {
            await performLogout();
            navigate("/", { replace: true });
            return;
          }
          setEvents(eventsResponse.data.events || []);
  
        } catch (err) {
          if (err.response?.status === 404) {
            setError(`Resource not found: ${err.config.url}. Please check the API endpoint.`);
          } else {
            setError(err.message || "Failed to fetch data");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [navigate]);
  
    // Calculate statistics
    const calculateStats = () => {
      const totalParticipated = events.filter(
        (event) => event.is_user_registered
      ).length;
  
      const eventsInProgress = events.filter(
        (event) =>
          event.is_user_registered &&
          new Date(event.event_date) > new Date("2025-04-21T00:00:00Z")
      ).length;
  
      return {
        totalEvents: totalParticipated.toString().padStart(2, "0"),
        eventsWon: "00", // Placeholder: No data provided for wins
        eventsAttended: totalParticipated.toString().padStart(2, "0"),
        eventsInProgress: eventsInProgress.toString().padStart(2, "0"),
      };
    };
  
    // Get registered events
    const registeredEvents = events.filter((event) => event.is_user_registered);
  
    // Get event lineup with prioritization
    const getEventLineup = () => {
      const userClubId = registeredClub?.entity_id || "cubing_club";
      const priorityEvents = events.filter(
        (event) => event.club_id === userClubId && !event.is_user_registered
      );
      const otherEvents = events.filter(
        (event) => event.club_id !== userClubId && !event.is_user_registered
      );
      return [...priorityEvents, ...otherEvents];
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    const stats = calculateStats();
    const eventLineup = getEventLineup();
  
    return (
      <div className="dashboard-container">
        <header className="navbar-header">
          <div className="user-greeting">
            {userDetails?.first_name ? (
              <h3>Welcome, {userDetails.first_name}!</h3>
            ) : (
              <h3>Welcome!</h3>
            )}
          </div>
          <Navbar />
        </header>
        {/* Statistics Section */}
        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-cards">
            {[
              { title: "Total Events", value: stats.totalEvents },
              { title: "Events Won", value: stats.eventsWon },
              { title: "No. of Events Attended", value: stats.eventsAttended },
              { title: "Events in Progress", value: stats.eventsInProgress },
            ].map((stat, idx) => (
              <div className="stat-card" key={idx}>
                <p>{stat.title}</p>
                <h3>{stat.value}</h3>
              </div>
            ))}
          </div>
        </section>
  
        {/* Registered Events Section */}
        <section className="registered-events">
          <div className="section-header">
            <h2>Registered Events</h2>
            <span>View all &gt;</span>
          </div>
          <div className="event-cards">
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event) => (
                <div className="event-des-card" key={event.id}>
                  <div
                    className="event-image"
                    style={{
                      backgroundImage: `url(${event.event_flyer_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="event-label">Registered</div>
                  <div className="event-dash-details">
                    <h4>{event.event_title}</h4>
                    <p>{event.event_description || "No description available"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No registered events found.</p>
            )}
          </div>
        </section>
  
        {/* Event Lineup Section */}
        <section className="event-lineup">
          <div className="section-header">
            <h2>
              Check out the <span className="orange-text">Event Lineup</span>
            </h2>
            <span>View all &gt;</span>
          </div>
          <p className="lineup-note">→ (ALL open Events Type)</p>
          <div className="event-lineup-cards">
            {eventLineup.length > 0 ? (
              eventLineup.map((event) => (
                <div className="lineup-card" key={event.id}>
                  <div
                    className="image-placeholder"
                    style={{
                      backgroundImage: `url(${event.event_flyer_image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="lineup-details">
                    <h4 className="orange-text">{event.event_title}</h4>
                    <p>
                      {event.club_name} | {event.event_location} |{" "}
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default DesignPage;

















































// import "../styles/DesignPage.css";
// import Navbar from "../menu/navbar";

// const DesignPage = () => {
//     return (
//         <div className="dashboard-container">
//             <header className="navbar-header">
//                 <Navbar />
//             </header>
//             {/* Statistics Section */}
//             <section className="stats-section">
//                 <h2>Statistics</h2>
//                 <div className="stats-cards">
//                     {[
//                         { title: "Total Events", value: "06" },
//                         { title: "Events Won", value: "06" },
//                         { title: "No. of Events Attended", value: "20" },
//                         { title: "Events in Progress", value: "03" }
//                     ].map((stat, idx) => (
//                         <div className="stat-card" key={idx}>
//                             <p>{stat.title}</p>
//                             <h3>{stat.value}</h3>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Registered Events Section */}
//             <section className="registered-events">
//                 <div className="section-header">
//                     <h2>Registered Events</h2>
//                     <span>View all &gt;</span>
//                 </div>
//                 <div className="event-cards">
//                     {["SRMAP v KLU", "SRMAP v Amrita", "SRMAP v Vignan"].map((event, index) => (
//                         <div className="event-des-card" key={index}>
//                             <div className="event-image" />
//                             <div className="event-label">Registered</div>
//                             <div className="event-dash-details">
//                                 <h4>{event}</h4>
//                                 <p>Watch the highlights from the match here...</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Event Lineup Section */}
//             <section className="event-lineup">
//                 <div className="section-header">
//                     <h2>Check out the <span className="orange-text">Event Lineup</span></h2>
//                     <span>View all &gt;</span>
//                 </div>
//                 <p className="lineup-note">→ (ALL open Events Type)</p>
//                 <div className="event-lineup-cards">
//                     {["Speed Cube", "Sports Club Cricket match", "Music Competition"].map((event, i) => (
//                         <div className="lineup-card" key={i}>
//                             <div className="image-placeholder" />
//                             <div className="lineup-details">
//                                 <h4 className="orange-text">{event}</h4>
//                                 <p>Event information</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//         </div>
//     );
// };

// export default DesignPage;