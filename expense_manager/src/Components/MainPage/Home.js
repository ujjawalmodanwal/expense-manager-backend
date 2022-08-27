import React, {useState, Fragment, useEffect} from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ExpenseCard from './ExpenseCard';
import './Home.css';
import EditableCard from './EditableCard';
import axios from 'axios';

function Home() {

	const [cardsData, updateCardsData] = useState([]);
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const fetchCardsData = async()=>{
		const {data} = await axios.get("/api/cards/", {
            headers:{
				"Authorization": `Bearer ${userInfo.token}`
            }})
		const CardsData = data;
		updateCardsData(CardsData);
	}
	useEffect(()=>{
		fetchCardsData();
	}, [])


	const [isAddCard, setIsAddCard] = useState(true);
	const handleClickOnAddCard = () => {
		setIsAddCard(!isAddCard);
	}
	const [addCardData, setAddCardData] = useState({
        title: '',
        total_price: '',
        color: '',
    })
	const handleAddCardDataChange = (event)=>{
		event.preventDefault();
		const fieldName = event.target.getAttribute('name')
		const fieldValue = event.target.value;
		const newCardData = {...addCardData};
		newCardData[fieldName]=fieldValue;
		setAddCardData(newCardData);
	}
	const handleAddCardSubmit = async (event) =>{
		event.preventDefault();
	    const newCard = {
			title: addCardData.title,
			total_price: "0",
			color: addCardData.color,
		};
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.post('/api/cards/create/',{
				newCard
			}, config)
		} catch (error) {
			console.log(error)
		}
		const newData = [...cardsData, newCard ];
		updateCardsData(newData);
		setIsAddCard(true);
		fetchCardsData();
	};
	
	


	//Edit cards data section 
	const [editCardData, setEditCardData]= useState({
        title: '',
        total_price: '',
        color: '',
	})
	const [editCardId, setEditCardId] = useState(null);
	const handleEditClick = (event, card)=>{
		event.preventDefault();
		setEditCardId(card._id);
	}
	const handleEditCardChange = (event, cardData)=>{
		event.preventDefault();
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;
		const newCardData={...cardData};
		newCardData[fieldName]= fieldValue;
		setEditCardData(newCardData);
	}
	const handleEditCardSubmit = async (event, cardData)=>{
		event.preventDefault();
		const editedCard = {
			title: editCardData.title,
			total_price: cardData.total_price,
			color: editCardData.color,
		}
		const newCardData = [...cardsData];
		const index = cardsData.findIndex((data)=>data._id===editCardId);
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.put(`/api/cards/${editCardId}`,{
				editedCard
			}, config)
		} catch (error) {
			console.log(error)
		}
	    newCardData[index]=editedCard;
		updateCardsData(newCardData);
		setEditCardId(null);
	}
	const handleCancelClick =()=>{
		setEditCardId(null);
	}

	const handleDeleteClick = async (cardDataId)=>{
		const newDatas = [...cardsData];
		const index = cardsData.findIndex((card)=>card._id === cardDataId);
		newDatas.splice(index, 1);
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.delete(`/api/cards/${cardDataId}`, config)
		} catch (error) {
			console.log(error)
		}
		updateCardsData(newDatas);
	}

	
	return (
		<div className='home-wrapper'>
			<Header fetchCardsData = {fetchCardsData}/>
			<Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
			<div className='card-section'>
				{cardsData.map((cardData) => (
					<Fragment>
						{editCardId === cardData._id ? (
							<EditableCard isSubmit={false}
										  handleEditCardChange = {handleEditCardChange} 
							              handleEditCardSubmit = {handleEditCardSubmit} 
										  handleCancelClick = {handleCancelClick}
										  handleEditClick = {handleEditClick}
										  cardData = {cardData}/>
							):( 
							<ExpenseCard cardData={cardData} 
										 isAddCard={false} 
										 handleDeleteClick = {handleDeleteClick}
										 handleEditClick = {handleEditClick}
										 fetchCardsData = {fetchCardsData}/>
										 
							)
						}
					</Fragment>
				))}
				<Fragment>
					{isAddCard ? <ExpenseCard isAddCard = {true} 
											  cardData = {0}
											  handleClickOnAddCard = {handleClickOnAddCard}
											  /> 

					: <EditableCard isSubmit={true}
									handleCancel={handleClickOnAddCard} 
								    handleAddCardDataChange ={handleAddCardDataChange} 
									handleAddCardSubmit={handleAddCardSubmit}
									handleCancelClick={handleClickOnAddCard}/>
					}
				</Fragment>
			</div>
		</div>
	)
}

export default Home
