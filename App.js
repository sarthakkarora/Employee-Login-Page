import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.dob) formErrors.dob = "Date of Birth is required";
    if (!formData.address) formErrors.address = "Address is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsEditing(false);
    } else {
      setErrors(formErrors);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'error' : ''}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="details">
          <h2>Details</h2>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default App;
