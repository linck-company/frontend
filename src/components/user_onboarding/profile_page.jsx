"use client";

import "../styles/profile_page.css";
import { useState, useEffect } from "react";
import { message } from "antd";
import PasswordForm from "./passwordupdate";
import EmailUpdateForm from "./emailupdate";
import ContactUpdateForm from "./contactupdate";
import Navbar from "../menu/navbar";
import VerificationPopup from "./verifyemail";
import { useNavigate } from "react-router-dom";
import { performGetUserDetails, performLogout } from "../../../api/auth";
import { ERROR_STATUS_CODE } from "../../../api/api";

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [emailVerified, setEmailVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [contact_number, setContact] = useState("");
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await performGetUserDetails();
        if (response.status_code === ERROR_STATUS_CODE) {
          await performLogout();
          navigate("/", { replace: true });
          return;
        }
        console.log("User Details Response:", response.data);
        setUserDetails(response.data);
        setEmail(response.data.email || "");
        setContact(response.data.mobile_number || "");
        setError(null);
      } catch (err) {
        console.error("Error fetching user details:", err.message);
        setError(err.message || "Failed to fetch user details");
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleContactUpdate = (newPhone) => {
    setContact(newPhone);
    setUserDetails((prev) => ({ ...prev, mobile_number: newPhone }));
  };

  // Render loading state
  if (loading) {
    return <div>Loading user details...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render when userDetails is available
  if (!userDetails) {
    return <div>No user details found.</div>;
  }

  const sendVerificationEmail = (email) => {
    const generatedCode = "3132";
    setVerificationCode(generatedCode);
    console.log(`Sending verification code ${generatedCode} to ${email}`);
    return generatedCode;
  };

  const handleEmailUpdate = (newEmail) => {
    setEmail(newEmail);
    setUserDetails((prev) => ({ ...prev, email: newEmail }));
    sendVerificationEmail(newEmail);
    setIsEmailModalOpen(false);
    setIsVerificationOpen(true);
  };

  const handleVerificationComplete = (isValid) => {
    if (isValid) {
      setEmailVerified(true);
      setIsVerificationOpen(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="profile-class">
        <header className="header">
          <Navbar />
        </header>

        <main className="homepage-container">
          <div className="profile-form">
            <h1 className="profile-title">My Profile</h1>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <div className="input-container">
                  <input type="text" defaultValue={userDetails.first_name} className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Last Name</label>
                <div className="input-container">
                  <input type="text" defaultValue={userDetails.last_name} className="form-input" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <input type="password" defaultValue="sbdfbnd65sfdvbs" className="form-input" readOnly />
                <button className="edit-button" onClick={() => setIsModalOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <PasswordForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              </div>
              <div className="password-popup-text"></div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-container">
                <input type="email" value={email} className="form-input" readOnly />
                <div className="input-actions">
                  <button className="edit-button" onClick={() => setIsEmailModalOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  {emailVerified ? (
                    <div className="verified-badge">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="unverified-badge">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <EmailUpdateForm
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
              currentEmail={email}
              onEmailUpdate={handleEmailUpdate}
            />
            <VerificationPopup
              isOpen={isVerificationOpen}
              onClose={() => setIsVerificationOpen(false)}
              onVerify={handleVerificationComplete}
              verificationCode={verificationCode}
              messageApi={messageApi}
            />

            <div className="form-group">
              <label className="form-label">Program</label>
              <div className="input-container">
                <input
                  type="text"
                  defaultValue="B.tech, Computer Science & Engineering - UG Full Time"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <div className="input-container">
                <input type="tel" value={contact_number} className="form-input" readOnly />
                <button className="edit-button" onClick={() => setIsContactModalOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <ContactUpdateForm
              isOpen={isContactModalOpen}
              onClose={() => setIsContactModalOpen(false)}
              currentPhone={contact_number}
              onContactUpdate={handleContactUpdate}
            />

            <div className="form-actions">
              <button className="cancel-button">Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;