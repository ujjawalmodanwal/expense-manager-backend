import React from 'react';
import TextField from '@mui/material/TextField';

function EditableRow({Id, editFormData, handleEditFormChange,handleEditFormSubmit, handleCancelClick}) {
    const boxStyle = {maxWidth: '8vh !important', maxHeight:'2vh !important', minWidth: '8vh !important', minHeight: '2vh !important'}
    const initialPrice = editFormData.price;
   
    return (
    <tr>
            <td>
                {0}
            </td>
            <td>
                <TextField
                    style = {boxStyle}
                    variant="outlined"
                    name="goods"
                    label="Enter Description"
                    defaultValue={editFormData.goods}
                    onChange={(event)=>{
                        editFormData.goods = event.target.value; 
                        handleEditFormChange(event, editFormData)}}
                />
            </td>
            <td>
                <TextField
                    style = {boxStyle}
                    variant="outlined"
                    name="price"
                    label="Enter Price"
                    defaultValue={editFormData.price}
                    onChange={(event)=>{
                        editFormData.price = event.target.value; 
                        handleEditFormChange(event, editFormData)}}
                />
            </td>
            <td>
                <TextField
                    style = {boxStyle}
                    variant="outlined"
                    name="date"
                    defaultValue={editFormData.date}
                    onChange={(event)=>{
                        editFormData.date = event.target.value; 
                        handleEditFormChange(event, editFormData)}}
                />
            </td>
        <td>
            <button type="submit" onClick = {(event)=>handleEditFormSubmit(event, initialPrice )}>save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditableRow