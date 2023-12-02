import React from 'react';
import "../styles/table.scss";
import { MdEdit, MdDelete } from 'react-icons/md';







const Table = ({ data, toggleRowSelection, selectedRows, onDelete }) => {
    return (
        <table>
          <thead>
            <tr>
              <th>Select All</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected-row' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </td>

                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>
                  
                  <MdEdit className='edit'/>
                  <MdDelete className="delete" onClick={() => onDelete(row.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default Table