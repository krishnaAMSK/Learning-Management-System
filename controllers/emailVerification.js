
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const mysql = require('mysql');
const randomstring=require('randomstring');
const sendMail=require('../helpers/sendMail');


// const register = (req, res) => {

//     const errors = validationResult(req);

//     //if any errors return
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

// //registration 
//     db.connection.query(
//         `SELECT * FROM users WHERE LOWER(email) = LOWER(${mysql.escape(req.body.email)})`,
//         (err, result) => {
//             if (result && result.length) {
//                 return res.status(409).send({
//                     msg: 'This user is already in use'
//                 });
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(400).send({
//                             msg: err
//                         });
//                     } else {
//                         db.connection.query(
//                             `INSERT INTO users(name,email,password) VALUES('${req.body.name}',${mysql.escape(
//                                 req.body.email
//                             )},${mysql.escape(hash)});`,
//                             (err, result) => {
//                                 if (err) {
//                                     return res.status(400).send({
//                                         msg: err
//                                     });
//                                 }
//                                 let mailSubject='Mail Verification';
//                                 const randomToken=randomstring.generate();
//                                 let content='<p>hii '+req.body.name+',\
//                                 please <a href="http://127.0.0.1:8000/mail-verification?token='+randomToken+'">verify</a> your email';
                                
//                                 sendMail(req.body.email,mailSubject,content);
                                
//                                 db.connection.query('UPDATE users set token = ? where email = ? ',[randomToken,req.body.email],function(error,results,feilds){
//                                     if(error){
//                                         return res.status(400).send({
//                                             msg: err
//                                         });
//                                     }
//                                 });
//                                 return res.status(200).send({
//                                     msg: 'User is registered'
//                                 });
//                             }
//                         );
//                     }
//                 });
//             }
//         }
//     );
// };

//verify mail
const verifyMail=(req,res)=>{
    var token=req.query.token;
    db.connection.query(`SELECT * FROM users where token=? limit 1`,token,function(error,result,fields){

        if(error){
            console.log(error.message);
        }

        if(result.length>0){
            db.connection.query(`
            UPDATE users SET token =null,is_verified=1 WHERE id='${result[0].id}'
            `);

            return res.render('mail-verification',{message:'Mail verifed Sucessfully'});
        }else{
            return res.render('404');
        }
    });
}


module.exports = {
    verifyMail
};
