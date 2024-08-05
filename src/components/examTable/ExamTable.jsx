import { useState, useEffect, useContext } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { getAll, getById } from "../../service/functionsHTTP";
import dayjs from "dayjs";
import { UserContext } from "../../context/UserContext";

function ExamTable() {
  const [students, setStudents] = useState([]);
  const { user } = useContext(UserContext);
  async function getStudents() {
    try {
      const url = `http://localhost:3000/api/assistance-exam`;
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

  async function downloadCertificate(student, examId){
    try {
      const result = await getById(
        `${student.id}/${examId}`,
        "http://localhost:3000/api/certificates/assistance-exam",
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
        const fileName = `${student.lastName.toUpperCase()}-${student.firstName.toUpperCase()}-DNI-${student.identificationNumber}-CONSTANCIA-ASISTENCIA-EXAMEN.pdf`;
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
      header: "Asistencia",
      accessorKey: "present",
    },
    {
      header: "Fecha examen",
      accessorKey: "exam.date",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
    {
      header: "Materia",
      accessorKey: "exam.subject.name",
    },
    {
      header: "Nombre",
      accessorKey: "student.firstName",
    },
    {
      header: "Apellido",
      accessorKey: "student.lastName",
    },
    {
      header: "DNI",
      accessorKey: "student.identificationNumber",
    },
    {
      header: "Constancia de asistencia",
      cell: ({ row }) => {
        const student = row.original.student;
        const examId = row.original.exam.id;
        return (
          <div>
            <button
              className="btn-table"
              onClick={() =>
                downloadCertificate(student, examId)
              }
            >
              Descargar certificado
            </button>
          </div>
        );
      },
    },
  ];

  return <TableComponent data={students} columns={columns}></TableComponent>;
}
export default ExamTable;
