const express =require('express')
const router= new express.Router()
const auth=require('../middleware/auth')
const User=require('../models/user')
const multer=require('multer')

// router.post('/users',(req,res)=>{
//     console.log(req.body)
//     const user=new User(req.body)
//     user.save().then(()=>{
//         res.status(200).send(user)
//     }).catch((error)=>{
//         res.status(400).send('error'+error)
//     })


// })

router.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})



router.get('/users/:id',(req,res)=>{
    console.log(req.params)
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send(user)
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})


// router.patch('/users/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id
//         const user=await User.findByIdAndUpdate(_id ,req.body,{
//             new:true,
//             runValidator:true
//         })
//         if(!user){
//             return res.status(404).send('no user is found')
//         }
//         res.status(200).send(user)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })




// router.patch('/users/:id',async(req,res)=>{
//     try{
//         const updates=Object.keys(req.body)
//         console.log(updates)
//         const allowedUpdates=["name","password"]
//         var isvalid=updates.every((update)=>allowedUpdates.includes(update))
//         console.log(isvalid)
//         if(!isvalid){
//             return res.status(400).send('cannot update')
//         }
//         const _id=req.params.id
//         const user=await User.findByIdAndUpdate(_id ,req.body,{
//             new:true,
//             runValidator:true
//         })
//         if(!user){
//             return res.status(404).send('no user is found')
//         }
//         res.status(200).send(user)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })






router.patch('/users/:id',async(req,res)=>{
    try{
        const updates=Object.keys(req.body)
        console.log(updates)
        const allowedUpdates=["name","password"]
        var isvalid=updates.every((update)=>allowedUpdates.includes(update))
        console.log(isvalid)
        if(!isvalid){
            return res.status(400).send('cannot update')
        }
        const _id=req.params.id
       const user=await User.findById(_id)
       if(!user){
           return res.status(404).send('no user is found')
       }
       updates.forEach((update)=>
           user[update]=req.body[update])
           await user.save()
           res.status(200).send(user)

       
    }
    catch(e){
        res.status(400).send(e)
    }
})





router.post('/users',async(req,res)=>{
    try{
    const user=new User(req.body)
    const token=await user.generateToken()
    await user.save()
    res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token =await user.generateToken()
        res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e)

    }
})









router.delete('/users/:id',async(req,res)=>{
    try{
        const _id=req.params.id
        const user=await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send('unable to find user')
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})



router.get('/profile',auth,async(req,res)=>{
    res.send(req.user)
})






router.delete('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((el)=>{
            return el.token!==req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})





router.delete('/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
    
        await req.user.save()
        res.send('logout success')
    }
    catch(e){
        res.status(500).send(e)
    }
})














const uploads=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            cb(new Error('you must upload  an image file'))
        }
        cb(null,true)
    }
})
router.post('/profiles',auth,uploads.single('avatar'),async(req,res)=>{
    try{
        req.user.avatar=req.file.buffer
        await req.user.save()
        res.send('done')
        console.log(req.user.avatar)
    }
    catch(e){
        res.status(400).send(e)
    }

    
})

module.exports=router