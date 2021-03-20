//const { response } = require("express")

//const e = require("express")

console.log('Client Side JS is Loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })




const weatherform = document.querySelector('form');

const search = document.querySelector('input');

const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');





weatherform .addEventListener('submit',(e)=>{
    e.preventDefault();
    const loc = search.value;
    //console.log(loc);

    msg1.textContent = 'Loading Weather data.....';
    msg2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${loc}`).then((response)=>{
    response.json().then((data)=>{
        if (data.err)
        msg1.textContent = data.err;
        else{

            msg1.textContent = data.location
             msg2.textContent = data.data
            // console.log(data.location)
            // console.log(data.data)

        }
        
    })
})
})