import crypto from 'crypto'
const generateRandomBytes = () => {
    try {
        const randomBytes = crypto.randomBytes(256);
        const base64String = randomBytes.toString('base64');
        console.log('Generated JWT Secret Key:', base64String);
    } catch (error) {
        console.error('Error generating random bytes:', error);
    }
};

generateRandomBytes();
