import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/jobs/${id}`)
      .then(response => setJob(response.data))
      .catch(() => setError('Job not found or server error.'));

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [id]);

  const handleApply = () => {
    if (!user) {
      setSuccess('You must be logged in to apply.');
      return;
    }

    axios.post('/api/applications', {
      applicantName: user.username,
      applicantEmail: user.email,
      jobId: parseInt(id),
      userId: user.id,
    })
      .then(() => setSuccess('Application submitted successfully!'))
      .catch((error) => {
        if (error.response && typeof error.response.data === 'string') {
          setSuccess(error.response.data);
        } else {
          setSuccess('Something went wrong. Try again.');
        }
      });
  };

  if (error) return <p className="job-details-error">{error}</p>;
  if (!job) return <p className="job-details-loading">Loading...</p>;
return (
  <div className="job-details-container">
    <div className="job-details-card">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> ₹{Number(job.salary).toLocaleString()}</p>

      <h3 className="job-details-title">Apply for this job</h3>

      {!user ? (
        <div className="job-details-login">
          You must
          <button onClick={() => navigate('/login')}>&nbsp;login&nbsp;</button>
          to apply.
        </div>
      ) : (
        <>
          <input
            type="text"
            value={user.username}
            disabled
            className="job-details-input"
          />
          <input
            type="email"
            value={user.email}
            disabled
            className="job-details-input"
          />
          <button onClick={handleApply} className="job-details-button">
            Submit Application
          </button>
        </>
      )}

      {success && <p className="job-details-success">{success}</p>}
    </div>
  </div>
);
}

export default JobDetails;
