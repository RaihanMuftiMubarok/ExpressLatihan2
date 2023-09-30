const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
//import database
const connection = require('../config/db');


router.get('/', function (req, res){
    connection.query('SELECT a.nama_kapal, b.nama_pemilik as pemilik, c.nama_dpi as dpi, c.luas as luas, d.nama_alat_tangkap as alat_tangkap'+
    ' from kapal a'+
    ' join pemilik b on b.id_pemilik=a.id_pemilik'+
    ' join dpi c on c.id_dpi=a.id_dpi'+
    ' join alat_tangkap d on d.id_alat_tangkap=a.id_alat_tangkap'+
    ' order by a.id_kapal desc ', function(err, rows){

        if(err){
            return res.status(500).json({
                status:false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Kapal',
                data: rows
            })
        }
    })
});

router.post('/insert', [
    //validation
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    }
    connection.query('insert into kapal set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res){
    let id = req.params.id;
    connection.query(`SELECT a.nama_kapal, b.nama_pemilik as pemilik, c.nama_dpi as dpi, c.luas as luas, d.nama_alat_tangkap as alat_tangkap    
    from kapal a
    JOIN pemilik b on b.id_pemilik=a.id_pemilik
    JOIN dpi c on c.id_dpi=a.id_dpi
    JOIN alat_tangkap d on d.id_alat_tangkap=a.id_alat_tangkap WHERE id_kapal = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Kapal',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id', [
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    }
    connection.query(`update kapal set ? where id_kapal = ${id}`, Data, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from kapal where id_kapal = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been delete !',
            })
        }
    })
})

module.exports = router;