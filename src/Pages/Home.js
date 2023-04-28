import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import UserInfo from '../component/UserInfo/UserInfo'
import { Instance } from '../config/config'

const Home = (props) => {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        getStudentData()
    }, [])

    const getStudentData = () => {
        Instance.get("/all-students").then(res => {
            // console.log(res.data)
            setStudentList(res.data?.result);
        }).catch(err => {
            console.error(err)
        })
    }

    const handleDelete = (id) => {
        Instance.delete(`/student/${id}`).then(res => {
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-right"
                })
                getStudentData();
            }

        }).catch(err => {
            toast.error("some thing went wrong", {
                position: "top-right"
            });
        })
    }



    return (
        <div>
            <UserInfo compData={studentList} handleDelete={handleDelete} />
            <ToastContainer />
        </div>
    )
}

export default Home;