import "./studentTable.css";
import { useState, useEffect, useContext } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { getAll, getById } from "../../service/functionsHTTP";
import { UserContext } from "../../context/UserContext";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const { user } = useContext(UserContext);

  async function getStudents() {
    try {
      const url = `http://localhost:3000/api/students`;
      const res = await getAll(url, user.jwt);

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      const parsed = await res.json();
      setStudents(parsed);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      getStudents();
    }
  }, []);

  async function downloadCertificate(student, careerId){
    try {
      const result = await getById(
        `${student.id}/${careerId}`,
        "http://localhost:3000/api/certificates/regular-student",
        user.jwt
      );
  
      if (result.url) {
        const response = await fetch(result.url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.jwt}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Error downloading the certificate');
        }
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = url;
        const fileName = `${student.lastName.toUpperCase()}-${student.firstName.toUpperCase()}-DNI-${student.identificationNumber}-CONSTANCIA-ALUMNO-REGULAR.pdf`;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        window.URL.revokeObjectURL(url);
        
      } else {
        console.error("No URL found in the response");
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }
  }

  const columns = [
    {
      header: "#",
      accessorKey: "id",
    },
    {
      header: "Nombre",
      accessorKey: "firstName",
    },
    {
      header: "Apellido",
      accessorKey: "lastName",
    },
    {
      header: "DNI",
      accessorKey: "identificationNumber",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Teléfono",
      accessorKey: "phoneNumber",
    },
    {
      header: "Carreras",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="container-career-button">
            {student.careers && student.careers.length > 0 ? (
              student.careers.map((career, index) => (
                <div key={index} className="career-button">
                  <span>{career.name}</span>
                  <button
                    className="btn-table"
                    onClick={() => downloadCertificate(student, career.id)}
          >
                    Descargar certificado
                  </button>
                </div>
              ))
            ) : (
              <div>No carreras asociadas</div>
            )}
          </div>
        );
      },
    },
  ];

  return <TableComponent data={students} columns={columns}></TableComponent>;
}
export default StudentTable;
