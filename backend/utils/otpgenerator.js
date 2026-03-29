const otpGenerator = require("otp-generator");

const GenerateOTP = () => {
    return otpGenerator.generate(4, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });
};

module.exports = GenerateOTP;