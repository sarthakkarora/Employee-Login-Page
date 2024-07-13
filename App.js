import React, { useState } from 'react';
import './App.css';;

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    phoneNumber: ''
  });

  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

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
    else if (new Date(formData.dob) >= new Date()) formErrors.dob = "Date of Birth must be in the past";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber)) formErrors.phoneNumber = "Phone Number must be 10 digits";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setShowModal(true);
    } else {
      setErrors(formErrors);
    }
  };

  const confirmSubmit = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      address: '',
      phoneNumber: ''
    });
    setErrors({});
  };

  return (
    <div className="App">
      {isEditing ? (
        <>
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
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </form>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Confirm Submission</h3>
                <p>Are you sure you want to submit the form?</p>
                <button onClick={confirmSubmit}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="details">
          <h2>Details</h2>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => alert(JSON.stringify(formData, null, 2))}>View as JSON</button>
        </div>
      )}
    </div>
  );
}

export default App;
