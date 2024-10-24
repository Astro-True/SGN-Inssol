const jwt = require('jsonwebtoken');
const authMiddleware = function(req, res, next){
    const auth= req.headers['authorization']
    if(auth){
        const token = auth.split(" ")[1];
        const user=jwt.verify(token, 'shhhhh')
        req.user=user;
        next()
    }else{
        res.status(401).send({message:"mo autentificado"});
    }
}
module.exports={authMiddleware}