// src/components/OtpVerificationPage.js

import React, { useState, useRef } from "react";
import "./OTPVerificationPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserInfoPage from "../user/userinfo/UserInfoPage";

function OtpVerificationPage({ phoneNumber }) {
  const [userOtp, setUserOtp] = useState(["", "", "", ""]);
  const [showUserInfoPage, setShowUserInfoPage] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...userOtp];
      newOtp[index] = value;
      setUserOtp(newOtp);

      // Automatically move to the next input field if a digit is entered
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Optionally, move to the previous field if backspace is pressed and the field is empty
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const otp = userOtp.join('');
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP Verified Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          setShowUserInfoPage(true);
        }, 3000); // Wait for the toast to disappear before showing the user info page
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      toast.info("OTP Resent Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <div>
      {showUserInfoPage ? (
        <UserInfoPage />
      ) : (
        <div className="otp-container">
          <ToastContainer />

          <h2 className="verify-title">Verify OTP</h2>
          <p className="otp-instructions">Enter the OTP sent to {phoneNumber}</p>
          <div className="otp-inputs">
            {userOtp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <button className="verify-button" onClick={handleVerify}>
            VERIFY →
          </button>
          <button className="resend-otp" onClick={handleResendOtp}>
            RESEND OTP
          </button>
        </div>
      )}
    </div>
  );
}

export default OtpVerificationPage;
