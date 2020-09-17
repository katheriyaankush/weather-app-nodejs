
const msg1 = document.querySelector('#message1');
const msg2 = document.querySelector('#message2');


const locationValue = document.querySelector('form');
const inputVal = document.querySelector('input');

locationValue.addEventListener('submit',(e)=>{

    e.preventDefault();

    const url = '/weather?location='+inputVal.value;
    
    fetch(url).then((response) =>{

        response.json().then((data)=>{ 
              if(data.error){
                console.log(data.error)
                msg1.textContent = data.error;
            }
            else{
       
            msg1.textContent = data.weather;
            msg2.textContent = data.place;
                console.log(data) 
            }
        
        }).catch(()=>{
            
            msg1.textContent ="Unable to handle" ;
            console.log("Unable to handle")})
        });
    
})

