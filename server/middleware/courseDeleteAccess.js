const isAuthForDeleteCourse = (req,res,next)=>{
    if(req.body.job === "מנהלת פדגוגית" || req.body.job === "מנהל פדגוגי"){
        next()
    }
    else{
        res.status(403).json({
            success:false,
            message:"you don't have access"
        })
    }
};

module.exports = isAuthForDeleteCourse;