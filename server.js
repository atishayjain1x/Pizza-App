 const express= require('express')
const app=express()
const path=require('path')
const PORT=process.env.PORT || 3300
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
app.use(expressLayout)

app.use(express.static('public'))

app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/cart',(req,res)=>{
    res.render('customer/cart')
})
app.get('/login',(req,res)=>{
    res.render('auth/login')
})
app.get('/register',(req,res)=>{
    res.render('auth/register')
})
app.listen(3300,()=>{
     console.log(`Listening on port ${PORT}`)
 })