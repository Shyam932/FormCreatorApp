import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms')
      .then(response => setForms(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/form/${id}`)
      .then(() => setForms(forms.filter(form => form._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to Form.com</h1>
      <p className="description">This is a simple form builder</p>
      <Link to="/create-form" className="create-button">Create New Form</Link>
      
      <h2 className="forms-heading">Forms</h2>
      {forms.length === 0 ? (
        <p className="no-forms">You have not created any forms yet.</p>
      ) : (
        <ul className="forms-list">
          {forms.map(form => (
            <li key={form._id} className="form-item">
              <span className="form-title">{form.title}</span>
              <Link to={`/form/${form._id}`} className="view-button">View</Link>
              <Link to={`/edit-form/${form._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(form._id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
