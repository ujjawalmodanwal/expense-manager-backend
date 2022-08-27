import React from 'react'

function ReadOnlyRow({data, handleEditClick, handleDeleteClick}) {
    return (
    <tr >
        <td>{data.id}</td>
        <td>{data.goods}</td>
        <td>{data.price}</td>
        <td>{data.date}</td>
        <td>
            <button type="button" onClick={(event)=>handleEditClick(event, data)}>Edit</button>
            <button type="button" onClick={()=>handleDeleteClick(data._id)}>Delete</button>
        </td>
    </tr>
  );
};

export default ReadOnlyRow