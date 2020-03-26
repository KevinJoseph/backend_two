var express = require('express');
var router = express.Router();
import User from '../models/user';
const {verifyAuth} = require('../middlewares/verifyAuth.js');

//GET users listing
router.get('/',verifyAuth, async(req,res) => {
    //console.log(req.decoded.data._id);
    try {
        const user = await User.findOne({ _id: req.decoded.data._id });

        res.status(201).json({
            title: 'Usuario Autorizado',
                user:{
                    email: user.email,
                    name: user.name
                }
        });
        } catch (error) {

            return res.status(401).json({
                title: 'Error'
            });     

        }    
 });

module.exports = router;







