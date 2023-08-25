const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService {
   generateTokens(payload) {
      const accessToken =  jwt.sign(payload,accessTokenSecret, {
       expiresIn:'1y'
      });


      const refreshToken =  jwt.sign(payload,refreshTokenSecret, {
       expiresIn:'1y'
      });

      return {accessToken, refreshToken};

   }

  async storeRefreshToken(token,userId) {
     try {
        
     } catch (error) {
        
     }
   }

   async verifyAccessToken(accessToken) {
     try {
        return jwt.verify(accessToken,accessTokenSecret);
     } catch (error) {
        return false;
     }
    }



   async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken,refreshTokenSecret);
   }



 

}

module.exports = new TokenService();