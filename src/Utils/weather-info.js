const request = require('request')



const getWeatherInfo=({latitude,longitude}, callback)=>{
    
//const url = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/'+key+'?apikey=IhbplCJQbg76Xtwh5cAVVpkWZvkTNE8y';

const url = 'http://api.weatherbit.io/v2.0/current?key=aa5630e14bf240b185df99dd3220a020&lat='+latitude+'&lon='+longitude;
request({url, json:true}, (error, {body}={})=>{

    if(error){
callback("Unable to Connect with weather service",undefined);

    }
else if(body.error) {
    callback(body.jsonerror,undefined);
}
    else{

        callback( undefined,  "The current weather is "+body.data[0].temp+" C and "+ body.data[0].weather.description);
    }
});

}


module.exports=getWeatherInfo;