import { Link } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <p>
        <i>
          Contact your Club convener or faculty advisor. As reset password is blocked by your admin.
        </i>
      </p>
      <div className="login-back">
        <i> Go back to 
        <Link to="/"><span> Login</span></Link>
        </i>
      </div>
    </div>
  );
};

export default Signup;

















// import '../styles/signup.css';
// import { Link } from 'react-router-dom';
// import './user.css';

// const Signup = () => (
//   <div className="login-container">
//     <h1>Signup</h1>
//     <p>Create your account.</p>
//     <form className="login-form">
//       <div className="signup-group">
//         <label htmlFor="username">Username</label>
//         <input type="text" id="username" placeholder="Username" required />
//       </div>
//       <div className="signup-group">
//         <label htmlFor="email">Email</label>
//         <input type="email" id="email" placeholder="Email" required />
//       </div>
//       <div className="signup-group">
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" placeholder="Password" required />
//       </div>
//       <button type="submit" className="login-button">Signup</button>
//       <p className="login-text">
//         Already have an account? <Link to="/" className="signup-link">Login</Link>
//       </p>
//     </form>
//     <div className="footer-links">
//       <a href="#">Terms & Conditions</a>
//       <a href="#">Support</a>
//       <a href="#">Customer Care</a>
//     </div>
//   </div>
// );

// export default Signup;
