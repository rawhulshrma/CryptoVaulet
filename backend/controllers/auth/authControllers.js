const { ethers } = require('ethers');
const UserModel = require('../../models/userModels');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

const authController = async (req, res) => {
    try {
        const { signature } = req.body;
        const { address } = req.query;

        if (!signature || !address) {
            return res.status(400).json({
                success: false,
                message: "Signature and address are required."
            });
        }

        const message = "Welcome to Crypto Vault Website";
        const recoveredAddress = ethers.verifyMessage ?
            ethers.verifyMessage(message, signature) :
            ethers.utils.verifyMessage(message, signature);

        if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
            return res.status(401).json({
                success: false,
                message: "Invalid signature."
            });
        }

        const normalizedAddress = recoveredAddress.toLowerCase();
        let user = await UserModel.findUserByAddress(normalizedAddress);

        if (!user) {
            user = await UserModel.createUser(normalizedAddress);
        }

        const token = jwt.sign(
            { address: normalizedAddress },
            JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: "Authentication successful.",
            token,
            user
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

module.exports = { authController };




// const ethers = require('ethers');
// const UserModel = require('../../models/userModels');
// const jwt = require('jsonwebtoken');

// const JWT_SECRETKEY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

// if (!JWT_SECRETKEY) {
//     console.error("JWT_SECRETKEY is not set in environment variables.");
//     process.exit(1);  // Exit if secret key is missing
// }

// const authController = async (req, res) => {
//     try {
//         // Get signature from request body and address from query
//         const { signature } = req.body;
//         const { address } = req.query;

//         // Validate input
//         if (!signature) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Signature is required" 
//             });
//         }

//         if (!address) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Address is required" 
//             });
//         }

//         // Verify the signature using the correct ethers method
//         const recoveredAddress = ethers.utils.verifyMessage(
//             "Welcome to Crypto Vault Website", 
//             signature
//         );

//         // Compare addresses (case-insensitive)
//         if (address.toLowerCase() === recoveredAddress.toLowerCase()) {
//             const normalizedAddress = recoveredAddress.toLowerCase();
            
//             // Find or create user
//             let user = await UserModel.findUserByAddress(normalizedAddress);
            
//             if (!user) {
//                 user = await UserModel.createUser(normalizedAddress);
//                 console.log('New user created:', user);
//             }

//             // Generate JWT token
//             const token = jwt.sign(
//                 { address: normalizedAddress },
//                 JWT_SECRETKEY,
//                 { expiresIn: '24h' }
//             );

//             // Send successful response
//             return res.status(200).json({
//                 success: true,
//                 message: "Authentication Successful",
//                 token,
//                 user
//             });
//         } else {
//             // Invalid signature
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication Failed - Invalid signature"
//             });
//         }
//     } catch (error) {
//         console.error('Authentication error:', error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     authController
// };
