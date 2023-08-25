const tokenService = require('../services/token-service');


 const auth =  async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    

  if (!token) {
    return res.status(401).json({msg:"No Auth token access denoed"});
  } 

  const decodedToken =await tokenService.verifyAccessToken(token);
  if (!decodedToken) {
    return res.status(401).json({msg:"Token Verification failed ,authorization denied."});
  }
   
  req.user = decodedToken.id;
  req.token = token;
  
 
  // Call the next middleware
    next();
  } catch (error) {
    return res.status(500).json({error:"sfdsdf"});
  }
}

module.exports = auth;