const prisma = require('../prisma/db');
const randomstring = require('randomstring');
const {constants} = require('../constants');
const nodemailer =require('nodemailer');


const sendMail = async(email,mailSubject,content)=>{
    try{
        const transport=nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'madhumadhu112120052@gmail.com',
                pass:'bbvkbfhkharppgur'
            }
    });
    const mailOptions={
        from:'madhumadhu112120052@gmail.com',
        to:email,
        subject:mailSubject,
        html:content
    }
    transport.sendMail(mailOptions,function (error,info) {
        if(error){
            console.log(error);

        }else{
            console.log('mail sent sucessfully-',info.response);
        }
    });
    }catch(error){
        console.log(error.message);
    }
}

const emailContent=(name,email, randomToken)=>{
    let mailSubject='Mail Verification';
    let content='<p>hii '+name+',\please <a href="http://127.0.0.1:8000/mail-verification?token='+randomToken+'">verify</a> your email';

    sendMail(email,mailSubject,content);
                                
    // function updateToken(randomToken, email) {
    //     try {
    //     const updateUser = prisma.user.update({
    //         where: {
    //             email: email,
    //             },
    //         data: {
    //             token: randomToken,
    //         },
    //         })
    //         console.log('updated');
    //         }catch (error) {
    //           console.log('Error in updating token:', error);
    //         }
    //     }
    // updateToken(randomToken,email);
}

const verifyMail = async (req, res) => {
    try {
        const token = req.query.token;
        const user = await prisma.user.findFirst({
            where: {
                token: token,
            },});
        if (user) {
            await prisma.user.update({
                where: {
                id: user.id,
                },
                data: {
                token: "",
                is_Verified: true,
                },
            });
            console.log('Mail verified successfully' );
            return res.status(constants.SUCCESS).json({"message":"Mail verified successfully!!!"});
        } else {
            console.log('Mail not verified!!' );
            return res.json({"message":"Mail not verified!"});
        }
    } catch (error) {
        console.log(error.message);
    } 
};

module.exports = {
    verifyMail,sendMail,emailContent
};