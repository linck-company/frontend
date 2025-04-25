import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import "../styles/EventPage.css";
import Navbar from "../menu/navbar";
import { performGetEventDetails, performRegisterForEvent, performUnRegisterForEvent } from "../../../api/hecate"; // Adjust the import path as needed
import { ERROR_STATUS_CODE } from "../../../api/api"; // Adjust the import path as needed
import { performLogout } from "../../../api/auth"; // Adjust the import path as needed

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState({});
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eventFilter, setEventFilter] = useState("ongoing"); // "ongoing" or "completed"
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await performGetEventDetails();
      if (response.data.status_code === ERROR_STATUS_CODE) {
        await performLogout();
        navigate("/", { replace: true });
        return;
      }
      if (response.data.status_code === 200) {
        const fetchedEvents = response.data.events || [];
        setEvents(fetchedEvents);

        // Derive categories from event_subject_area
        const uniqueCategories = [
          ...new Set(fetchedEvents.map((event) => event.event_subject_area)),
        ].map((name) => ({
          name,
          image: "https://via.placeholder.com/150", // Placeholder image; replace with actual category images if available
        }));
        setCategories(uniqueCategories);

        // Initialize joinedEvents based on is_user_registered
        const initialJoinedEvents = fetchedEvents.reduce((acc, event) => {
          acc[event.event_title] = event.is_user_registered;
          return acc;
        }, {});
        setJoinedEvents(initialJoinedEvents);
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to fetch events.",
        });
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      messageApi.open({
        type: "error",
        content: err.message || "Failed to fetch events.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [navigate, messageApi]);

  // Handle registration/deregistration with optimistic updates
  const handleToggleJoinStatus = async (eventId, eventTitle, isRegistered, e) => {
    e.stopPropagation();
    setLoading(true);

    // Show loading message
    messageApi.open({
      type: "loading",
      content: isRegistered ? "Deregistering from event..." : "Registering for event...",
      duration: 0,
    });

    // Optimistic update
    setJoinedEvents((prev) => ({
      ...prev,
      [eventTitle]: !isRegistered,
    }));
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              is_user_registered: !isRegistered,
              registered_count: event.registered_count + (isRegistered ? -1 : 1),
            }
          : event
      )
    );

    try {
      let response;
      if (isRegistered) {
        // Deregister
        response = await performUnRegisterForEvent(eventId);
        console.log(response);
        if (response.status !== 200) {
        
          // Revert optimistic update on failure
          setJoinedEvents((prev) => ({ ...prev, [eventTitle]: true }));
          setEvents((prev) =>
            prev.map((event) =>
              event.id === eventId
                ? { ...event, is_user_registered: true, registered_count: event.registered_count + 1 }
                : event
            )
          );
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: "Failed to deregister from event.",
          });
        } else {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Successfully deregistered from event!",
          });
        }
      } else {
        // Register
        response = await performRegisterForEvent(eventId);
        if (response.status !== 200) {
          // Revert optimistic update on failure
          setJoinedEvents((prev) => ({ ...prev, [eventTitle]: false }));
          setEvents((prev) =>
            prev.map((event) =>
              event.id === eventId
                ? { ...event, is_user_registered: false, registered_count: event.registered_count - 1 }
                : event
            )
          );
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: "Failed to register for event.",
          });
        } else {
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Successfully registered for event!",
          });
        }
      }
      // Refetch events to ensure consistency with backend
      await fetchEvents();
    } catch (err) {
      console.error("Error toggling join status:", err);
      // Revert optimistic update on error
      setJoinedEvents((prev) => ({ ...prev, [eventTitle]: isRegistered }));
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                is_user_registered: isRegistered,
                registered_count: event.registered_count + (isRegistered ? 1 : -1),
              }
            : event
        )
      );
      messageApi.destroy();
      messageApi.open({
        type: "error",
        content: err.message || "Failed to toggle join status.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on selected category and event filter (ongoing/completed)
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory
      ? event.event_subject_area === selectedCategory
      : true;
    const matchesFilter =
      eventFilter === "ongoing" ? event.is_event_active : !event.is_event_active;
    return matchesCategory && matchesFilter;
  });

  console.log("Filtered Events:", filteredEvents);

  return (
    <div className="club_activites_page-container">
      {contextHolder}
      <header className="navbar-header">
        <Navbar />
      </header>

      <div className="club_content">
        <div className="main-content">
          <h1>Don’t miss out!</h1>
          <h2>Explore the vibrant events happening...!!</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Events, Categories, Location..."
            />
          </div>
        </div>

        <div className="categories-section">
          <h3>Explore Categories</h3>
          <div className="categories">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() =>
                  setSelectedCategory(
                    category.name === selectedCategory ? null : category.name
                  )
                }
              >
                <div
                  className="category-image"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="event-filter-buttons">
          <button
            className={`filter-button ${eventFilter === "ongoing" ? "active" : ""}`}
            onClick={() => setEventFilter("ongoing")}
          >
            Ongoing Events
          </button>
          <button
            className={`filter-button ${eventFilter === "completed" ? "active" : ""}`}
            onClick={() => setEventFilter("completed")}
          >
            Completed Events
          </button>
        </div>

        <div className="events-section">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <Link
                  to={`/event-details/${encodeURIComponent(event.event_title)}`}
                  className="event-card-link"
                >
                  <div className="event-image-placeholder">
                    {event.event_flyer_image_url ? (
                      <img
                        src={event.event_flyer_image_url}
                        alt={event.event_title}
                        className="event-image"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                      />
                    ) : (
                      <span className="placeholder-icon">🏞️</span>
                    )}
                  </div>
                  <div className="event-details">
                    <span className="event-category">{event.event_subject_area}</span>
                    <div className="event-date">
                      {new Date(event.event_date).toLocaleDateString()}
                    </div>
                    <h4>{event.event_title}</h4>
                    <p className="event-venue">{event.event_location}</p>
                    <p className="event-time">
                      {new Date(event.event_start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(event.event_end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {event.registered_count >= 0 && (
                      <p className="event-interested">
                        • {event.registered_count} Interested
                      </p>
                    )}
                  </div>
                </Link>
                <button
                  className={`join-button ${joinedEvents[event.event_title] ? "deregister" : ""}`}
                  onClick={(e) => handleToggleJoinStatus(event.id, event.event_title, joinedEvents[event.event_title], e)}
                  disabled={!event.is_event_active || loading}
                >
                  {joinedEvents[event.event_title] ? "Deregister" : "Join now"}
                </button>
              </div>
            ))
          ) : (
            <p>
              No {eventFilter === "ongoing" ? "ongoing" : "completed"} events found
              {selectedCategory ? ` for ${selectedCategory}` : ""}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;