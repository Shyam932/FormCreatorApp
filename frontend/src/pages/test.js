import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditFormPage.css";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Loading...");
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showInputOptions, setShowInputOptions] = useState(false);

  // Fetch form data when the component loads
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/form/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setFields(response.data.fields);
      })
      .catch((error) => console.error("Error fetching form:", error));
  }, [id]);

  // Function to add a new field
  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      placeholder: `Enter ${type}`,
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
    setShowInputOptions(false);
  };

  // Select a field for editing
  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  // Update field properties (label & placeholder)
  const updateField = (key, value) => {
    const updatedFields = fields.map((field) =>
      field.id === selectedField.id ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
    setSelectedField({ ...selectedField, [key]: value });
  };

  // Delete a specific field by ID
  const deleteField = (idToDelete) => {
    const updatedFields = fields.filter((field) => field.id !== idToDelete);
    setFields(updatedFields);
    if (selectedField?.id === idToDelete) setSelectedField(null);
  };

  // Save the updated form to the database
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/form/${id}/edit`, { title, fields })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error updating form:", error));
  };

  return (
    <div className="form-builder-container">
      <h2 className="form-title">Edit Form</h2>

      <div className="form-builder">
        {/* Left Panel: Form Preview */}
        <div className="left-panel">
          <h3>
            {title} {" "}
            <span className="edit-icon" onClick={() => setTitle(prompt("Enter form title") || title)}>
              ✏️
            </span>
          </h3>

          {/* Add Input Button */}
          <button onClick={() => setShowInputOptions(!showInputOptions)}>Add Input</button>

          {/* Input type options */}
          {showInputOptions && (
            <div className="input-options">
              <button onClick={() => addField("text")}>Text</button>
              <button onClick={() => addField("number")}>Number</button>
              <button onClick={() => addField("email")}>Email</button>
              <button onClick={() => addField("password")}>Password</button>
              <button onClick={() => addField("date")}>Date</button>
            </div>
          )}

          {/* Form Preview */}
          <div className="form-preview">
            {fields.length === 0 ? (
              <p className="no-fields">No fields added yet. Click "Add Input" to start.</p>
            ) : (
              fields.map((field) => (
                <div
                  key={field.id}
                  className={`field-item ${selectedField?.id === field.id ? "selected" : ""}`}
                  onClick={() => handleFieldClick(field)}
                >
                  <span className="field-label">{field.label}</span>
                  <input type={field.type} placeholder={field.placeholder} disabled />
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent field selection on delete
                      deleteField(field.id);
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>

          <button className="save-btn" onClick={handleSave}>SAVE CHANGES</button>
        </div>

        {/* Right Panel: Field Editor */}
        <div className="right-panel">
          <h3>Field Editor</h3>

          {selectedField ? (
            <>
              <label>Field Label</label>
              <input
                type="text"
                value={selectedField.label}
                onChange={(e) => updateField("label", e.target.value)}
              />

              <label>Placeholder</label>
              <input
                type="text"
                value={selectedField.placeholder}
                onChange={(e) => updateField("placeholder", e.target.value)}
              />
            </>
          ) : (
            <p>Select a field to edit</p>
          )}
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>SAVE FORM</button>
    </div>
  );
}

export default EditForm;
