const jwt = require('jsonwebtoken')
const User = require('../models/userModels')
const requireAuth = async (req,res,next) => {
    //verify authentication
    const {authorization} = req.headers
    const secret = 'qwertyuiopasdfghjkkl'

    if(!authorization){
        return res.status(401).json({error: 'Auth Token Required'})
    }
    const token = authorization.split(' ')[1];

    try{
        const {_id} = jwt.verify(token, secret)

        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth