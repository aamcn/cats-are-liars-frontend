import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
function IndividualCatPage(){

    const [catData, setCatData] = useState(null)

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
        console.log(catData)
    }, [catData])

    return(
        <div>
            <p>hi</p>
            {catData && <p>
                {catData[0].name}
                <br></br>
                {catData[0].meals}
                <br></br>
                {catData[0].medication}
                <br></br>
                {catData[0].feeder_userid}
                
                </p>}
        </div>
    )
}

export default IndividualCatPage;