import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormBuilder.css";

function FormBuilder() {
  const [title, setTitle] = useState("Untitled Form");
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showInputOptions, setShowInputOptions] = useState(false);
  const navigate = useNavigate();

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
    setShowInputOptions(false); // Hide options after selecting one
  };

  // Select a field for editing
  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  // Update field properties (title & placeholder)
  const updateField = (key, value) => {
    const updatedFields = fields.map((field) =>
      field.id === selectedField.id ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
    setSelectedField({ ...selectedField, [key]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/form/create", { title, fields })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-builder-container">
      <h2 className="form-title">Create New Form</h2>

      <div className="form-builder">
        {/* Left Panel: Form Preview */}
        <div className="left-panel">
          <h3>
            {title}{" "}
            <span className="edit-icon" onClick={() => setTitle(prompt("Enter form title") || title)}>
              ✏️
            </span>
          </h3>

          {/* Add Input Button */}
          <button onClick={() => setShowInputOptions(!showInputOptions)}>Add Input</button>

          {/* Input type options (show when Add Input is clicked) */}
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
            {fields.map((field) => (
              <div
                key={field.id}
                className={`field-item ${selectedField?.id === field.id ? "selected" : ""}`}
                onClick={() => handleFieldClick(field)}
              >
                <span className="field-label">{field.label}</span>
                <input type={field.type} placeholder={field.placeholder} disabled />
              </div>
            ))}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>

        {/* Right Panel: Form Editor */}
        <div className="right-panel">
          <h3>Form Editor</h3>

          {selectedField ? (
            <>
              <label>Title</label>
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
            <p>Select an input to edit</p>
          )}
        </div>
      </div>

      <button className="create-form-btn" onClick={handleSubmit}>
        CREATE FORM
      </button>
    </div>
  );
}

export default FormBuilder;
