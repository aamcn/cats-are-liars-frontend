
function CatTabTemplate( { cat } ){

    return(


        <div>
            <div>
                <img src={null} alt="Cat Photo"></img>
                <p>{cat.name}</p>
            </div>
        </div>    
        )
}

export default CatTabTemplate;