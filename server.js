const express=require('express');
const fs=require('fs');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
var knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/email",(req,res)=>
{
	var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(req.body.email.match(mailformat))
	{
		knex.select('email').from('email').where('email','=',req.body.email)
		.then(data=>{
			if(data.length===0)
			{
				knex('email').insert({email: req.body.email}).then(result=>{res.json("success")});
				
			}
			else
			{
				res.json("exists");
			}
		});





		// fs.readFile('email.txt',function(err,data)
		// {
		// 	if(err)
		// 		res.json("failed")
		// 	if(data.indexOf(req.body.email)>=0)
		// 		res.json("exists")
		// 	else{
		
		// 			fs.open('email.txt', 'a', 666, function( e, id ) {
		// 				if(e)
		// 					res.json("failed");
		// 			   else
		// 			   	{fs.write( id, req.body.email + "\r\n", null, 'utf8', function(){
		// 		    	fs.close(id, function(){
		// 					res.json("success");
		// 			    });
		// 			   });}
		// 			  });
		// 		}
		// });
	}
	else
		res.json("invalid");	
});
app.listen(process.env.PORT,()=>console.log(`app is listening to port ${process.env.PORT}`));