const express = require('express')//membuat variable baru dengan nama express 
const app = express()//membuat variable baru dengan nama app yang isisnya variable express
const port = 3000 // membuat variable dengan nama port yang isinya 3000 

const bodyPS = require('body-parser');
app.use(bodyPS.urlencoded({ extended: false}));
app.use(bodyPS.json());

const alat_tangkapRouter = require('./routes/alat_tangkap'); //routes tabel alat_tangkap
app.use('/api/alat_tangkap', alat_tangkapRouter);

const dpiRouter = require('./routes/dpi'); //routes tabel dpi
app.use('/api/dpi', dpiRouter);

const pemilikRouter = require('./routes/pemilik'); //routes tabel pemilik
app.use('/api/pemilik', pemilikRouter);

const kapalRouter = require('./routes/kapal'); //routes tabel kapal
app.use('/api/kapal', kapalRouter);

//kita listen Express.js ke dalam port yang  kita buat diatas
app.listen(port, () => {
    //dan kita tampilkan log sebagai penanda bahwa Express.js berhasil dijalankan
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})