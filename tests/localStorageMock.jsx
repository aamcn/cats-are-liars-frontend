

    let localStorage = {

     getItem(name){
            return localStorage[name]
     },
     setItem(name, value){
            localStorage[name] = value.toString() 
     }  
     }

export default localStorage;