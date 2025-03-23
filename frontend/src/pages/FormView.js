import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FormView.css";

function FormView() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/form/${id}`)
      .then((response) => setForm(response.data))
      .catch((error) => console.error("Error fetching form:", error));
  }, [id]);

  if (!form) return <p>Loading form...</p>;

  return (
    <div className="form-view-container">
      <h1>{form.title}</h1>
      <form>
        {form.fields.map((field, index) => (
          <div key={index} className="form-field">
            <label>{field.title}</label>
            <input type={field.type} placeholder={field.placeholder} />
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default FormView;
