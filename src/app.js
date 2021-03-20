const path = require ('path');
const express = require ('express');
const hbs = require('hbs');
const geoCode =require('./utils/geocode');
const forecast = require('./utils/forecast');
const e = require('express');



console.log(__dirname, '     ' ,__filename) // Both of these values are provided by wrapper function.
console.log(path.join(__dirname,'../public')) ;
const app = express() // Express function;
const port = process.env.PORT || 3000
 

//Paths for Express handle bars
const viewsPath = path.join(__dirname, '../templates/views');

const partalsPath = path.join(__dirname, '../templates/partials');
const pubDirectory = path.join(__dirname,'../public')

hbs.registerPartials(partalsPath);

//Setup HBS
app.set('views',viewsPath)



app.set('view engine','hbs');

//Static Directory.
app.use(express.static(pubDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'App Weather',
        name:'Rahul'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'App Weather',
        name:'Rahul'
    });
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help Page',
        name:'I require Help'
    });
})



// app.get('',(req,res)=>{

//     //res.send('<h1>Weather </h1>')  html value
//     res.send([{
//         Name:'Rahul',
//         Age:23
//     },
//     {
//         Name:'Sumeet',
//         Age:25
//     }])
// })

app.get('/weather',(req,res)=>{

    if (!req.query.address){
        return res.send({
            error:'You Must provide address'
        })   
    }
    else {
        geoCode(req.query.address,(err,{latitude,long,location} ={})=>{
           if(err)
            return res.send({err})
        else{
           // console.log(latitude,long,location)
            forecast(latitude,long,(err,data)=>{
                if(err)
                return res.send(err)
                else{
                    res.send({data,
                        location,
                    address:req.query.address
                })
                }
            })
        }
        });
    }

    // res.send({
    //     forecast:'OMG',
    //     location:'Delhi',
    //     address:req.query.address
    // })
})

app.get('/product',(req,res)=>{

    if(!req.query.search)
    {
       return res.send({
            error:'You Must provide Search'
        })
    }
    console.log(req.query.search);
    res.send(
        {product : []}
        )
})

app.get('/help/*',(req,res)=>{
    //res.send('Help Article not found !')
    res.render('404',{
        error:'404 means we are looking at page that do not exists.'
    })
});

app.get('*',(req,res)=>{
  //  res.send('My 404')
  res.render('404',{
    error:'404 means we are looking at page that do not exists.'
})
    });

app.listen(PORT,()=>{
    console.log('Server is Up on port '+ PORT +'.')
});
