
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 
import { Link, useLocation } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    category: ''
  });

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'ROLE_ADMIN';

  useEffect(() => {
  
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const queryFromUrl = params.get('query') || params.get('title');

    if (categoryFromUrl) {
      setSearchTerm(categoryFromUrl);
      fetchJobsByCategory(categoryFromUrl);
    } else if (queryFromUrl) {
      setSearchTerm(queryFromUrl);
      fetchJobs(queryFromUrl);
    } else {
      fetchJobs();
    }
   
  }, [location.search]);

  const fetchJobs = (search = '') => {
    setMessage('');
    let url = `/api/jobs`;
    if (search && search.trim() !== '') {
      url = `/api/jobs/search?query=${encodeURIComponent(search)}`;
    }
    axios.get(url)
      .then(res => setJobs(res.data))
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setMessage('Failed to fetch jobs.');
      });
  };

  const fetchJobsByCategory = (category) => {
    setMessage('');
    const url = `/api/jobs/search?category=${encodeURIComponent(category)}`;
    axios.get(url)
      .then(res => setJobs(res.data))
      .catch(err => {
        console.error('Error fetching category jobs:', err);
        setMessage('Failed to fetch jobs for category.');
      });
  };

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchTerm(v);
 
    if (v.trim() === '') {
      fetchJobs();
    } else {
      fetchJobs(v);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setForm({ title: '', company: '', location: '', description: '', salary: '', category: '' });
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/jobs`, {
        title: form.title,
        company: form.company,
        location: form.location,
        description: form.description,
        salary: form.salary ? Number(form.salary) : 0,
        category: form.category || null
      });
      setShowCreateModal(false);
      fetchJobs(searchTerm);
      setMessage('Job created successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to create job.');
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      description: job.description || '',
      salary: job.salary || '',
      category: job.category || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    try {
      await axios.put(`/api/jobs/${editingJob.id}`, {
        title: form.title,
        company: form.company,
        location: form.location,
        description: form.description,
        salary: form.salary ? Number(form.salary) : 0,
        category: form.category || null
      });
      setShowEditModal(false);
      setEditingJob(null);
      fetchJobs(searchTerm);
      setMessage('Job updated successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update job.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(prev => prev.filter(j => j.id !== id));
      setMessage('Job deleted.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete job.');
    }
  };

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <input
          className="jobs-search"
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <h2 className="jobs-title">
          Available Jobs
        </h2>

        {/* Admin-only Create button - aligned right */}
        {isAdmin && (
          <div >
            <button className="create-job-btn" onClick={openCreateModal} >+ Create Job</button>
          </div>
        )}
      </div>

      {message && <div style={{ marginBottom: 12, color: '#0656d8' }}>{message}</div>}

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> ₹{Number(job.salary || 0).toLocaleString()}</p>
            {job.category && <p><strong>Category:</strong> {job.category}</p>}

            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <Link to={`/jobs/${job.id}`}>
                <button className="apply-btn">View / Apply</button>
              </Link>

              {isAdmin && (
                <>
                  <button className="edit-btn" onClick={() => openEditModal(job)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onMouseDown={() => setShowCreateModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <h3>Create Job</h3>
            <form onSubmit={handleCreateSubmit}>
              <input name="title" value={form.title} onChange={handleFormChange} placeholder="Job title" required />
              <input name="company" value={form.company} onChange={handleFormChange} placeholder="Company" required />
              <input name="location" value={form.location} onChange={handleFormChange} placeholder="Location" />
              <input name="salary" value={form.salary} onChange={handleFormChange} placeholder="Salary" type="number" />
              <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category" />
              <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" rows="4" />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="modal-cancel">Cancel</button>
                <button type="submit" className="modal-submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onMouseDown={() => setShowEditModal(false)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <h3>Edit Job</h3>
            <form onSubmit={handleEditSubmit}>
              <input name="title" value={form.title} onChange={handleFormChange} placeholder="Job title" required />
              <input name="company" value={form.company} onChange={handleFormChange} placeholder="Company" required />
              <input name="location" value={form.location} onChange={handleFormChange} placeholder="Location" />
              <input name="salary" value={form.salary} onChange={handleFormChange} placeholder="Salary" type="number" />
              <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category" />
              <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" rows="4" />
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => { setShowEditModal(false); setEditingJob(null); }} className="modal-cancel">Cancel</button>
                <button type="submit" className="modal-submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobList;


