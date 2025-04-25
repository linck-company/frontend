import "../styles/EventDetailsPage.css";
import Navbar from "../menu/navbar"; // Ensure the path is correct

const EventDetailsPage = () => {
  return (
    <div className="club_activites_det_page-container">
      {/* Navbar Section */}
      <header className="navbar-header">
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="event-container">
        {/* Left Section - Event Details */}
        <div className="event-details">
          <h1>
            SPEED CUBE <span className="event-title-highlight">- a competition</span>
          </h1>
          <p className="event-date">September 14th 2025 - 5pm</p>

          <h2>Event Description</h2>
          <p>
            This event is very important! Ready to twist, turn, and solve? Whether you&rsquo;re a seasoned speedcuber or just learning how to solve your first 3x3, join us for an afternoon of solving, sharing, and sharpening your cube skills! Meet other cube enthusiasts, try out different puzzle types (2x2, 3x3, Pyraminx, Mirror Cubes & more).
          </p>

          <h2>Objective</h2>
          <p>
            Ignite passion, sharpen skills, and unite cubers through thrilling challenges & shared community.
          </p>

          <h2>Location</h2>
          <p className="location-address">Address</p>
          {/* Placeholder for address details */}

          <h2>Resource Person / Chief Guest</h2>
          <div className="chief-guest">
            <p><strong>Varadha Rajamannar</strong></p>
            <p><em>Chief Guest</em></p>
            <p>
              He has been solving cubes competitively for over 6 years, with a personal best of 7.89 seconds in 3x3. At this event, Varadha will be running a live solving demo and a Q&A session for inspiring speedcubers.
            </p>
            <p><em>Photo</em></p> {/* Placeholder for photo */}
          </div>

          <div className="button-container"> {/* Flex container for side-by-side buttons */}
            <button className="btn btn-attendance">Take Attendance</button>
            <button className="btn btn-close">Close Event</button>
          </div>
        </div>

        {/* Right Section - Club Poster and Host Info */}
        <div className="sidebar">
          <div className="club-poster">
            <h3>Club Poster</h3>
            <div className="poster-placeholder">
              <span role="img" aria-label="mountain">🏔️</span> {/* Placeholder for poster image */}
            </div>
          </div>
          <p style={{ marginBottom: "10px" }}><strong>Host Name</strong></p> {/* Added margin-bottom */}
          <div className="button-group"> {/* New container for Contact and Follow buttons */}
            <button className="btn btn-contact">Contact</button>
            <button className="btn btn-follow">+ Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;