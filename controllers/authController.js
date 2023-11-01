
const otpService = require('../services/otp-services');
const hashService = require('../services/hash-service');
const tokenService = require('../services/token-service');
const User = require('../models/user');




async function login(req, res) {

  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    res.status(400).json({message: 'Phone field is required!'});
  }

    const otp =await otpService.generateOtp();
    

    const ttl =1000 * 60 * 5; //10-min
    const expires = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    try {
       
        return res.json({
            hash:`${hash}.${expires}`,
            otp:otp

        });
        
    } catch (error) {
        
    }
   
    
    


  
}
// verifyOyyp .......


async function verifyOtp(req,res) {

    const {otp , hash , phone} = req.body;
    if (!otp || !hash ||!phone) {
       return res.status(400).json({message:'All fields are required!'});
    }

    const [hashedOtp , expires] = hash.split('.');

    if(Date.now() > +expires){
      return  res.status(400).json({message:'OTP expired!'});
    }

    const data = `${phone}.${otp}.${expires}`;

   const isValid =await otpService.verifyOtp(hashedOtp,data);
   

   
  if (isValid==false) {
    return res.status(400).json({message:'Invalid OTP'});
   }else {

    const getUser = await User.findOne({phoneNumber:phone});
    console.log(getUser);
    if (getUser!=null) {
      return res.status(200).json({user:getUser,isNew:false});
    }

    const user  = new User();
    user.phoneNumber = phone;
    
    
    

    //Token genrate here .. . . 

   const {accessToken,refreshToken} = tokenService.generateTokens({id:phone,activate:false});


  //  await tokenService.storeRefreshToken(refreshToken,"2451515151151");
 
 
  //   res.cookie('refreshToken', refreshToken, {
  //    httpOnly: true,
  //    secure: true,
  //    sameSite: 'None',
  //    maxAge: 30 * 24 * 60 * 60 * 1000, // Set the expiration time for the cookie (30 days in this example)
  //  });
 
 
  //  res.cookie('accessToken', accessToken, {
  //    httpOnly: true,
  //    secure: true,
  //    sameSite: 'None',
  //    maxAge: 30 * 24 * 60 * 60 * 1000, // Set the expiration time for the cookie (30 days in this example)
  //  });
 
       user.accessToken = accessToken;
      const savedUser=  await user.save();

    
     
   return res.status(200).json({user:savedUser,isNew:true});
   }




  
   

//    let user;
   

//   try {
//     user =  await userService.finduser({mobile:phone});
//     if (!user) {
//        user =  await userService.createUser({mobile:phone});
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message:"Db error"});
//   }

  


   


 
   }



   async function refresh(req,res) {
    //get refresh token from cookie

    const {refreshToken: refreshTokenFromCookies } = req.cookies;

    //check if token is valid
     let userData;


    try {
      userData =  await tokenService.verifyRefreshToken(refreshTokenFromCookies);
    } catch (error) {
        return res.status(401).json({message:'Invalid Token'});
    }

    //check if token is in db

    //Genrate new tokens

   const {refreshToken, accessToken} = tokenService.generateTokens({id:"2451515151151"});

   //update refresh token

   //put in cookie

   res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set the expiration time for the cookie (30 days in this example)
  });


  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set the expiration time for the cookie (30 days in this example)
  });

  }

  async function tokenIsValid (req,res) {
    try {
     
      const token = req.header('x-auth-token');
      console.log(token);
      
      if (!token) {
        console.log("dfd"); return res.json(false);
      }

     const verified = await tokenService.verifyAccessToken(token);
     console.log(verified);
     if (!verified) {
      console.log("sgdgg");
      return res.json(false);
     }

     const user = await User.findOne({phoneNumber:verified.id});
     console.log(user);

     if (!user) {
      return res.json(false);
     }

     return res.json(true);
    } catch (error) {
      
    }
    
  }


   


 

module.exports = { login,verifyOtp,refresh,tokenIsValid};
  