import crypto from 'crypto';

function generateRandomString(length) {
  const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}

function generateOTPWithExpiration() {
  const otp = generateRandomString(12);
  
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 15);
  
  const otpData = {
    otp,
    expiration: expirationTime,
  };
  
  return otpData;
}

export default { generateOTPWithExpiration };
