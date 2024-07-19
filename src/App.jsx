import { Route, Routes, BrowserRouter } from "react-router-dom";
import StudentTable from "./components/studentTable/StudentTable";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/inicio" element={<h2>inicio</h2>}/>
        <Route path="/carreras" element={<h2>carreras</h2>} />
        <Route path="/certificado-alumno-regular" element={<StudentTable />} />
        <Route path="/certificado-examen" element={<StudentTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
