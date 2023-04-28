import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import StudentForm from "./component/AllStudent/studentForm";
import Header from "./component/Header/Header";
import Login from "./component/LoginForm/Login";
import Protected from "./component/Protected/Protected";
import Registration from "./component/Registration/Registration";
import UserInfo from "./component/UserInfo/UserInfo";
import Home from "./Pages/Home";



function App() {
  return (
    <div className="App">


       <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/userinfo" element={<Protected Comp={UserInfo}/>} />
          <Route path="/student-form" element={<StudentForm/>} />
          <Route path="/edit-student-form/:id/:mode" element={<StudentForm/>}/>
       </Routes>
       </Router>
      
    </div>
  );
}

export default App;
