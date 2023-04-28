import React from 'react'
import { Link } from 'react-router-dom'
import './UserInfo.css'
import moment from 'moment'

const UserInfo = (props) => {

    return (
        <div className='user_info'>
            <div className='userinfo'>
                <div className='information'>
                    <h2>User Information</h2>
                    <Link to='/student-form'>Add User</Link>
                </div>
                <table className="table">
                    <thead>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Pin Code</th>
                        <th>State</th>
                        <th>Standard</th>
                        <th>Date Of Birth</th>
                        <th>Board</th>
                    </thead>
                    <tbody>
                        {props.compData?.map((item) => (
                            <tr key={item._id}>
                                <td data-label="Name">{item.name}</td>
                                <td data-label="Phone No.">{item.mobile}</td>
                                <td data-label="Email">{item.email}</td>
                                <td data-label="Gender">{item.gender}</td>
                                <td data-label="City">{item.city}</td>
                                <td data-label="Pin Code">{item.pinCode}</td>
                                <td data-label="State">{item.state}</td>
                                <td data-label="Standard">{item.standard}</td>
                                <td data-label="Date Of Birth">{moment(item.dob).format("DD-MM-YYYY")}</td>
                                <td data-label="Board" className='ico'>{item.board}<Link to={`/edit-student-form/${item._id}/edit`}><i className="ri-edit-line"></i></Link><span onClick={() => props.handleDelete(item._id)} className='close'><i className="ri-close-line"></i></span></td>
                                <Link className='view' to={`/edit-student-form/${item._id}/view`} ><i class="ri-eye-fill"></i></Link>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserInfo;