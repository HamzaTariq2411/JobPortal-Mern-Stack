import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Layout/Navbar";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJobs from "./components/Job/PostJobs";
import Application from "./components/Applications/Application";
import NotFound from "./components/NotFound/NotFound";
import Logout from "./components/Auth/Logout";
import Footer from "./components/Layout/Footer";
import ShowHide from "./components/show-hide/show_hide";
import MyApplications from "./components/Applications/MyApplications";

function App() {

  return (
    <>
      <BrowserRouter>
        <ShowHide>
          <Navbar />
        </ShowHide>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/job/getall"
            element={<Jobs />}
          />
          <Route
            path="/job/postjob"
            element={<PostJobs /> }
          />
          <Route
            path="/job/:id"
            element={<JobDetails />}
          />
          <Route
            path="/job/myjobs"
            element={ <MyJobs /> }
          />
          <Route
            path="/application/:id"
            element={ <Application />}
          />
          <Route
            path="/application/myapplications"
            element={<MyApplications />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ShowHide>
          <Footer />
        </ShowHide>
      </BrowserRouter>
    </>
  );
}

export default App;
