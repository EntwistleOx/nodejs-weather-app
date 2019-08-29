const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Juan D'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Juan D'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, praesentium.',
        name: 'Juan D'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article page not found',
        name: 'Juan D'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Juan D'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' +port)
})