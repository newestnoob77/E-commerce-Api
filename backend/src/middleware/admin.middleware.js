export const isAdmin=(req,res,next)=>{
    if(!req.user||req.user.role!=="admin"){
        return res.status(403).send("Admin access required");
    }   
    next();
    }
