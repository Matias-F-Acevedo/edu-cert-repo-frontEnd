import { Route, Routes, BrowserRouter } from "react-router-dom";
import StudentTable from "./components/studentTable/StudentTable";
import Navbar from "./components/navbar/Navbar";
import ExamTable from "./components/examTable/ExamTable";
import Login from "./components/login/Login";
import { UserProvider } from "./context/UserContext";
import {
  ProtectedRouterIfNotUser,
  ProtectedRouterIfUser,
} from "./components/utils/ProtectedRoute";
import Career from "./components/careerSection/Career";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={<ProtectedRouterIfUser redirectPath="/" />}>
            <Route path="/login" element={<Login></Login>} />
          </Route>
          <Route element={<ProtectedRouterIfNotUser redirectPath="/login" />}>
            <Route path="/" element={<h2>inicio</h2>} />
            <Route path="/carreras" element={<Career></Career>} />
            <Route
              path="/certificado-alumno-regular"
              element={<StudentTable />}
            />
            <Route path="/certificados-examen" element={<ExamTable />} />
            <Route path="*" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
