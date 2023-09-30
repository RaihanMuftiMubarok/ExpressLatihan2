const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
//import database
const connection = require('../config/db');

//fungsi read
router.get('/', function (req, res){
    connection.query('select * from pemilik order by id_pemilik desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Pemilik',
                data: rows
            })
        }
    })
});

//fungsi create
router.post('/insert', [
    //validation
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_pemilik: req.body.nama_pemilik,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
    }
    connection.query('insert into pemilik set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
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

//fungsi read by id
router.get('/(:id)', function (req, res){
    let id = req.params.id;
    connection.query(`select * from pemilik where id_pemilik = ${id}`, function (err, rows){
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
                message: 'Data Pemilik',
                data: rows[0]
            })
        }
    })
})

//fungsi update
router.patch('/update/:id', [
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_pemilik: req.body.nama_pemilik,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
    }
    connection.query(`update pemilik set ? where id_pemilik = ${id}`, Data, function (err, rows){
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

//fungsi delete
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from pemilik where id_pemilik = ${id}`, function (err, rows){
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