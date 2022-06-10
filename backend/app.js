const express=require('express');
const app=express();
const sib=require('sib-api-v3-sdk');
require('dotenv').config();
const apiKey=require('./apiKey');
const cors=require('cors');
const SMTPPool = require('nodemailer/lib/smtp-pool');
const demoMail=require('./demo.js');
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
    recipients=[{email:`${demoMail}`}]
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
    apiKey.apiKey=apiKey;
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
        recipients=[{email:`${demoMail}`}]
    }).catch((err)=>{
        res.json({msg:"failed"});
        console.log(err)})
    

})
    