const sendVerificationEmail = async (email, type, data = {}) => {
    const messages = {
        approved: `Your CareBridge doctor account has been approved!`,
        rejected: `Your doctor application was rejected. Contact support.`,
        welcome: `Welcome to CareBridge! Your temporary password: ${data.tempPassword ?? ''}`,
        newAppointment: `A new appointment has been created for you at ${data.time}, location: ${data.location} click on the link below to confirm: ${data.link}`
    };

    console.log(`[Email to ${email}]: ${messages[type]}`);
    return true;
};

module.exports = {sendVerificationEmail};
