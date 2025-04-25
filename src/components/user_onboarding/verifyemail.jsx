import "../styles/verifyemail.css";
import { useState } from "react";

const VerificationPopup = ({ isOpen, onClose, onVerify, verificationCode, messageApi }) => {
  const [inputCode, setInputCode] = useState("");

  const handleVerify = () => {
    if (!inputCode) {
      messageApi.open({
        type: "warning",
        content: "Please enter a verification code",
      });
      return;
    }

    if (inputCode === verificationCode) {
      console.log("Hello");
      messageApi.open({
        type: "success",
        content: "Email verified successfully",
      });
      onVerify(true);
      onClose(); // No delay needed since contextHolder is in parent
    } else {
      messageApi.open({
        type: "error",
        content: "Invalid verification code",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Verify Email</h2>
        <p>Enter the verification code sent to your email</p>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className="form-input"
          placeholder="Enter code"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
       <button onClick={handleVerify} className="save-button">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;