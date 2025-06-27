

    let localStorageMock = {

     getItem(name){
            return localStorageMock[name]
     },
     setItem(name, value){
            localStorageMock[name] = value.toString() 
     }  
     }

export default localStorageMock;