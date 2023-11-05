import crypto from 'crypto';
function generateOTPWithExpiration() {
    const otpLength = 6; // Độ dài của mã OTP (ví dụ: 6 chữ số)
    const otpBuffer = crypto.randomBytes(otpLength);
    const otp = otpBuffer.readUIntBE(0, otpLength);
  
    // Tính thời gian hết hạn (15 phút sau thời điểm hiện tại)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15);
  
    // Chuyển mã OTP và thời gian hết hạn thành một đối tượng
    const otpData = {
      otp: otp.toString().padStart(otpLength, '0'),
      expiration: expirationTime,
    };
  
    return otpData;
  }
  
  export default { generateOTPWithExpiration };