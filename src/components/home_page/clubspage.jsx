import { useEffect, useState } from "react"; // Consolidated import
import { Link, useNavigate } from "react-router-dom"; // Removed useNavigate since it's not used
import Navbar from "../menu/navbar";
import "../styles/homepage.css";
import "../styles/navbar.css"; // Import navbar styles
import { performGetEntityDetails } from "../../../api/gandalf";
import { ERROR_STATUS_CODE } from "../../../api/api";
import { performLogout } from "../../../api/auth";




// const clubs = [
//   {
//     name: "Cubing Club",
//     path: "cubingclubpage",
//     logo: "https://media.istockphoto.com/id/1993983703/photo/themis-statue-of-justice-law-legal-system-justice-crime-concept-3d-render.jpg?s=2048x2048&w=is&k=20&c=BkvA1H0lkn-3iF1LVrzdIamPpMyyJy4Zr7e34obVnfg=",
//   },
//   { name: "Music Club", path: "musicclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Sports Club", path: "sportsclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Coding Club", path: "codingclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Psychology Club", path: "psychologyclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Wellness Club", path: "wellnessclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Theatre Club", path: "theatreclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Dance Club", path: "danceclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Cinematic Club", path: "cinematicclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Photography Society", path: "photographysocietypage", logo: "https://via.placeholder.com/150" },
//   { name: "Creative Arts Club", path: "creativeartsclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Tennis Club", path: "tennisclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Badminton Club", path: "badmintonclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Gymnasium Club", path: "gymnasiumclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Fitness Club", path: "fitnessclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Carrom Club", path: "carromclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Table Tennis Club", path: "tabletennisclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Chess Club", path: "chessclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Volleyball Club", path: "volleyballclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Football Club", path: "footballclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Kabaddi Club", path: "kabaddiclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Athletic Club", path: "athleticclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Basketball Club", path: "basketballclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Cricket Club", path: "cricketclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Brain and Mind Strategic Games", path: "brainmindgamespage", logo: "https://via.placeholder.com/150" },
//   { name: "E-Sports", path: "esportspage", logo: "https://via.placeholder.com/150" },
//   { name: "Quiz Club", path: "quizclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Anime Society", path: "animesocietypage", logo: "https://via.placeholder.com/150" },
//   { name: "Yoga and Meditation Club", path: "yogameditationclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Smart Tech Club", path: "smarttechclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Functional Management Club", path: "functionalmanagementclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Autonomous Vehicle Club", path: "autonomousvehicleclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Maths Club", path: "mathsclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Electronic System Design Club", path: "electronicsystemdesignclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "SEDS Club", path: "sedsclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Professional Societies", path: "professionalsocietiespage", logo: "https://via.placeholder.com/150" },
//   { name: "E-Cell Club", path: "ecellclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "Communication and Critical Thinking Club", path: "communicationcriticalthinkingclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "ACTS Club", path: "actsclubpage", logo: "https://via.placeholder.com/150" },
//   { name: "History and Heritage Club", path: "historyheritageclubpage", logo: "https://via.placeholder.com/150" },
// ];

const ClubPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clubDetails, setClubDetails] = useState([]);

  useEffect(() => {
    const fetchClubDetails = async () => {
      console.log("Fetching club details...");
      setLoading(true);
      setError("");
      const response = await performGetEntityDetails();
      console.log(response);
      setLoading(false);
      if (response.status_code == ERROR_STATUS_CODE) {
        await performLogout();
        navigate('/', { replace: true });
      }
      if (response && response.data && response.data.entities) {
        setClubDetails(response.data.entities); // Set the club details in state
      }
    };

    fetchClubDetails(); // Call the fetch function
  }, [navigate]);

  const clubs = clubDetails.map(club => ({
    name: club.name,
    founder: club.founder,
    co_founder: club.co_founder,
    club_email: club.club_email,
    description: club.description,
    year_established: club.year_established,
    club_logo_image_url: club.club_logo_image_url,
    club_banner_image_urll: club.club_banner_image_url,
    club_website_url: club.club_website_url,
    club_twitter_url: club.club_twitter_url,
    club_youtube_url: club.club_youtube_url,
    club_facebook_url: club.club_facebook_url,
    club_linkedin_url: club.club_linkedin_url,
    club_instagram_url: club.club_instagram_url,
    currentCoreMembers: club.current_core_members
  }));

  console.log()
  // Reintroduce search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clubs based on search term
  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="homepage-container">
      {/* Navbar in Header */}
      <header className="header">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="club-content">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Club Cards */}
        <div className="club-cards-container">
          {filteredClubs.map((club, index) => (
            <Link to={`/clubpage/${club.name}`} key={index} className="club-card">
              {/* Club Logo */}
              <img src={club.logo} alt={`${club.name} Logo`} className="club-logo" />

              {/* Club Details */}
              <div className="club-info">
                <h2>{club.name}</h2>
                <p>📍 SRM University AP</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClubPage;