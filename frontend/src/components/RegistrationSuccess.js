import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationSuccess.css';  // Add your CSS here

export default function RegistrationSuccess() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/user/${username}`);
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  const handleGoHome = () => {
    navigate('/'); // or your desired landing page
  };

  if (loading) return <p className="status-message">Loading user data...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <section className="registration-success-container">
      <h2>Registration Successful!</h2>
      <h3>Welcome, {userData?.username || 'User'}</h3>
      <p>Your registration details:</p>
      <ul>
        <li><strong>Email:</strong> {userData?.email || '-'}</li>
        <li><strong>Branch:</strong> {userData?.branch || '-'}</li>
        <li><strong>Year:</strong> {userData?.year || '-'}</li>
        {userData?.fatherName && <li><strong>Father's Name:</strong> {userData.fatherName}</li>}
        {userData?.motherName && <li><strong>Mother's Name:</strong> {userData.motherName}</li>}
        {userData?.hobby && <li><strong>Hobby:</strong> {userData.hobby}</li>}
      </ul>
      <button className="btn-home" onClick={handleGoHome}>Go to Home</button>
    </section>
  );
}
