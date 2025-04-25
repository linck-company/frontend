"use client";

import Modal from "react-modal";
import { useState } from "react";
import { Lock } from "lucide-react";
import { message } from "antd"; // Import message from antd
import "../styles/password.css";
import { ERROR_STATUS_CODE } from "../../../api/api.jsx"
import { performChangePassword, performLogout } from "../../../api/auth";
import { useNavigate } from "react-router-dom";


export default function PasswordForm({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Initialize Ant Design message API
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      messageApi.open({
        type: "warning",
        content: "Please fill in all fields",
      });
      return;
    }

    // Check if new password meets minimum length (already enforced by minLength, but for consistency)
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      messageApi.open({
        type: "error",
        content: "New password must be at least 6 characters",
      });
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      messageApi.open({
        type: "error",
        content: "Passwords do not match",
      });
      return;
    }

    // Simulate password update logic (e.g., API call could go here)
    try {
      // Reset error and fields
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // API Call
      const response = await performChangePassword(oldPassword, newPassword, confirmPassword);
      if (response.status_code == ERROR_STATUS_CODE) {
        await performLogout();
        navigate('/', { replace: true });
      }

      // Show success message
      messageApi.open({
        type: "success",
        content: "Password successfully changed!",
      });

      // Close modal after a short delay to allow message visibility
      setTimeout(() => {
        onClose();
      }, 200); // 1-second delay
    } catch (err) {
      // Handle unexpected errors (e.g., if an API call fails)
      setError("An unexpected error occurred");
      messageApi.open({
        type: "error",
        content: "Failed to update password due to an unexpected error",
      });
    }
  };

  return (
    <>
      {contextHolder} {/* Render the context holder for messages */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-box">
          <button
            onClick={onClose}
            className="close-button"
            style={{ color: "red" }}
          >
            ✕
          </button>
          <h2 className="modal-title">Reset Password</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label className="passform-label">Old Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input-field"
                  required
                  placeholder="Enter your old password"
                />
                <Lock className="input-icon" size={18} />
              </div>
            </div>

            <div>
              <label className="passform-label">New Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                />
                <Lock className="input-icon" size={18} />
              </div>
            </div>

            <div>
              <label className="passform-label">Confirm Password</label>
              <div className="input-container">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  required
                  placeholder="Confirm your new password"
                />
                <Lock className="input-icon" size={18} />
              </div>
            </div>

            {/* {error && <div className="error-message">{error}</div>} */}

            <button type="submit" className="submit-button">
              Update
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}