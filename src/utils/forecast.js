const request =require('postman-request');
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat,long,callback)=>{
    const data ={
        lat: lat,
        long: long
    }
    const url = `http://api.weatherstack.com/current?access_key=f1463fa7a7ac5bc5e62ffbdc12925381&query=${lat},${long}`
    //console.log(url);
    request ({url,json:true},(error,{body} ={})=>{
            
    
        if (error)
                callback('Unable to Connect !',undefined)
        else if(body.error)
        {
        callback(body.error.info,undefined);
        
        } 
        else{
        callback(undefined,
        //     {
        //     lat:body.location.lat,
        //     long:body.location.lon,
        //     location:body.location.name,
        //     desc:body.current.weather_descriptions[0],
        //     Temp:body.current.temperature
        // }
        'Current Weather for '+ body.location.name +' is ' + body.current.weather_descriptions[0] +' with temperature ' + body.current.temperature + ' degree celcius.'
        );
        }
        })
}



  module.exports = forecast;