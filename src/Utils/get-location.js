const request= require('request');

const getLocationKey=(location, callback)=>{

  //  const urlLoc = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=IhbplCJQbg76Xtwh5cAVVpkWZvkTNE8y&q='+location;


  const url =  'https://us1.locationiq.com/v1/search.php?key=0d6dcc046059a2&q='+location+'&format=json';
    request({url, json:true}, (error, {body}={})=>{
    
    if(error){
        callback("Unable to Connect with Location service",undefined);
    }
    
    else if(body.error){
        callback(body.error);
    
    
    }
    else if(body.length === 0){
        callback("Invalid location",undefined)
    
    }
    
    else{
    
        const obj = {

            latitude: body[0].lat,
            longitude:body[0].lon,
            place: body[0].display_name
        }
        callback(undefined ,obj);
    
    }
    
    });


}



module.exports=getLocationKey