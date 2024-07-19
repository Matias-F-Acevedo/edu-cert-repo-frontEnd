import { Route, Routes, BrowserRouter } from "react-router-dom"
import StudentTable from "./components/studentTable/StudentTable";


function App() {
  return (
      <BrowserRouter>
        {/* <Navbar></Navbar> */}
        <Routes>
          <Route path="/" element={<StudentTable />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;