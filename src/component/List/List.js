import React, { useEffect, useState } from 'react'
import './List.css'

const List = () => {
const [checkedItem, setChackedItem]= useState([]);

    let newDataset = [
        { name: "test", id: 1 ,value: 'I have a car'},
        { name: "test2", id: 2 ,value: 'I have a boat'},
        { name: "test3", id: 3,value: 'I have a laptop' },
        { name: "test4", id: 4,value: 'I have a phone' },
        { name: "test5", id: 5,value: 'I have a newspaper' }
    ]

    const handleChange =(e) => {
        const {name, value, checked} = e.target;


        if(value === "all" && checked){
            setChackedItem(newDataset)
        } else {
            setChackedItem([])
        };
    }

    useEffect(() => {
        console.log(checkedItem);
    },[checkedItem])


    return (
        <div className='check'>
            <h1>Show Checkboxes</h1>
            <input type="checkbox" id="all" name="All" value="all" onChange={handleChange} />
            <label for="vehicle1">Select ALl</label><br></br>
            {newDataset?.map((item, index) => (
                <>
                <input  type="checkbox"  key={item.id} id={item.id} name={item.name} value={item.value} onChange={handleChange} />
                <label for="vehicle2">{item.value}</label><br/>
                </>
                
                ))}
                
                
        </div>
    )
}
export default List;