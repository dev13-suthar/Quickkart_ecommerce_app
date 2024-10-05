import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import {google} from "googleapis"

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECREAT = process.env.CLIENT_SECREAT
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOEKN = process.env.REFRESH_TOEKN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECREAT,REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token:REFRESH_TOEKN
});

 const sendEmail = async(userEmail,userName,orderItems,orderTotal)=>{
    try {
       const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'ecomshoper35@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECREAT,
                refreshToken:REFRESH_TOEKN,
                accessToken:accessToken
            }
        });

        let MailGenerator = new Mailgen({
            theme:"default",
            product:{
                name:"EcomShoppers",
                link:"https://mailgen.js/"
            }
           });

           let productRows = orderItems.map(item => ({
            name: item.name,
            price: item.unitPrice
        }));

       let  response = {
        body:{
            name:"EcommSHoppers",
            intro:`Your Order Places Successfully! ${userName}`,
            table:{
                data:[
                   {name:"Product Name",price:"Price"},
                   ...productRows,
                   {
                        total:"Cart Value",
                        orderTotal:orderTotal
                   }
                ]
            },
            outro:"Order will be Deliverd within 5-7 Working Days"
        } 
       }
        let mail = MailGenerator.generate(response);
        const mailOptions = {
            from:'ecomshoper35@gmail.com',
            to:userEmail,
            subject:"Your Order Placed!! ☑️",
            text:"Order Placed ok",
            html:mail
        }

        const result = await transport.sendMail(mailOptions);
        console.log(`Mail send ${result.messageId}`);

    } catch (error) {
        console.log('Error sending order confirmation email:', error);
    }
}

export default sendEmail;

  


