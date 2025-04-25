import { useState, useEffect } from "react";
import frame1 from "../../../assets/Linck_Logo.svg";
import {
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  Users,
  Calendar,
  Mail,
  Sun,
  Moon,
  Plus,
  FileText,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { performLogout, performGetUserDetails } from "../../../api/auth";
import { performCreateEvent, performGetStudentRecords } from "../../../api/hecate";
import { ERROR_STATUS_CODE } from "../../../api/api";

function Navbar({ onCreateEvent }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [userDetails, setUserDetails] = useState({ first_name: "", last_name: "" });
  const [isCreateEventPopupOpen, setIsCreateEventPopupOpen] = useState(false);
  const [isStudentDataPopupOpen, setIsStudentDataPopupOpen] = useState(false);
  const [studentEvents, setStudentEvents] = useState(null);
  const [studentId, setStudentId] = useState(""); // New state for student ID
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Clubs", icon: Users, path: "/clubpage" },
    { label: "Events", icon: Calendar, path: "/events" },
    { label: "Contact", icon: Mail, path: "/contact" },
  ];

  const profileMenuItems = [
    { label: "Profile", icon: User, path: "/profile" },
    { label: "Create Event", icon: Plus, path: "/create-event" },
    { label: "Student Data", icon: FileText, path: "/student-data" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Logout", icon: LogOut, path: "/logout" },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await performGetUserDetails();
        if (userResponse.data.status_code === ERROR_STATUS_CODE) {
          await performLogout();
          navigate("/", { replace: true });
          return;
        }
        const { first_name, last_name } = userResponse.data;
        setUserDetails({ first_name, last_name: last_name || "" });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  // New useEffect for fetching student records
// Navbar.jsx (relevant useEffect)
useEffect(() => {
  const fetchStudentRecords = async () => {
    if (!isStudentDataPopupOpen || !studentId) return;

    try {
      const response = await performGetStudentRecords(studentId);
      console.log("Student Records Response:", response);

      if (response.status_code === ERROR_STATUS_CODE) {
        await performLogout();
        navigate("/", { replace: true });
        return;
      }

      const events = response.data.events || [];
      console.log(events)
      setStudentEvents(events);
    } catch (err) {
      console.error("Failed to fetch student records:", err);
      setStudentEvents([]);
      alert(err.message || "Failed to fetch student records. Please try again.");
    }
  };

  fetchStudentRecords();
}, [studentId, isStudentDataPopupOpen, navigate]);


  const handleProfileToggle = () => {
    if (isProfileDropdownOpen) {
      setIsDropdownClosing(true);
      setTimeout(() => {
        setIsProfileDropdownOpen(false);
        setIsDropdownClosing(false);
      }, 200);
    } else {
      setIsProfileDropdownOpen(true);
    }
  };

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMobileMenuClosing(false);
      }, 200);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const fullName = userDetails.last_name
    ? `${userDetails.first_name} ${userDetails.last_name}`
    : userDetails.first_name;

  const handleCreateEvent = (e) => {
    e.preventDefault();
    console.log("Create Event clicked");
    setIsCreateEventPopupOpen(true);
    if (onCreateEvent) {
      onCreateEvent();
    }
  };

  const handleStudentData = (e) => {
    e.preventDefault();
    console.log("Student Data clicked");
    setStudentEvents(null);
    setIsStudentDataPopupOpen(true);
    setStudentId(""); // Reset student ID when opening popup
  };

  const handlePopupToggle = (popupType) => {
    if (popupType === "create-event") {
      setIsCreateEventPopupOpen(!isCreateEventPopupOpen);
    } else if (popupType === "student-data") {
      setIsStudentDataPopupOpen(!isStudentDataPopupOpen);
      setStudentEvents(null);
      setStudentId(""); // Reset student ID when closing popup
    }
  };

  const handleStudentDataSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputStudentId = formData.get("student_id");
  
    console.log("Input Student ID:", inputStudentId); // Add logging
  
    if (!inputStudentId || !/^[A-Z0-9]+$/.test(inputStudentId)) {
      alert("Please enter a valid Student ID");
      return;
    }
  
    console.log(`Searching events for Student ID: ${inputStudentId}`);
    setStudentId(inputStudentId);
  };


  // The rest of the component (JSX) remains unchanged
  return (
    <div className={`nav ${isDarkTheme ? "dark" : "light"}`}>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="mobile-menu-button">
              <button onClick={handleMobileMenuToggle}>
                <Menu size={24} />
              </button>
            </div>
            <div className="logo-nav">
              <Link to="/home">
                <img src={frame1} alt="Logo" className="logo-nav-img" />
              </Link>
            </div>
            <div className="nav-items">
              {navItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="profile-section">
              <button className="theme-toggle" onClick={handleThemeToggle}>
                {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="profile-dropdown">
                <button onClick={handleProfileToggle} className="profile-button">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt="Profile"
                  />
                  <div className="profile-info">
                    <span>{fullName || "Loading..."}</span>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isProfileDropdownOpen && (
                  <div
                    className={`profile-dropdown-menu ${
                      isDropdownClosing ? "closing" : ""
                    }`}
                  >
                    {profileMenuItems.map((item) => (
                      <div
                        key={item.label}
                        className="dropdown-item"
                        onClick={async (e) => {
                          if (item.label === "Create Event") {
                            handleCreateEvent(e);
                          } else if (item.label === "Student Data") {
                            handleStudentData(e);
                          } else if (item.label === "Logout") {
                            e.preventDefault();
                            await performLogout();
                            navigate("/", { replace: true });
                          } else {
                            navigate(item.path);
                          }
                        }}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div
              className={`nav-dropdown-menu ${isMobileMenuClosing ? "closing" : ""}`}
            >
              {navItems.map((item) => (
                <Link key={item.label} to={item.path} className="dropdown-item">
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Create Event Popup Modal */}
      {/* Create Event Popup Modal */}
{isCreateEventPopupOpen && (
  <div
    className="create-event-popup-overlay"
    onClick={() => handlePopupToggle("create-event")}
  >
    <div
      className={`create-event-popup-content ${isDarkTheme ? "dark" : "light"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Create Event</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          console.log("Event Data:", data);
          try {
            const response = await performCreateEvent(data);
            if (response.status_code === ERROR_STATUS_CODE) {
              await performLogout();
              navigate("/", { replace: true });
              return;
            }
            if (response.data.status_code === 200) {
              console.log("Event created successfully, ID:", response.data.event_id);
              setIsCreateEventPopupOpen(false);
              if (onCreateEvent) {
                onCreateEvent();
              }
            } else {
              console.error("Failed to create event, status:", response.data.status_code);
              alert("Failed to create event. Please try again.");
            }
          } catch (err) {
            console.error("Error creating event:", err);
            alert(err.message || "Failed to create event. Please try again.");
          }
        }}
        className="create-event-form"
      >
        <div className="form-group">
          <label>Event Title</label>
          <input name="event_title" type="text" required />
        </div>
        <div className="form-group">
          <label>Event Nature</label>
          <select name="event_nature" defaultValue="Competition" required>
            <option value="Competition">Competition</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Meetup">Meetup</option>
          </select>
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input name="event_date" type="date" required />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input name="event_start_time" type="time" required />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input name="event_end_time" type="time" required />
        </div>
        <div className="form-group">
          <label>Host</label>
          <input name="event_host" type="text" required/>
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input name="event_venue" type="text" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="event_description" rows="3" required />
        </div>
        <div className="form-group">
          <label>Organizer Contact Info</label>
          <input name="event_organizer_contact_info" type="text" required />
        </div>
        <div className="form-group">
          <label>Subject Area</label>
          <input name="event_subject_area" type="text" required />
        </div>
        <div className="form-group">
          <label>Resource Person</label>
          <input name="event_resource_person" type="text" required />
        </div>
        <div className="form-group">
          <label>Affiliation</label>
          <input name="event_affiliation" type="text" required />
        </div>
        <div className="form-group">
          <label>Resource Person Profile</label>
          <textarea name="event_resource_person_profile" rows="2" />
        </div>
        <div className="form-group">
          <label>Objective</label>
          <textarea name="event_objective" rows="2" required />
        </div>
        <div className="form-group">
          <label>Flyer Image URL</label>
          <input name="event_flyer_image_url" type="url" />
        </div>
        <div className="form-group">
          <label>Club Name</label>
          <input name="club_name" type="text" required />
        </div>
        <div className="form-group">
          <label>Club ID</label>
          <input name="club_id" type="text" required />
        </div>
        <div className="form-group">
          <label>Club Logo Image URL</label>
          <input name="club_logo_image_url" type="url" />
        </div>
        <div className="form-group">
          <label>Organizer Name</label>
          <input name="club_organizer_name" type="text" required />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => handlePopupToggle("create-event")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Student Data Popup Modal */}
     {/* Student Data Popup Modal */}
{isStudentDataPopupOpen && (
  <div
    className="create-event-popup-overlay"
    onClick={() => handlePopupToggle("student-data")}
  >
    <div
      className={`create-event-popup-content ${
        isDarkTheme ? "dark" : "light"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Student Data</h2>
      <form onSubmit={handleStudentDataSubmit} className="create-event-form">
        <div className="form-group">
          <label>Student ID</label>
          <input
            name="student_id"
            type="text"
            placeholder="Enter Student ID"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Search</button>
          <button
            type="button"
            onClick={() => handlePopupToggle("student-data")}
          >
            Cancel
          </button>
        </div>
      </form>
      {studentEvents && (
        <div className="event-results">
          <h3>Registered Events</h3>
          {studentEvents.length > 0 ? (
            <div className="event-list">
              {studentEvents.map((event, index) => (
                <div
                  key={`${event.event_title}-${event.event_date}-${index}`}
                  className="event-item"
                >
                  <p><strong>Club Name:</strong> {event.club_name}</p>
                  <p><strong>Event Title:</strong> {event.event_title}</p>
                  <p><strong>Event Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events found for this student.</p>
          )}
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default Navbar;