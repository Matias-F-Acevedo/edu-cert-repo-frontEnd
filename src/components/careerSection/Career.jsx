import React from "react";
import "./career.css";
import { useState, useContext,useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getAll} from "../../service/functionsHTTP";

function Career() {

    const [careers, setCareers] = useState([]);
    const { user } = useContext(UserContext);
  
    async function getCareers() {
      try {
        const url = `http://localhost:3000/api/career`;
        const res = await getAll(url, user.jwt);
  
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const parsed = await res.json();
        setCareers(parsed);
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      if (user) {
        getCareers();
      }
    }, []);

  return (
    <div className="career-section">
      <ul>
      {careers.map((career, index) => (
        <li key={index}>{career.name}</li>
      ))}
    </ul>
    </div>
    
  );
}

export default Career;
