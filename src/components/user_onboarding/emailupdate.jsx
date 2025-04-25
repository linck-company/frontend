import Modal from "react-modal";
import { useState } from "react";
import "../styles/email.css";

export default function EmailUpdateForm({
  isOpen,
  onClose,
  currentEmail,
  onEmailUpdate,
}) {
  const [newEmail, setNewEmail] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail) || !emailRegex.test(verificationEmail)) {
      setError("Please enter valid email addresses");
      return;
    }

    // Reset error and fields
    setError("");
    setNewEmail("");
    setVerificationEmail("");
    // Pass the new email back to the parent and close modal
    onEmailUpdate(newEmail);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="email-modal-container"
      overlayClassName="email-modal-overlay"
    >
      <div className="email-modal-box">
        <button
          onClick={onClose}
          className="email-close-button"
          style={{ color: "red" }}
        >
          ✕
        </button>
        <h2 className="email-modal-title">Update Email</h2>
        <form onSubmit={handleSubmit} className="email-form-container">
          <div>
            <label className="email-form-label">Current Email</label>
            <input
              type="email"
              value={currentEmail}
              className="email-input-field email-disabled"
              disabled
            />
          </div>

          <div>
            <label className="email-form-label">New Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="email-input-field"
              required
              placeholder="Enter your new email"
            />
          </div>

          <div>
            <label className="email-form-label">Verification Email</label>
            <input
              type="email"
              value={verificationEmail}
              onChange={(e) => setVerificationEmail(e.target.value)}
              className="email-input-field"
              required
              placeholder="Enter email for verification"
            />
          </div>

          {error && <div className="email-error-message">{error}</div>}

          <button type="submit" className="email-submit-button">
            Update
          </button>
        </form>
      </div>
    </Modal>
  );
}
