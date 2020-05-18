var express = require('express');
var router = express.Router();
import Solicitud from '../models/solicitud';
const {verifyAuth} = require('../middlewares/verifyAuth.js');

//POST new solicitud
router.post('/', async(req,res) => {

    const newSolicitud = new Solicitud({
        document: req.body.document,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        year: req.body.year,
        status: "0",
    })
        
    try {
        const result = await Solicitud.create(newSolicitud);
        return res.json(result);
  
    } catch (error) {
        return res.status(500).json({
            message:'Ocurrio un error.',error
        })
    }

 });
 
 //Platform - Listar solicitudes
 router.get('/' ,verifyAuth,async(req,res) =>{
    try {

        console.log("EJECUTA BACKEND")
        //const user = await User.findOne({ _id: req.decoded.user_id });
        const result = await Solicitud.find({},['_id','document', 'name','phone','email','year','status','date'], function (err, docs) {});
        console.log(result)
        return res.status(201).json(result);
  
    } catch (error) {
        return res.status(401).json({
            title: 'Error',
            error: error
        });     
    }
 });

 //Platform - Cambiar estado Completado

 router.put('/complety/:id', async(req, res) => {
    const _id = req.params.id;
    //console.log("PARAMETRO:",_id)
  
    try {
      const solicitud = await Solicitud.findByIdAndUpdate(
        _id,
        {status:'1'},
        {new: true});
        res.json(solicitud);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

//Platform - Cambiar estado Pendiente
router.put('/pending/:id', async(req, res) => {
  const _id = req.params.id;
  //console.log("PARAMETRO:",_id)

  try {
    const solicitud = await Solicitud.findByIdAndUpdate(
      _id,
      {status:'0'},
      {new: true});
      res.json(solicitud);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});




module.exports = router;