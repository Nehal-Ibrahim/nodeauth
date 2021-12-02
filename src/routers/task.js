const express =require('express')
const router= new express.Router()
const auth=require('../middleware/auth')
const Task=require('../models/task')


// router.post('/tasks',(req,res)=>{
//     console.log(req.body)
//     const task=new Task(req.body)
//     task.save().then(()=>{
//         res.status(200).send(task)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })




// router.get('/tasks/:id',(req,res)=>{
//     const _id=req.params.id
//     Task.findById(_id).then((task)=>{
//         if(!task){
//             return res.status(404).send('unable to find task')
//         }
//         res.status(200).send(task)
//     })
//     .catch((e)=>{
//         res.status(500).send(e)
//     })
// })



// router.get('/tasks',(req,res)=>{
//     const _id=req.params.id
//     Task.find({}).then((task)=>{
//         res.status(200).send(task)
//     })
//     .catch((e)=>{
//         res.status(500).send(e)
//     })
// })



// router.patch('/tasks/:id',async(req,res)=>{
//     try{
//         const updates=Object.keys(req.body)
//         const allowedupdates=["description"]
//         var isvalid=updates.every((update)=>allowedupdates.includes(update))
//         if(!isvalid){
//             return res.status(400).send('cannot update')
//         }
//         const _id=req.params.id
//         const task=await Task.findByIdAndUpdate(_id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!task){
//             return res.status(404).send('no task is found')
//         }
//         res.status(200).send(task)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })








// router.post('/tasks',auth,(req,res)=>{
//     console.log(req.body)
//     const task=new Task(req.body)
//     task.save().then(()=>{
//         res.status(200).send(task)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })


router.post('/tasks',auth,async(req,res)=>{
    try{
        const task=new Task({...req.body,owner:req.user._id})
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})







// router.delete('/tasks/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id
//         const task=await Task.findByIdAndDelete(_id)
//         if(!task){
//             return res.status(404).send('unable to find task')
//         }
//         res.status(200).send(task)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })



router.get('/tasks/:id',auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send('no task is found')
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})






router.patch('/tasks/:id',auth,async(req,res)=>{
    try{
        const updates=Object.keys(req.body)
        const allowedupdates=["description"]
        var isvalid=updates.every((update)=>allowedupdates.includes(update))
        if(!isvalid){
            return res.status(400).send('cannot update')
        }
        const _id=req.params.id
        const task=await Task.findOneAndUpdate({_id,owner:req.user._id},req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return res.status(404).send('no task is found')
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const task=await Task.findOneAndDelete({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send('unable to find task')
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// router.get('/tasks',auth,async(req,res)=>{
//     try{
//         await req.user.populate('tasks')
//         res.status(200).send(req.user.tasks)
//     }
//     catch(e){
//         res.status(400).send('e'+e)
//     }
// })
router.get('/userTask/:id',auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send('no task is found')
        }
        await task.populate('owner')
        res.status(200).send(task.owner)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.get('/tasks',auth,async(req,res)=>{
    try{
        const match={}
        if(req.query.completed){
            match.completed=req.query.completed==='true'
        }

        const sort={}
        if(req.query.sortBy){
            const parts=req.query.sortBy.split(':')

            sort[parts[0]]=parts[1]==='desc'? -1:1
        }
        await req.user.populate({
            path:'tasks',
            match:match,
            options:{
                sort:sort
            }
        })
        res.status(200).send(req.user.tasks)
    }
    catch(e){
        res.status(400).send(e)
    }
})









module.exports=router