import React from 'react';
import closeIcon from '../../Resources/Images/close_icon.png';
import "./ExpenseCard.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditableCard(props) {
	const getEditableCard = () =>{
		return(
			<div className='expenseCard-addCard' 
				style={{backgroundColor:'#cccccc'}}>
				<div className='expenseCard-textfield'>
					<form onChange = {(event) => props.handleEditCardChange(event, props.cardData)}>
					<TextField
						name="title"
						variant="outlined" 
						label = "Field"
						size="small"
						style={{margin:'1vh'}}
						onChange={(event)=> {props.cardData.title = event.target.value}}
						defaultValue = {props.cardData.title}
					/>
					<TextField
						name="color"
						variant="outlined" 
						label = "Color"
						size="small"
						style={{margin:'1vh'}}
						onChange={(event)=> {props.cardData.color = event.target.value}}
						defaultValue = {props.cardData.color}
					/>
					</form>
					<Button className='expenseCard-saveButton' variant="contained" onClick= {(event)=>props.handleEditCardSubmit(event, props.cardData)}>Save</Button>
				</div>
				<img alt="cancel" className='expenseCard-cancelIcon' src={closeIcon} onClick= {props.handleCancelClick}/>
			</div>
		)
	}

    const getSubmitCard = () =>{
        return(
			<div className='expenseCard-addCard' 
				style={{backgroundColor:'#cccccc'}}>
				<div className='expenseCard-textfield'>
					<TextField
						name="title"
						variant="outlined" 
						label = "Field"
						size="small"
						style={{margin:'1vh'}}
						onChange={props.handleAddCardDataChange}
					/>
					<TextField
						name="color"
						variant="outlined" 
						label = "Color"
						size="small"
						style={{margin:'1vh'}}
						onChange={props.handleAddCardDataChange}
					/>
					<Button className='expenseCard-saveButton' variant="contained" onClick= {(event)=>props.handleAddCardSubmit(event, props.cardData)}>Save</Button>
				</div>
				<img alt="cancel" className='expenseCard-cancelIcon' src={closeIcon} onClick= {props.handleCancelClick}/>
			</div>
		)
    }


    return (
        <div>
            {props.isSubmit ? getSubmitCard() : getEditableCard()}
        </div>
    )
}

export default EditableCard
