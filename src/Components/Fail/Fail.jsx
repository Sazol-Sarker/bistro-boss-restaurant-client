import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Fail = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/dashboard/paymentHistory");
    }, 3000);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div>
      <h2>Payment failed!</h2>
      <p>
        Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
      </p>
    </div>
  );
};

export default Fail;
