module.exports=((fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err =>{
            next(err);
        }))
    }
})

// express and wrapasync loads automatically when server refreshed;