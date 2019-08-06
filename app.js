const express = require("express")
const app = express()
const mustacheExpress = require('mustache-express')

app.use(express.urlencoded())
//tell express to use the mustache templating engine
app.engine('mustache', mustacheExpress())

//the pages are located in the views directory
app.set('views', './views')

//file extension will be .mustache
app.set('view engine', 'mustache')

const Trip = require('./models/travelClass')

trips = []


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/add-trip', (req, res) => {
    res.render('index')
})

app.get('/confirm', (req, res) => {
    res.render('confirm')
})

app.get('/viewTrips', (req, res) => {
    res.render('viewTrips', {trips: trips})
    
})



app.post('/add-trip', (req, res) => {
    let tripLocation = req.body.tripLocation
    let image = req.body.image
    let dateDeparture = req.body.dateDeparture
    let dateReturn = req.body.dateReturn

    let trip = {tripLocation: tripLocation, image: image, dateDeparture: dateDeparture, dateReturn: dateReturn}
    

    trips.push(trip)
    res.redirect('/confirm')
})

app.post('/delete-trip', (req, res) => {
    let tripName = req.body.tripName
    trips = trips.filter(trip => {     
        return trip.tripLocation != tripName
        
    })

    res.redirect('/viewTrips')
})




app.listen(3000, () => {
    console.log("Server has started")
})