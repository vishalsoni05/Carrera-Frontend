import { useEffect, useState } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9096/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
