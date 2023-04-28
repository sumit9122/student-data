
import moment from 'moment';
import Multiselect from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { Instance } from '../../config/config';
import './AllStudent.css'

const StudentForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    console.log(params)

    // input handlechange function start
    const [studentData, setStudentData] = useState({});

    const [errors, setErrors] = useState({});

    // multi dropdown section start
    const data = [
        { Board: 'BSEB', id: 1 },
        { Board: 'CBSE', id: 2 },
        { Board: 'ICSE', id: 3 },
        { Board: 'NOIS', id: 4 },
    ]
    const [options] = useState(data);

    // multi dropdown section  end

    const handleChange = (e) => {
        const newVal = { ...studentData, [e.target.name]: e.target.value }
        setStudentData(newVal);
    }

    // input handlechange function   end

    // const delStudentData = () => {
    //     Instance.delete(`student/${params.id}`).then(res => {
    //         toast.success("User has been deleted successfully!", {
    //             position: "top-right"
    //         });
    //         setStudentData(data.res.result);
    //     })
    // }

    const getStudentData = () => {
        Instance.get(`/student/${params.id}`).then(res => {

            toast.success("Get User id successfully!", {
                position: "top-right"
            });
            // console.log(res.data.result);
            setStudentData(res.data.result);
        })
    }

    useEffect(() => { 
        if (params.id) {
            return getStudentData()
        }
    }, [params])

    // submit function start
    const submit = () => {
        setErrors(validation(studentData));
        // console.log(studentData)

        Instance.post("/add-student", studentData).then(res => {
            if (res.data.success) {
                toast.success("Add User successfully!", {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            }
        }).catch(err => {
            toast.error("Something went wrong!", {
                position: "top-right"
            });
        })
    }

    // submit function  end

    // validation function start here
    const validation = (valError) => {
        const errors = {};
        const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const no_pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


        if (!valError?.name) {
            errors.name = "name is required";
        }
        if (!valError?.email) {
            errors.email = "email is required";
        }
        else if (!email_pattern.test(valError.email)) {
            errors.email = "Email is not valid";
        } if (!no_pattern.test(valError.mobile)) {
            errors.mobile = "mobile no. is not valid";
        } else if (!valError?.mobile) {
            errors.mobile = "mobile no. is required";
        } if (!valError?.address) {
            errors.address = "address is required";
        }
        if (!valError?.pinCode) {
            errors.pinCode = "pin code is required";
        } if (!valError?.city) {
            errors.city = "city is required";
        } if (!valError?.state) {
            errors.state = "state is required";
        } if (!valError?.dob) {
            errors.dob = "Date Of Birth must be required";
        } if (!valError.standard) {
            errors.standard = "standard is required";
        }
        if (!valError?.profilePic) {
            errors.profilePic = "profile pic is required";
        }
        if (!valError?.board) {
            errors.board = "required";
        }
        return errors;
    }

    // validation function  end here

    // base64
    const uploadImage = async (event) => {
        console.log(event.target.profilePics);
        const pic = event.target.files[0]
        const base64 = await toBase64(pic);

        let data = { ...studentData, profilePic: "base64" };
        console.log("base64", data);
        setStudentData(data)

    }
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    // convert to base64 images   end
       const mode = params.mode;
       
    return (
        <div className='sudent_data'>
            <h2>Hello student </h2>
            <div className='student'>
                <div className='form_data'>
                    <label>Name</label>
                    <input type='text' disabled={mode === "view"} name='name' className={errors.name ? "error" : "success"} onChange={handleChange} value={studentData.name} placeholder='Enter Your Name' />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div className='form_data'>
                    <label>Email</label>
                    <input type='text' disabled={mode === "view"} name='email' className={errors.email ? "error" : "success"} onChange={handleChange} value={studentData.email} placeholder='Enter Your Email' />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div className='form_data'>
                    <label>Mobile</label>
                    <input type='text' disabled={mode === "view"} name='mobile' className={errors.mobile ? "error" : "success"} onChange={handleChange} value={studentData.mobile} placeholder='Enter Your Mobile' />
                    {errors.mobile && <span>{errors.mobile}</span>}
                </div>
                <div className='form_data'>
                    <label>Address</label>
                    <input type='text' disabled={mode === "view"} name='address' className={errors.address ? "error" : "success"} onChange={handleChange} value={studentData.address} placeholder='Enter Your Address' />
                    {errors.address && <span>{errors.address}</span>}
                </div>
                <div className='form_data'>
                    <label>Pin Code</label>
                    <input type='number' disabled={mode === "view"} name='pinCode' className={errors.pinCode ? "error" : "success"} onChange={handleChange} value={studentData.pinCode} placeholder='Enter Your Pin Code' />
                    {errors.pinCode && <span>{errors.pinCode}</span>}
                </div>
                <div className='form_data'>
                    <label>City</label>
                    <input type='text' disabled={mode === "view"} name='city' className={errors.city ? "error" : "success"} onChange={handleChange} value={studentData.city} placeholder='Enter Your City' />
                    {errors.city && <span>{errors.city}</span>}
                </div>
                <div className='form_data'>
                    <label>State</label>
                    <input type='text' disabled={mode === "view"} name='state' className={errors.state ? "error" : "success"} onChange={handleChange} value={studentData.state} placeholder='Enter Your State' />
                    {errors.state && <span>{errors.state}</span>}
                </div>
                <div className='form_data'>
                    <label>Date Of Birth</label>
                    <input type='date' disabled={mode === "view"} name='dob' className={errors.dob ? "error" : "success"} onChange={handleChange} value={moment(studentData.dob).format("YYYY-MM-DD")} />
                    {errors.dob && <span>{errors.dob}</span>}
                </div>
                <div className='form_data'>
                    <label>Standard</label>
                    <input type='text' disabled={mode === "view"} name='standard' className={errors.standard ? "error" : "success"} onChange={handleChange} value={studentData.standard} placeholder='Enter Your Stanard' />
                    {errors.standard && <span>{errors.standard}</span>}
                </div>
                {/* <div className='form_data'>
                    <label>Profile Pic</label>
                    <input type='file' name='profilePic' className={errors.profilePic ? "error" : "success"} onChange={(event) => { uploadImage(event); }} value={studentData.profilePic} placeholder='Enter Your Stanard' />
                    <img src={studentData.profilePic} alt='browser not support' />
                    {errors.profilePic && <span>{errors.profilePic}</span>}
                </div> */}
                <div className='form_data'>
                    <label for=''>Board</label>
                    <Multiselect disabled={mode === "view"} className={errors.board ? "error" : "success"} name='board'
                        onSelect={(selectedList, selectedItem) => {
                            let values = selectedList.map(x => x.Board)
                            setStudentData({
                                ...studentData,
                                board: values
                            })
                        }}
                        value={studentData.board} options={options} displayValue='Board' />
                    {errors.board && <span>{errors.board}</span>}
                </div>
                <div className='form_control'>
                    <label for=''>Gender</label>
                    <div className='gender'>

                        <label>
                            <input type='radio' disabled={mode === "view"} name='gender' onChange={handleChange} value="male" />
                            <label>Male</label>

                            <input type='radio' disabled={mode === "view"} name='gender' onChange={handleChange} value="female" />
                            <label>Female </label>
                        </label>
                    </div>
                </div>
            </div>
            <div className='btn_group'>
                <button disabled={mode === "view"} onClick={submit}>Submit</button>
                <button>Reset</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default StudentForm;