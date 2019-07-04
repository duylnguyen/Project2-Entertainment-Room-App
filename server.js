// Import needed packages
const express = require('express')
const app = express()
const methodOverride = require('method-override')

// import routers from controllers/
const { userRouter } = require('./controllers/user.js')
const { commentRouter } = require('./controllers/comment.js')
const { mediaRouter } = require('./controllers/media.js')
const { homeRouter } = require('./controllers/home.js')

// Register middleware...
// to parse the body of the HTTP requests from a URL encoded string 
app.use(express.urlencoded({extended: true}))

// to parse the body of the HTTP requests from a JSON string  
app.use(express.json())

// add method-override middleware for "faking" DELETE and PUT/PATCH requests 
app.use(methodOverride('_method'))

// use the `./public` directory to host static resources such as css and
// image files 
app.use(express.static(__dirname+"/public"))

// set the view engine of express to use the hbs (handlebars) package 
app.set('view engine', 'hbs')

// add router for the application to use. The first argument is a prefix to all
// the paths defined in the router.
app.use('/media', homeRouter)
app.use('/users', userRouter)
app.use('/media/:mediaId/comments', commentRouter)
app.use('/users/:userId/media', mediaRouter)
app.use('/users/:userId/media/movies', mediaRouter)
app.use('/users/:userId/media/musics', mediaRouter)


// Set the port the server is to run on
const PORT = process.env.PORT || 3000 

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
