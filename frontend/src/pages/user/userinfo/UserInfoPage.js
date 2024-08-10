// src/components/UserInfoPage.js

import React, { useState } from 'react';
import './UserInfoPage.css';
import PaymentSchemePage from '../paymentscheme/PaymentSchemePage';

function UserInfoPage() {
  const [showPaymentSchemePage, setShowPaymentSchemePage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaymentSchemePage(true);
  };

  const handleBack = () => {
    setShowPaymentSchemePage(false);
  };

  return (
    <div>
      {showPaymentSchemePage ? (
        <PaymentSchemePage onBack={handleBack} />
      ) : (
        <div className="user-info-container">
          <h2 className="welcome-message">Welcome to Atchayam</h2>
          <h3 className="instruction">Tell us more about you</h3>
          
          <form className="user-info-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">Name</label>
            <div className="input-group">
              <span role="img" aria-label="user" className="input-icon">👤</span>
              <input type="text" id="name" name="name" className="input-field" placeholder="Name" required />
            </div>

            <label className="form-label" htmlFor="address">Address</label>
            <textarea id="address" name="address" className="input-field" placeholder="Type your address here..." required></textarea>

            <button type="submit" className="submit-button">UPDATE →</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserInfoPage;
