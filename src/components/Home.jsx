import React, { useEffect, useState } from 'react';
import Table from './Table';
import "../styles/home.scss";
import img1 from "../assests/delete-button-svgrepo-com (1).svg"
import { 
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight  } from "react-icons/md";

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      // Fetch data from the API endpoint
      fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setFilteredData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    // Handle search/filtering
    useEffect(() => {
      const filteredResults = data.filter((row) => {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filteredResults);
      setCurrentPage(1);
    }, [searchTerm, data]);
  
    // Handle pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    // Handle row selection
    const toggleRowSelection = (id) => {
      const isSelected = selectedRows.includes(id);
      if (isSelected) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    };
  
    // Handle bulk delete
    const deleteSelectedRows = () => {
      const updatedData = data.filter((row) => !selectedRows.includes(row.id));
      setData(updatedData);
      setFilteredData(updatedData);
      setSelectedRows([]);
    };

    const deleteHandler = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
        setSelectedRows(selectedRows.filter((rowId) => rowId.id !== id));
    }
  
    return (
      <div className='home'>
         <div className="head">

         <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

            <button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
              <img src={img1} alt="" />
            </button>
      </div>

        <Table
          data={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
          toggleRowSelection={toggleRowSelection}
          selectedRows={selectedRows}
          onDelete = {deleteHandler}
        />
       

        <div className="foot">
            <div className="foot-left">
            { selectedRows.length } out of {data.length} rows selected
            </div>

            <div className="foot-right">
            <span>Page {currentPage} of {totalPages} </span>
            
            
            <button onClick={() => handlePageChange(1)}> <MdOutlineKeyboardDoubleArrowLeft/> </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} > <MdOutlineKeyboardArrowLeft/> </button>
           
           {Array.from({ length: totalPages }, (_, index) => (
             <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
               {index + 1}
             </button>
           ))}

           <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} > <MdOutlineKeyboardArrowRight/> </button>
           <button onClick={() => handlePageChange(totalPages)} > <MdOutlineKeyboardDoubleArrowRight/> </button>
             
            </div>
        </div>
        
      </div>
    );
}

export default Home