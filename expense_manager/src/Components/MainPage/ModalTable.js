import React, {useState, Fragment, useEffect} from 'react';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import './ModalTable.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
function Table(props) {

	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const fetchTable = async ()=>{
		const {data} = await axios.get(`/api/tables/${props.cardData._id}`,
		 {headers:{
			"Authorization": `Bearer ${userInfo.token}`
		}})
		setData(data);
		for(let i=0;i<data.length;i++){
			data[i].id = i+1;
		}
	}

	

	const [datas, setData] = useState([])
	useEffect(()=>{
		fetchTable();
	},[])


	const updateTotalPrice = (isDelete, price) =>{
		let tp = props.cardData.total_price;
		if(isDelete === 0 ){tp += Number(price);}
		if(isDelete === 1 ){tp -= Number(price);}
		props.updateTotalPrice(tp);
		updateTPinDB(tp);
	}

	const updateTPinDB = async (tp)=>{
		const editedCard = {
			title: props.cardData.title,
			total_price: tp,
			color: props.cardData.color,
		}
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.put(`/api/cards/${props.cardData._id}`,{
				editedCard
			}, config)
		} catch (error) {
			console.log(error)
		}
		fetchTable();
		props.fetchCardsData();
	}

	const [addFormData, setAddFormData] = useState({
		 goods:'',
		 price:'',
		 date:''
	})
	const handleAddFormChange = (event)=>{
		event.preventDefault();
		const fieldName = event.target.getAttribute('name')
		const fieldValue = event.target.value;
		const newFormData = {...addFormData};
		newFormData[fieldName]=fieldValue;
		setAddFormData(newFormData);
	}
	const handleAddFormSubmit = async (event) =>{
		event.preventDefault();
	    const newRow = {
			goods: addFormData.goods,
			price: addFormData.price,
			date: addFormData.date,
		};
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.post(`/api/tables/create/${props.cardData._id}`,{
				newRow
			}, config)
		} catch (error) {
			console.log(error)
		}
		const newData = [...datas, newRow ];
		for(let i=0;i<newData.length;i++){
			newData[i].id = i+1;
		}
		setData(newData);
		fetchTable();
		props.fetchCardsData();
		updateTotalPrice(0, addFormData.price)

	};


	const editFormData= {
		goods:'',
		price:'',
		date:''
	}
	const [editRowId, setEditRowId] = useState(null);
	const handleEditClick = (event, row)=>{
		event.preventDefault();
		setEditRowId(row._id);
	}

	const handleEditFormChange = (event, prevData, initialPrice)=>{
		event.preventDefault();
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;
		editFormData.goods = prevData.goods;
		editFormData.price = prevData.price;
		editFormData.date = prevData.date;
		editFormData[fieldName] = fieldValue;
	}


	const handleEditFormSubmit = async (event, initialPrice)=>{
		event.preventDefault();
		console.log("new",editFormData.price, "old",initialPrice, "difference", editFormData.price-Number(initialPrice));

		
		const editedRow = {
			goods: editFormData.goods,
			price: editFormData.price,
			date: editFormData.date 
		}
		const newRow = [...datas];
		const index = datas.findIndex((data)=>data._id===editRowId);
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.put(`/api/tables/${editRowId}`,{
				editedRow
			}, config)
		} catch (error) {
			console.log(error)
		}
		newRow[index]=editedRow;
		setData(newRow);
		updateTotalPrice(0, editFormData.price-Number(initialPrice));
		fetchTable();
		props.fetchCardsData();
		setEditRowId(null);
	}
	const handleCancelClick =()=>{
		setEditRowId(null);
	}



	const handleDeleteClick = async (rowDataId)=>{
		const newDatas = [...datas];
		const index = datas.findIndex((data)=>data._id===rowDataId);
		updateTotalPrice(1, datas[index].price);
		newDatas.splice(index, 1);
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.delete(`/api/tables/${rowDataId}`, config)
		} catch (error) {
			console.log(error)
		}
		setData(newDatas);
		const array_length = newDatas.length;
		for(let i=0;i<array_length;i++){
			newDatas[i].id = i+1;
		}
		setData(newDatas);
		props.fetchCardsData();
		fetchTable();
	}
 

	const windowWidth = window.innerWidth;
	const getTextFieldStyle  = () =>{
		if(windowWidth>880){
			return ({height:'1vh', width:'20vh', margin:'1vh 1vh 0 0' })
		}
		else return ({minHeight:'23px', minWidth:'218px',maxHeight:'23px', maxWidth:'218px', margin:'20px 0 0 0' })
	} 

	const getButtonStyle = () =>{
		if(windowWidth>880){
			return ({margin:'1vh', height:'5vh', width:'6vw' })
		}
		else{
			return ({ maxHeight:'23px', minHeight:'23px', minWidth:'77px', maxWidth:'77px', marginTop: '15.488px' })
		}
	}

	return (
		<div>
			<div className='modal-table-body'>
				<form onSubmit={handleEditFormSubmit}>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Description</th>
								<th>Price</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{datas.map((data)=>(
								<Fragment>
									{editRowId === data._id ?(
										<EditableRow Id={data._id} editFormData={data} handleEditFormChange={handleEditFormChange} handleEditFormSubmit = {handleEditFormSubmit} handleCancelClick={handleCancelClick}/>
									):(
										<ReadOnlyRow data={data} handleEditClick={handleEditClick} handleDeleteClick = {handleDeleteClick}/>
									)}
								</Fragment>
							))}
						</tbody>
					</table>
				</form>
			</div>
			<div className='table-new-row'>
				<h4 className='add-new-data'>Add New Data</h4>
				<TextField id="outlined-basic" 
							name ="goods" 
							type='text'
							label="Enter Description" 
							size="small" 
							variant="outlined" 
							onChange={(event)=>handleAddFormChange(event)}
							style={getTextFieldStyle()}/> 
				<TextField id="outlined-basic" type='number' name = "price" label="Enter Price" size="small" variant="outlined" onChange={(event)=>handleAddFormChange(event)} style={getTextFieldStyle()}/> 
				<TextField id="outlined-basic" type='date' name = "date" size="small" variant="outlined" onChange={(event)=>handleAddFormChange(event)} style={getTextFieldStyle()}/>
				<Button variant="contained" style={getButtonStyle()}onClick= {(event)=>{handleAddFormSubmit(event)}}>Submit</Button>
			</div>
		</div>
	)
}

export default Table