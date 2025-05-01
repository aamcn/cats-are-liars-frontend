import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
function IndividualCatPage(){

    const [catData, setCatData] = useState(null)
    const [feeders, setFeeders] = useState([])
    const param = useParams()


    const username = localStorage.getItem("username").replaceAll('"', '')
    const userId = localStorage.getItem("userId").replaceAll('"', '')
    const b = localStorage.getItem("storedToken").replaceAll('"', "");
    axios.defaults.headers.common["Authorization"] = `bearer ${b}`;

    const getCatByName = (catName) => {
        axios.get(
            `http://localhost:3000/cats/cat-name/${catName}`,
            { userId},
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => setCatData(res.data))
          .catch((error) => {
            console.error(error);
          });
    }

    useEffect(() => {
        getCatByName(param.catName)
    }, [])

    useEffect(() => {
    }, [catData])

    const getFeederById = (feederId) => {
        axios.get(
            `http://localhost:3000/users/user-by-id/${feederId}`,
            { userId},
            { method: "cors" },
            { withCredentials: true },
          )
          .then((res) => {
            if(!res.data[0].username == 'undefined'){
                return null;
            }
            const data = res.data
            setFeeders(feeders => ([...feeders, data[0].username]))
          })
          .catch((error) => {
            console.error(error);
          });
    }
    
    useEffect(() => {
        if(catData != null){
            catData[0].feeder_userid.forEach(id =>{
                getFeederById(id)
            })
        }
    }, [catData])

    useEffect(() => {
    }, [feeders])

    return(
        <div>
            <p>hi</p>
            {catData && <p>
                {catData[0].name}
                <br></br>
                {catData[0].meals}
                <br></br>
                {catData[0].medication}
                </p>}
                {feeders && feeders.map(feeder => {
                    return <p>{feeder}</p>
                })}
        </div>
    )
}

export default IndividualCatPage;