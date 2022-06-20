require('dotenv').config()
const express= require('express')
const app=express()
const path=require('path')
const flash=require('express-flash')
const PORT=process.env.PORT || 3300
const ejs=require('ejs')
const mongoose= require('mongoose')
const session=require('express-session')
const MongoDbStore = require('connect-mongo')(session)
const expressLayout=require('express-ejs-layouts')
const passport = require('passport')

const url='mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('err',(err) => {
    console.log('Connection failed...')
});

// Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})


app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24}
}))

app.use(passport.initialize())
app.use(passport.session())
const passportInit = require('./app/config/passport')
passportInit(passport)

app.use(flash())

app.use((req,res,next)=>{
res.locals.session=req.session 
res.locals.user=req.user
next()
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(expressLayout)
app.use(express.static('public'))

app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)
app.listen(3300,()=>{
     console.log(`Listening on port ${PORT}`)
 })