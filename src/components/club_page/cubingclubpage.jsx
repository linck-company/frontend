import { useRef, useState, useEffect } from "react";
import "../styles/clubpage.css";
import Navbar from "../menu/navbar";
import img1 from "../../../assets/IMG_5100.jpg";
import img2 from "../../../assets/IMG_5255.jpg";
import img3 from "../../../assets/IMG_5408.jpg";
import img4 from "../../../assets/IMG_5505.jpg";
import img5 from "../../../assets/IMG_8958.jpg";
import { performGetLegacyHolders } from "../../../api/gandalf"; // Adjust the import path as needed
import { ERROR_STATUS_CODE } from "../../../api/api"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import { performLogout } from "../../../api/auth"; // Adjust the import path as needed

const teamMembers = [
  { name: "Aditya", role: "Founder", image: img1, className: "center-cubing" },
  { name: "Harshith", role: "Faculty Advisor", image: img2, className: "member1-cubing" },
  { name: "Karthik", role: "Current Convener", image: img3, className: "member2-cubing" },
  { name: "Sri", role: "Faculty", image: img4, className: "member3-cubing" },
  { name: "Eswar", role: "Co Convener", image: img5, className: "member4-cubing" },
];

const legacyHolders = [
  { name: "Aditya", role: "Ex - Convener", image: img1, year: "2024-2025" },
  { name: "Harshith", role: "Ex - COCO", image: img2, year: "2024-2025" },
  { name: "Karthik", role: "Faculty Advisor", image: img3, year: "2024-2025" },
  { name: "Karthik", role: "Faculty Advisor", image: img3, year: "2024-2025" },
  { name: "Karthik", role: "Faculty Advisor", image: img3, year: "2024-2025" },
  { name: "Karthik", role: "Faculty Advisor", image: img3, year: "2024-2025" },
  { name: "Aditya", role: "Ex - Convener", image: img1, year: "2024-2025" },
  { name: "Aditya", role: "Ex - Convener", image: img1, year: "2024-2025" },
  { name: "Eswar", role: "Event Organiser", image: img4, year: "2023-2024" },
  { name: "Harshith", role: "Ex - COCO", image: img5, year: "2023-2024" },
  { name: "Karthik", role: "Faculty Advisor", image: img1, year: "2023-2024" },
  { name: "Eswar", role: "Event Organiser", image: img2, year: "2022-2023" },
];

const ClubPage = () => {
  const legacyRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [legacyData, setLegacyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const entity_id = "cubing_club"; // Replace with actual entity_id if dynamic

  // Fetch legacy holders when popup is opened
  useEffect(() => {
    if (isPopupOpen) {
      const fetchLegacyHolders = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await performGetLegacyHolders(entity_id);
          if (response.data.status_code === ERROR_STATUS_CODE) {
            await performLogout();
            navigate("/", { replace: true });
            return;
          }
          if (response.data.status_code === 200) {
            setLegacyData(response.data.data); // Store API data (grouped by year)
          } else {
            setError("Failed to fetch legacy holders data.");
          }
        } catch (err) {
          console.error("Error fetching legacy holders:", err);
          setError(err.message || "Failed to fetch legacy holders data.");
        } finally {
          setLoading(false);
        }
      };
      fetchLegacyHolders();
    }
  }, [isPopupOpen, navigate]);

  const handleShowMore = () => {
    legacyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      setLegacyData(null); // Reset data when opening popup to trigger fetch
    }
  };

  // Group hardcoded legacy holders by year for "Our Core Pal" section
  // const groupedByYear = legacyHolders.reduce((acc, member) => {
  //   (acc[member.year] = acc[member.year] || []).push(member);
  //   return acc;
  // }, {});

  return (
    <div className="club-class">
      <header className="header">
        <Navbar />
      </header>
      <div className="club-container-cubing">
        {/* Club Content */}
        <div className="club-content-cubing">
          <div className="club-header-cubing">
            <div className="club-logo-cubing">club logo</div>
            <h1 className="club-title-cubing">Cubing Club</h1>
          </div>
          <p>
            We explore diverse genres, from classical to contemporary, rock to jazz, and everything in between.
          </p>
          <p>
            Through jam sessions, live performances, workshops, and collaborations, we create an environment where
            talent thrives and creativity flows.
          </p>
          <div className="button-group">
            <button className="show-more-button-cubing" onClick={handleShowMore}>
              Previous Conveners
            </button>
            <button className="core-members-popup-button-cubing" onClick={handlePopupToggle}>
              Previous Club Members
            </button>
          </div>
        </div>

        {/* Team Members */}
        <div className="team-circle-cubing">
          {teamMembers.map((member, index) => (
            <div key={index} className={`team-member-cubing ${member.className}`}>
              <img src={member.image} alt={member.name} className="member-image-cubing" />
              <p className="role-cubing">{member.role}</p>
              <h3 className="member-name-cubing">{member.name}</h3>
            </div>
          ))}
        </div>

        {/* Legacy Holders */}
        <div className="legacy-holders-section-cubing" ref={legacyRef}>
          <h2 className="legacy-title-cubing">Our Core Pal</h2>
          <div className="legacy-grid-cubing">
            {legacyHolders.map((holder, index) => (
              <div key={index} className="legacy-card-cubing">
                <p className="legacy-name-cubing">
                  <strong>{holder.name}</strong>
                </p>
                <p className="legacy-role-cubing">{holder.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="core-members-popup-overlay" onClick={handlePopupToggle}>
            <div className="core-members-popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>Previous Club Members</h2>
              <div className="core-members-popup-scrollable">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : legacyData ? (
                  Object.keys(legacyData).length > 0 ? (
                    Object.keys(legacyData).map((year) => (
                      <div key={year} className="core-members-year-section">
                        <h3>{year}</h3>
                        <div className="core-members-member-grid">
                          {legacyData[year].map((member, index) => (
                            <div key={index} className="core-members-member-card">
                              <img
                                src={member.image_url || "https://via.placeholder.com/150"}
                                alt={member.name}
                                className="core-members-member-image-popup"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                              />
                              <div className="core-members-member-info">
                                <p className="core-members-member-name-popup">
                                  <strong>{member.name}</strong>
                                </p>
                                <p className="core-members-member-role-popup">{member.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No legacy holders found.</p>
                  )
                ) : (
                  <p>Loading data...</p>
                )}
              </div>
              <button className="close-button" onClick={handlePopupToggle}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubPage;