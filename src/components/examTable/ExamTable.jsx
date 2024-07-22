import { useState, useEffect } from "react";
import TableComponent from "../tableComponent/TableComponent";
import { getAll, getById } from "../../service/functionsHTTP";
import dayjs from 'dayjs';
function ExamTable() {
  const [students, setStudents] = useState([]);

  async function getStudents() {
    try {
      const url = `http://localhost:3000/api/assistance-exam`;
      const res = await getAll(url);

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
    getStudents();
  }, []);

  async function downloadCertificate(studentId,subjectId) {
    const result = await getById(
      `${studentId}/${subjectId}`,
      "http://localhost:3000/api/certificates/assistance-exam"
    );
    if (result.url) {
      window.open(result.url, "_blank");
    } else {
      console.error("No URL found in the response");
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
        cell: info => dayjs(info.getValue()).format("DD/MM/YYYY")
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
        const studentId = row.original.id;
        return (
          <div>
            <button
              className="btn-table"
              onClick={() => downloadCertificate(studentId, row.original.exam.subject.id)}
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
