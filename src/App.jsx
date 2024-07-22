import { Route, Routes, BrowserRouter } from "react-router-dom";
import StudentTable from "./components/studentTable/StudentTable";
import Navbar from "./components/navbar/Navbar";
import ExamTable from "./components/examTable/ExamTable";
import Login from "./components/login/Login";
import { UserProvider } from "./context/UserContext";
import { ProtectedRouterIfNotUser, ProtectedRouterIfUser } from "./components/utils/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={<ProtectedRouterIfUser redirectPath="/inicio" />}>
            <Route path="/login" element={<Login></Login>} />
          </Route>

          <Route element={<ProtectedRouterIfNotUser redirectPath="/login" />}>
            <Route path="/inicio" element={<h2>inicio</h2>} />
            <Route path="/carreras" element={<h2>carreras</h2>} />
            <Route
              path="/certificado-alumno-regular"
              element={<StudentTable />}
            />
            <Route path="/certificados-examen" element={<ExamTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
