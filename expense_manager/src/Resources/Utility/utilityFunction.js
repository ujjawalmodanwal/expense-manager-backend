import axios from 'axios';
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const fetchCardsData = async()=>{
    const {data} = await axios.get("/api/cards/", {
        headers:{
            "Authorization": `Bearer ${userInfo.token}`
        }})
    return data;
}

export{
    fetchCardsData
}

