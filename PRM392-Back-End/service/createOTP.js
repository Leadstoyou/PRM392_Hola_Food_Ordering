import crypto from 'crypto';
function generateOTPWithExpiration() {
    const otpLength = 6; 
    const otpBuffer = crypto.randomBytes(otpLength);
    const otp = otpBuffer.readUIntBE(0, otpLength);
  
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15);
  
    const otpData = {
      otp: otp.toString().padStart(otpLength, '0'),
      expiration: expirationTime,
    };
  
    return otpData;
  }
  
  export default { generateOTPWithExpiration };