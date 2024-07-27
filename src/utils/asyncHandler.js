//just for making the production standard code
const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler};



//2nd Way
// const asyncHandler = (fn)=> async (req,res,next)=>{  //Higher Order Function
// try{
//     await fn(req,res,next)
// }
// catch(err){
//     res.status(err.code||500).json({
//         success:false,
//         message:error.message
//     })
// }
// }