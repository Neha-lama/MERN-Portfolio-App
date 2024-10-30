const nodemailer=require('nodemailer')
const sendGridTransport=require('nodemailer-sendgrid-transport')



//transport

const transporter=nodemailer.createTransport(
    sendGridTransport({
        auth:{
            api_key:process.env.API_SENDGRID,
        },
    })
);

const sendEmailController=(req,res)=>{
    try{
        const {name,email,msg}=req.body


        //validation
        if(!name || !email || !msg){
            return res.status(500).send({
                success:false,
                message:'please provide All Fields',
               
            });
        }
       //email matter
       transporter.sendMail({
           to:"nehalama917@gmail.com",
           from:"nehalama917@gmail.com",
           subject:"Regarding Mern Portfolio APP",
           html:`
           <h5>Detailed Information</h5>
           <ul>
           <li><p>Name:${name}</p></li>
           <li><p>Email:${email}</p></li>
           <li><p>Message:${msg}</p></li>
           </ul>
           `
       });


        return res.status(200).send({
            success:true,
            message:"your message send successfully",
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'send Email API Error',
            error,
        })
    }
    
}


module.exports={sendEmailController};