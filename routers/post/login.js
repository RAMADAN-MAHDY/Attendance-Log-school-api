import express from 'express';
import Students from '../../schema/regstur.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Dotenv from 'dotenv';



Dotenv.config()



const Login =()=>{
const app = express()
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY ;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const ACCESS_TOKEN_EXPIRY = '1h'; 
const REFRESH_TOKEN_EXPIRY = '2m';

function generateTokens(user){
 const accessToken = jwt.sign(user ,SECRET_KEY , {expiresIn :ACCESS_TOKEN_EXPIRY } );
 const refreshToken = jwt.sign(user , REFRESH_SECRET_KEY  ,{expiresIn :REFRESH_TOKEN_EXPIRY });

 return {accessToken , refreshToken};
}

app.post('/login',async (req,res)=>{
    try{
    const {names , password ,code} = req.body;

    const checkemail = await Students.findOne({code});

    // const isnamevalid =  names ===checkemail.names;
    
    if( !checkemail){
        return res.status(401).json("يرجي التاكد من الحساب واعادة المحاوله")
    }

    const ispasswordValid =  password === checkemail.password;
    // للتحقق من الباسورد
    const hashedPassword = checkemail.password; 
    const hashedPasswordbcrypt =await bcrypt.compare(password, hashedPassword)
    
    if(!ispasswordValid && !hashedPasswordbcrypt){
        return res.status(401).json("يرجي التاكد من الحساب واعادة المحاوله")
    }


    const accessToken = generateTokens({names :checkemail.names , code : checkemail.code }); 
   console.log(checkemail._id.toString()) 

    return res.status(200).json({ message: 'Login successful' , ...accessToken , id: checkemail._id.toString() });
    
    }catch(err){
        console.error(err)
        return res.status(500).json("خطأ في التسجيل");
    }
    
    })


    app.post('/refresh-token', (req, res) => {
        const { refreshToken } = req.body;
      
        if (!refreshToken) {
          return res.status(400).json("توكن الريفريش مفقود");
        }
      
        // التحقق من صحة توكن الريفريش
        jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
          if (err) {
            return res.status(403).json("توكن الريفريش غير صالح");
          }
      
          // توليد توكنات جديدة
          const tokens = generateTokens({ names: user.names, code: user.code });
          console.log(user.names)
          res.status(200).json(tokens);
        });
      });



    return app ; 
    
}

export default Login;




// "message": "Login successful",



// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWFkYW41QGdtYWlsLmNvbSIsImNvZGUiOjUsImlhdCI6MTcyMTc2MDk4MiwiZXhwIjoxNzIxNzY0NTgyfQ.mgH4BqpdkXxfAIogvtE9POH5pwvUtFQyO0qcKvIf-sE",



// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWFkYW41QGdtYWlsLmNvbSIsImNvZGUiOjUsImlhdCI6MTcyMTc2MDk4MiwiZXhwIjoxNzIxNzYyNzgyfQ.GYY94lCgttcf8Ps_Yj6vWkUsZdXSLsGEF_m7ovbFMl4"