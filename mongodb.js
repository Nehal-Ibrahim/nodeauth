const mongodb=require('mongodb')
const mongoClient=mongodb.MongoClient
const connectionUrl='mongodb://127.0.0.1:27017'


// const dbName='task-manager'
// mongoClient.connect(connectionUrl,{
//     useNewUrlParser:true},
//     (error,client)=>{
//         if(error){
//             return console.log('error has occured')
//         }
//         console.log('success')
//         const db=client.db(dbName)
//         db.collection('users').insertOne({
//             name:'omar',
//             age:28
//         },
//         (error,data)=>{
//             if(error){
//                 return console.log('unable to insert users')
//             }
//             console.log(data)
//         }
//         )
//         db.collection('users').insertMany([
//             {name:'ahmed',age:30},
//             {name:'ali',age:30},
//             {name:'mohammed',age:60},
//         ],(error,data)=>{
//             if(error){
//                 return console.log('unable to insert users')
//             }
//             console.log(data.insertedCount)
//         })

//         ////////////////////////////////////////////////
//         db.collection('tasks').insertOne({
//             description:'task1',
//             complicated:true
//         },
//         (error,data)=>{
//             if(error){
//                 return console.log('unable to insert users')
//             }
//             console.log(data.insertedId)
//         }
//         )
//         db.collection('users').insertMany([
//             {description:'task2',completed:false},
//             {description:'task9',completed:false},
//             {description:'task6',completed:true},
//         ],(error,data)=>{
//             if(error){
//                 return console.log('unable to insert users')
//             }
//             console.log(data.insertedCount)
//         })



//   })
//   ///////////////////////////////////////////////////

// db.collection('users').findOne({age:30},(error,user)=>{
//     if(error)
//     {
//         return console.log('error')
//     }
//     console.log(user)
// })

// db.collection('tasks').findOne({_id:new ObjectId('')},(error,user)=>{
//     if(error)
//     {
//         return console.log('error')
//     }
//     console.log(user)
// })


// //////////////////////////////////////////////////////////////


// db.collection('tasks').find({completed:false}.toArray((error,users=>{
//     if(error){
//         return console.log('errorrrrr')
//     }
//     console.log(users)
// })))


// db.collection('tasks').find({completed:false}.toArray((error,users=>{
//     if(error){
//         return console.log('errorrrrr')
//     }
//     console.log(users)
// })))


// db.collection('tasks').find({completed:false}.toArray((error,users=>{
//     if(error){
//         return console.log('errorrrrr')
//     }
//     console.log(users)
// })))



// db.collection('tasks').find({completed:false}.count((error,users=>{
//     if(error){
//         return console.log('errorrrrr')
//     }
//     console.log(users)
// })))



// db.collection('tasks').find({completed:false}.limit(1).toArray((error,users=>{
//     if(error){
//         return console.log('errorrrrr')
//     }
//     console.log(users)
// })))

// ///////////////////////////////////////////////
// db.collection('users').updateOne({_id:new ObjectId('')},
//     {
//         $set:{name:'hossam'},
//         $inc:{age:6}
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     }


// )


// //////////////////////
// db.collection('tasks').updateMany({},
//     {
//         $set:{completed:true},
        
//     }).then((result)=>{
//         console.log(result.modifiedCount)
//     }).catch((error)=>{
//         console.log(error)
//     }


// )
// //////////////////
// db.collection('users').deleteOne({_id:new ObjectId('')})
// .then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     }


// )
// //////////////////////////////////
// db.collection('tasks').deleteMany({})
// .then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
// //         console.log(error)
//    }


//  )