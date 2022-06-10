const express=require('express');
const app=express();
const sib=require('sib-api-v3-sdk');
require('dotenv').config();
const cors=require('cors');
const SMTPPool = require('nodemailer/lib/smtp-pool');
app.use(cors());
app.use(express.json());
app.listen(7800,()=>{
    console.log("Server listening to port 7800..");
})
var receiversMails;
var recipients;
app.post('/receiverMails',(req,res)=>{
    receiversMails=req.body.mails.split(',');
    console.log(receiversMails);
    recipients=[{email:"demo87335@gmail.com"}]
    receiversMails.forEach(r=>{
        var obj={};
        obj["email"]=`${r}`;
        recipients.push(obj);
    });
    console.log(recipients);
    return res.json({msg:200});
});
app.post('/sendMail',(req,res)=>{
    var con=req.body.content.split("\n").join(`<br/>`);
    const details={
        name:req.body.name,
        mail:req.body.mail,
        subject:req.body.subject,
        content:con,
    }
    const client=sib.ApiClient.instance;
    const apiKey=client.authentications['api-key'];
    apiKey.apiKey='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';
    const tranEmailApi=new sib.TransactionalEmailsApi();
    const sender={
        email:details.mail,
        name:details.name
    }
    const receivers=recipients;
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:details.subject,
        htmlContent:details.content,
    }).then((result)=>{
        res.json({msg:"success"});
        console.log(result);
        receiversMails=[];
        recipients=[{email:"demo87335@gmail.com"}]
    }).catch((err)=>{
        res.json({msg:"failed"});
        console.log(err)})
    /*const nodemailer=require('nodemailer');
    //const xoauth2=require('xoauth2')
    //var transporter = nodemailer.createTransport('smtps://demo87335%40gmail.com:demo1234@@smtp.gmail.com');

let transporter=nodemailer.createTransport(new SMTPPool({
    host:"smtp.gmail.com",
    port:587,
    auth:{
       // type:"OAuth2",
        user:"demo87335@gmail.com",
        pass:"demo1234@",
       clientId:"332255476679-mjrrj3t324crc4na0dilsk7f3v5gsds9.apps.googleusercontent.com",
    clientSecret:"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",
    refreshToken:"1//04BnCpqcc2xGVCgYIARAAGAQSNwF-L9Ir34GytFRQLp7XVNwqlY3IBhqGuD5EMQbMnDCBWE13EuqupFDA-bTpMXfKoTpaTAKQx-Q"
    },
    maxConnection: 5,
    maxMessages: Infinity
}));

let mailOptions={
    from:"singhaparna7588@gmail.com",
    cc:details.mail,
    to:"nandita7890@outlook.com",
    subject:details.subject,
    html:details.content
};
transporter.sendMail(mailOptions,function(err,data){
    if(err){
        console.error(err);
        return res.json({msg:"failed"})
    }
    else{
        console.log(data);
        return res.json({msg:"success"})
    }
})*/


})
    