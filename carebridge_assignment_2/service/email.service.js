// A function to mock email verification
const sendVerificationEmail = async (email, type, data = {}) => {
    const messages = {
        approved: `Your CareBridge doctor account has been approved!`,
        rejected: `Your doctor application was rejected. Contact support.`,
        welcome: `Welcome to CareBridge! Your temporary password: ${data.tempPassword}`
    };

    console.log(`[Email to ${email}]: ${messages[type]}`);
    return true;
};

module.exports = {sendVerificationEmail};
