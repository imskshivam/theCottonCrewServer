const crypto = require('crypto');
const hashService = require('../services/hash-service');

class OtpService {


  async generateOtp() {
    const otp =crypto.randomInt(1000, 9999);
    return otp;
   }

   senmdBySms() {
    
   }

   async verifyOtp(hashedOtp , data) {

   let computedHash = hashService.hashOtp(data);

   if (computedHash === hashedOtp) {
    return true;
   }else{
    return false;
   }

   }


}

module.exports = new OtpService();