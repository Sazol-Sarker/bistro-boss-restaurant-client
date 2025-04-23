import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // start at 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
        navigate('/dashboard/paymentHistory'); 
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div>
      <h2>Payment successful!</h2>
      <p>Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...</p>
    </div>
  );
};

export default PaymentSuccess;


