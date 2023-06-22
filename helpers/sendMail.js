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

module.exports=sendMail;