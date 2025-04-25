import "../styles/home.css";
import HelloSVG from "../../../assets/hello.svg";
import Navbar from "../menu/navbar"; // Import Navbar Component

const Home = () => {
  return (
    <div className="club-class">
      <header className="header">
        <Navbar />
      </header>
    <div className="homepage-container">


      {/* Content Section */}
      <div className="home-content">
        <div className="text-section">
          <p>
            Easily manage events, streamline registrations, 
            and explore galleries of past and present events.
          </p>
          <p>
            Stay updated with club activities, meet current members, 
            and celebrate the legacy of former leaders—all in one seamless platform.
          </p>
          <p className="subtext">
            Join us, where connections turn into communities, and ideas transform into experiences.
          </p>
        </div>

        {/* SVG Illustration */}
        <div className="illustration">
          <img src={HelloSVG} alt="Welcome Illustration"/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
