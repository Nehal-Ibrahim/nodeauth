const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT
const cors=require('cors')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')


require('./db/mongoose')

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)

// const multer=require('multer')

// const uploads=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.endsWith('.pdf')){
//             cb(new Error('you must upload pdf file'))
//         }
//         cb(null,true)
//     }
// })

// app.post('/profileImage',uploads.single('avatar'),(req,res)=>{
//     res.send('uploaded')
// })

app.listen(port,()=>{
    console.log('server is runing '+port)
})