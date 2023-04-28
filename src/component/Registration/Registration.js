
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Instance } from '../../config/config';
import './Registration.css'

const Registration = () => {
    const navigate = useNavigate();


    const [value, setValue] = useState({});

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {

        // console.log("i am onchange", value, e.target.name)
        const newObj = { ...value, [e.target.name]: e.target.value }
        setValue(newObj);
        console.warn(newObj);
    }

  
    const validation = (values) => {
        const errors = {}
        const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const no_pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!values?.name) {
            errors.name = "Name is Required";
        }
        if (!values?.city) {
            errors.city = 'mandatory field';
        }
        if (!values?.state) {
            errors.state = 'mandatory field';
        }
        if (!values?.email) {
            errors.email = 'not be blank email field'
        }
        else if (!email_pattern.test(values.email)) {
            errors.email = "Email is invalid ";
        }
        if (!values?.mobile) {
            errors.mobile = 'mobile no. is required';
        }
        if (!values?.password) {
            errors.password = 'password is required';
        }
        else if (!no_pattern.test(values.mobile)) {
            errors.mobile = 'pattern are not match';
        }
        if (!values?.pinCode) {
            errors.pinCode = 'phone no. is required';
        }

        if (Object.keys(errors).length !== 0) {
            console.log(Object.keys(errors))
        }

        return errors;

    }


    const submit = () => {
        setErrors(validation(value));
        const { name, email, mobile, password, pinCode, gender, state, city } = value;
        if (!name || !email || !mobile || !password || !pinCode || !gender || !state || !city) {
            return false;
        }

       

        Instance.post("/register", value).then(res => {
            if (res.data.success) {
                console.log(res.data);
                window.localStorage.setItem("isLogedIn", true)
                window.localStorage.setItem("token", res.data?.token)
                return navigate("/")
            }
        }).catch(err => {
            window.localStorage.setItem("isLogedIn", false)
        })
    };

    // const board = [
    //     { Board: 'BSEB', id: 1 },
    //     { Board: 'CBSE', id: 2 },
    //     { Board: 'ICSE', id: 3 },
    //     { Board: 'UP BOARD', id: 4 }
    // ]
    // const [option] = useState(board);
    // console.log(value);


    
    // const uploadImage = async (event) => {
    //     console.log(event.target.files)
    //     const file = event.target.files[0]        
    //     const base64 = await toBase64(file);
    //     console.log(base64);
    //     setBaseImage(base64);
    //  };

    // const toBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });

    return (

        <div className='form'>
            <div className='bgr'>
                <h2>Student Registration Form</h2>
                <div className='wrapper'>
                    <div className='form_field'>
                        <div className='form_control'>
                            <label for=''>Name</label>
                            <input type='text' className={errors.name ? "error" : "success"}
                                name='name' onChange={handleInput} value={value.name} placeholder='Enter Your Name' />
                            {errors.name && <span>{errors.name}</span>}
                        </div>
                        <div className='form_control'>
                            <label for=''>Email id</label>
                            <input type="text" name='email' className={errors.email ? "error" : "success"} onChange={handleInput} value={value.email} placeholder='Enter Your Email' />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className='form_control'>
                            <label for=''>Phone no.</label>
                            <input type='text' name='mobile' className={errors.mobile ? "error" : "success"} onChange={handleInput} value={value.mobile} placeholder='Enter Your Phone' />
                            {errors.mobile && <span>{errors.mobile}</span>}
                        </div>
                        <div className='form_control'>
                            <label for=''>Password</label>
                            <input type='password' name='password' className={errors.password ? "error" : "success"} onChange={handleInput} value={value.password} placeholder='Enter Your Password' />
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                        {/* <div className='form_control'>
                            <label for=''>Last Name</label>
                            <input type='text' name='lastName' className={errors.lastName ? "error" : "success"} onChange={handleInput} value={value.lastName} placeholder='Enter Your Last Name' />
                            {errors.lastName && <span>{errors.lastName}</span>}
                        </div> */}
                        <div className='form_control'>
                            <label for=''>City</label>
                            <input type='text' name='city' className={errors.city ? "error" : "success"} placeholder='Enter Your City' onChange={handleInput} value={value.city} />
                            {errors.city && <span>{errors.city}</span>}
                        </div>
                        <div className='form_control'>
                            <label for=''>State</label>
                            <input type='text' name='state' className={errors.state ? "error" : "success"} placeholder='Enter Your state' onChange={handleInput} value={value.state} />
                            {errors.state && <span>{errors.state}</span>}
                        </div>


                        <div className='form_control'>
                            <label for=''>Pin Code</label>
                            <input type='text' name='pinCode' className={errors.pinCode ? "error" : "success"} onChange={handleInput} value={value.pinCode} placeholder='Enter Your Pin Code' />
                            {errors.pinCode && <span>{errors.pinCode}</span>}
                        </div>


                        {/* <div className='form_control'>
                            <label for=''>Standard</label>
                            <input type='text' name='standard' className={errors.standard ? "error" : "success"} onChange={handleInput} value={value.standard} placeholder='Enter Your standard' />
                            {errors.standard && <span>{errors.standard}</span>}
                        </div> */}
                        {/* <div className='form_control'>
                            <label for=''>Date Of Birth</label>
                            <input type='date' name='dob' className={errors.dob ? "error" : "success"} onChange={handleInput} value={value.dob} placeholder='Enter Your DOB' />
                            {errors.dob && <span>{errors.dob}</span>}
                        </div> */}
                        {/* <div className='form_control'>
                            <label for=''>Board</label>
                            <Multiselect className={errors.board ? "error" : "success"}
                                onSelect={(selectedList, selectedItem) => {
                                    on_select_change("board", selectedList)
                                    console.log("on select", selectedList, selectedItem)
                                }}
                                value={value.board} options={option} displayValue='Board' />
                            {errors.board && <span>{errors.board}</span>}
                        </div> */}
                        {/* <div className='form_control'>
                            <label for=''>Upload Image</label>
                            <input type='file' name='file' onChange={(event) => { uploadImage(event); }} value={value.file} />
                            {errors.file && <span>{errors.file}</span>}
                            <img src={baseImage} alt='ddddd' />
                        </div> */}
                        <div className='form_control'>
                            <label for=''>Gender</label>
                            <div className='gender'>

                                <label>
                                    <input type='radio' name='gender' onChange={handleInput} value="male" />
                                    <label>Male</label>

                                    <input type='radio' name='gender' onChange={handleInput} value="female" />
                                    <label>Female </label>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='button_group'>
                        <div>
                            <button className='btn_submit' onClick={submit}>Register</button>
                            <p>are you already  <Link to='/login'>register</Link> </p>
                            <p>userInfo <Link to='/userinfo'>Information</Link></p>
                            {/* <button className='btn_submit' onClick={reset}>reset</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Registration;