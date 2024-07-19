import { useState, useEffect } from "react";
import TableComponent from '../tableComponent/TableComponent';
import { getAll, getById } from "../../service/functionsHTTP";

function StudentTable() {
  const [students, setStudents] = useState([]);


  async function getStudents() {
    try {
      const url = `http://localhost:3000/api/students`;
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

  async function downloadCertificate(studentId){
    const result = await getById(studentId,"http://localhost:3000/api/certificates/regular-student")
    if (result.url) {
      window.open(result.url, '_blank');
    } else {
      console.error('No URL found in the response');
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
      header: "Carrera",
      accessorKey: "career.name",
    },
    {
      header: "Certificado de alumno regular",
      cell: ({ row }) => {
          const  studentId = row.original.id;
          
          return <div>
              <button className="btn-table" onClick={()=> downloadCertificate(studentId)}>Descargar certificado</button>
          </div>;
      }
  }
  ];

  return <TableComponent data={students} columns={columns}></TableComponent>;
}
export default StudentTable;