"use client"; // Add "use client" directive for Next.js client-side component

import Modal from "react-modal";
import { useState } from "react";
import { message } from "antd"; // Import message from antd
import "../styles/contact.css";
import { ERROR_STATUS_CODE } from "../../../api/api";
import { performLogout, performUpdateContactNumber } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

export default function ContactUpdateForm({ isOpen, onClose, currentPhone, onContactUpdate }) {
  const [newPhone, setNewPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize Ant Design message API
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if newPhone is empty
    if (!newPhone) {
      setError("Phone number is required");
      messageApi.open({
        type: "warning",
        content: "Please enter a phone number",
      });
      return;
    }

    // Basic validation: check if phone number is at least 10 digits
    if (newPhone.length < 10) {
      setError("Phone number must be at least 10 digits");
      messageApi.open({
        type: "error",
        content: "Phone number must be at least 10 digits",
      });
      return;
    }

    // Optional: Additional validation (e.g., only digits)
    if (!/^\d+$/.test(newPhone)) {
      setError("Phone number must contain only digits");
      messageApi.open({
        type: "error",
        content: "Phone number must contain only digits",
      });
      return;
    }

    // Simulate phone number update logic (e.g., API call could go here)
    try {
      // Reset error and fields
      setError("");
      setNewPhone("");

      // API Call
      const response = await performUpdateContactNumber(newPhone);
      if (response.status_code == ERROR_STATUS_CODE) {
        await performLogout();
        navigate("/", { replace: true });
      }

      onContactUpdate(newPhone);
      // Show success message
      messageApi.open({
        type: "success",
        content: "Phone number successfully changed!",
      });

      // Close modal after a short delay to allow message visibility
      setTimeout(() => {
        onClose();
      }, 200); // 200ms delay
    } catch (err) {
      // Handle unexpected errors (e.g., if an API call fails)
      setError("An unexpected error occurred");
      messageApi.open({
        type: "error",
        content: "Failed to update phone number due to an unexpected error",
      });
    }
  };

  return (
    <>
      {contextHolder} {/* Render the context holder for messages */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="contact-modal-container"
        overlayClassName="contact-modal-overlay"
      >
        <div className="contact-modal-box">
          <button
            onClick={onClose}
            className="contact-close-button"
            style={{ color: "red" }}
          >
            ✕
          </button>
          <h2 className="contact-modal-title">Update Phone Number</h2>
          <form onSubmit={handleSubmit} className="contact-form-container">
            <div>
              <label className="contact-form-label">Current Phone Number</label>
              <input
                type="text"
                value={currentPhone}
                className="contact-input-field contact-disabled"
                disabled
              />
            </div>

            <div>
              <label className="contact-form-label">New Phone Number</label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="contact-input-field"
                required
                placeholder="Enter your new phone number"
              />
            </div>

            {/* {error && <div className="contact-error-message">{error}</div>} */}

            <button type="submit" className="contact-submit-button">
              Update
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}