 const express= require('express')
const app=express()
const path=require('path')
const PORT=process.env.PORT || 3300
const ejs=require('ejs')
// const expressLayout=require('express-ejs-layoutsl')
app.get('/',(req,res)=>{
    res.render('home')
})

// app.use(expressLayout)

app.use(express.static('public'))

app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')
app.listen(3300,()=>{
     console.log(`Listening on port ${PORT}`)
 })