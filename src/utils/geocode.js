 const request =require('postman-request');

const geoCode = (address,callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFodWwwOTciLCJhIjoiY2ttOWF1djNmMWZ6bDJ3anh1YnN4bHU5MSJ9.UdYiQXrDccBQGB49f-yniQ'
   //console.log(url)
    request({url,json:true},(error,{body}= {})=>{
        if(error){
        callback('Unable To Connect !')
        }
        else if(!body.features[0]){
           callback('This is Invalid Location error')
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
   
    })
   }

   module.exports = geoCode;