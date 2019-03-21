const express=require('express');
const fs=require('fs');
const bodyParser=require('body-parser');
const cors=require('cors');
// var mailer = require('nodemailer');
// mailer.SMTP = {
//     host: 'gmail.com', 
//     port:587,
//     use_authentication: true, 
//     user: 'prashantk.tps@gmail.com', 
//     pass: 'erprkriit1'
// };
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/email",(req,res)=>
{
	var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(req.body.email.match(mailformat))
	{
		fs.readFile('/app/email.txt',function(err,data)
		{
			if(err)
				res.json("there is some error. Please try again later")
			if(data.indexOf(req.body.email)>=0)
				res.json("This email id already exists in our database!")
			else{
		
					fs.open('/app/email.txt', 'a', 666, function( e, id ) {
						if(e)
							res.json("There is some error. Please try again or try again later");
					   else
					   	{fs.write( id, req.body.email + "\r\n", null, 'utf8', function(){
				    	fs.close(id, function(){
							res.json("Thanks for subscribing with Infotsav. We will get in touch with you soon!");
					    });
					   });}
					  });
				}
		});
	}
	else
		res.json("invalid email id entered. Please check and enter again");	
});
// app.get("/get",(req,res)=>{
// 	fs.readFile("/app/email.txt",function(err,data){
// 		if(err)
// 			res.json("failed to read file");
// 		else{
// 	   mailer.sendMail({       
//         sender: 'prashantk.tps@gmail.com',
//         to: 'prashantk.tps@gmail.com',
//         subject: 'Attachment!',
//         body: 'mail content...',
//         attachments: [{'filename': 'email.txt', 'content': data}]
//     }), function(err, success) {
//         if (err) 
//             res.json("failed to send mail");
//             else
//             	res.json("successful");
//         }

//     }

// 	})
// });
app.listen(process.env.PORT,()=>console.log(`app is listening to port ${process.env.PORT}`));