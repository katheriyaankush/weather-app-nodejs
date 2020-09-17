const express =require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000


const getLocationKey = require('./Utils/get-location');
const getWeatherInfo = require('./Utils/weather-info');

//console.log(__dirname)

//For setting the path of the file
const pathName = path.join(__dirname, '../public');
const viewPath =path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partial')

//for static pages 
app.use(express.static(pathName))

//for dynamic pages
app.set('view engine','hbs')  //By default view 
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.get('', (req,res)=>{
 
   
    
    res.render('index',{
    
    
        title: 'Weather',
        name:"Ankush katharia",
    })
    
    })


app.get('/weather', (req,res)=>{
 
if(!req.query.location){
return res.send("Please provide the location");
}



getLocationKey(req.query.location, (error, data) =>{
    console.log("Loc=",data)
    if(error){
      return  res.send({error});
    }
    else{

     
        getWeatherInfo(data , (error, forcastData) =>{
            console.log("Loc2=",forcastData)
            if(error){
             return   res.send({error});
            }
            else{

                res.send({
                    weather: forcastData ,
                    place: data.place,
                    location:req.query.location
                })
            
        
            }
        })

    }
})


})


app.get('/about',(req,res)=>{

    res.render('about',{
        city:"Moradabad",
        title:"About Me",
        name:"Ankush katharia"

    });


}
)


app.get('/help', (req,res)=>{

    res.render('help', {
        message:"How Can I help you",
        title:"Help",
        name:"Ankush katharia"
    });

})


app.get('/product',(req,res)=>{

  if(!req.query.search){

    return res.send([{error: "please pass the search"}]);
  }

     //console.log(req.query);

    res.send([ {product: "Gaming"} ]);
})



app.get('/help/*', (req,res)=>{

res.render('page_not_found',{

  
    title:"Help artical not found",
    name:"Ankush katharia"
});
} );





app.get('*', (req,res)=>{

res.render('page_not_found' , {
    title:"My 404 page",
    name:"Ankush katharia"
});

})





// app.get('/help' ,(req,res)=>{
// res.send("How Can I Help you");

// 



// app.get('/weather', (req, res)=>{
//     res.send([ {
//         temp:30

//     },
// {
// forcast:"Cloudy "

// } ]);
// })

app.listen(port, ()=>{

    console.log('server is up on ',port)
})