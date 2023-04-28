
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Instance } from '../../config/config';
import List from '../List/List';



const Login = () => {
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  const navigate = useNavigate();


  // const notify = () => toast.success("Login Error!");
  const handleChange = (e) => {
    const newObj = { ...data, [e.target.name]: e.target.value }
    setData(newObj);
  }
  const validation = (val) => {
    const errors = {};
    const no_pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!val?.mobile) {
      errors.mobile = 'Required Field';
    }
    else if (!no_pattern.test(val.mobile)) {
      errors.mobile = 'pattern are not match';
    }
    if (!val?.password) {
      errors.password = 'Required Field';
    }
    return errors;
  }
  const submit = () => {
    setError(validation(data));
    const { mobile, password } = data;
    if (!mobile || !password) {
      toast.error("Please enter valid mobile no and password.", {
        position: "top-right"
      });
      return false;
    }
    console.warn(data);



    Instance.post("/login", data,).then((res) => {
      if (res.data.success) {
        toast.success("Login successfully!", {
          position: "top-right"
        });

        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

    }).catch((err) => {
      toast.error("Something went wrong!", {
        position: "top-right"
      });
      console.error(err)
    });

    // const api = axios.create({
    //   baseURL: 'https://todo-plcq.onrender.com/api/v1',
    //   withCredentials: true,
    // });

    //   const token = window.localStorage.getItem('token');
    // api.post('/login', data)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error));


    //  console.log(token);
  }

  // const arr = [2,3, 7, 8, 9,3, 2, 8];
  // const newData = [{
  //   id: 4, name: "BK"
  // }, {
  //   id: 4, name: "BK"
  // }, {
  //   id: 4, name: "BKS"
  // }, {
  //   id: 4, name: "BK"
  // }];



  // let newDatas = newData.filter((abc, index, oldData)=>{
  //   return oldData.findIndex((xyz) => xyz.name===abc.name)===index
  // })
  // console.log(newDatas);

  // let newDatas = newData.filter((item, index, oldData)=>{
  // return oldData.findIndex((ele) => ele.name===item.name)===index

  // })
  // console.log(newDatas)




  return (
    <>
      <div className='login'>
        <div className='login_box'>
          <h2> Student Login </h2>
          <div className='form_fields'>
            <input type='text' onChange={handleChange} name='mobile' className={error.mobile ? "error" : "success"} value={data.mobile} placeholder='Enter Your Phone' />
            {error.mobile && <span>{error.mobile}</span>}
            <br />
            <input type='password' onChange={handleChange} name='password' className={error.password ? "error" : "success"} value={data.password} placeholder='Enter Your password' />
            {error.password && <span>{error.password}</span>}
            <button onClick={submit}>Login</button>
            <p>If yoy are new <Link to='/registration'>Registered</Link></p>
          </div>
        </div>
        <ToastContainer />
      </div>
      <List />
    </>
  )
}

export default Login;