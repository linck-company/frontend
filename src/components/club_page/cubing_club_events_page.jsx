import buddaImage from '../../../assets/budda.png';
import '../styles/clubpage_events.css';
import Navbar from '../menu/navbar'; // Import Navbar component

const EventsPage = () => {
  return (
    <div className="club-class">
      <header className="header">
        <Navbar />
      </header>
    <div className="club_activites_page-container">
      {/* Navbar */}
      

      {/* Image Section */}
      <div className='club-image'>
        <img src={buddaImage} alt="Club Event" className="club-banner" />
      </div>

      {/* Club Content */}
      <div className="club_activites_page-content">
        <div className="club_activites_page-header">
          <h1 className="club_activites_page-title">
            <span className="highlight">Activities & Events</span>
          </h1>
        </div>
        <p>
          🔹The Cubing Club at SRM AP University is a vibrant student-led initiative dedicated to promoting the art and science of speedcubing. The club serves as a community for puzzle enthusiasts, fostering a culture of curiosity, problem-solving, and dexterity. Whether you&rsquo;re a beginner exploring the wonders of the Rubik&rsquo;s Cube or an experienced speedcuber mastering advanced techniques, the Cubing Club offers a platform for all.
        </p>
        <p>🔹 Workshops & Training Sessions – Learn solving techniques, advanced algorithms, and speedcubing strategies from experienced cubers.</p>
        <p>🔹 Speedcubing Competitions – Test your skills against fellow cubers in official and friendly competitions, featuring events like 3x3, 4x4, Pyraminx, and more.</p>
        <p>🔹 Puzzle Exploration Sessions – Discover and solve different types of twisty puzzles beyond the Rubik’s Cube, including Megaminx, Mirror Cube, and Ghost Cube.</p>
        <p>🔹 Inter-College & National Competitions – Represent SRM AP in larger tournaments and compete with cubers from across the country.</p>
        <p>🔹 Community Meetups & Game Nights – Connect, share strategies, and enjoy cubing in a relaxed and social setting.</p>
        <p>
          Whether you&rsquo;re here to improve your solving times, explore new puzzles, or just have fun with friends, the Cubing Club at SRM AP has something for everyone. Join us and be part of the excitement! 🚀🎲
        </p>   
      </div>
    </div></div>
  );
};

export default EventsPage;
