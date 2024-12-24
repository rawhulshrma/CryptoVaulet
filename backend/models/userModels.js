
const pool = require('../config/db');

const UserModel = {
    createUserSchema: async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                user_address VARCHAR(255) UNIQUE NOT NULL,
                encryption_key BYTEA DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await pool.query(query);
            console.log('User schema created successfully.');
        } catch (error) {
            console.error('Error creating user schema:', error);
            throw error;
        }
    },

    findUserByAddress: async (address) => {
        const query = 'SELECT * FROM users WHERE user_address = $1';
        const { rows } = await pool.query(query, [address]);
        return rows[0];
    },

    createUser: async (address) => {
        const query = 'INSERT INTO users (user_address) VALUES ($1) RETURNING *';
        const { rows } = await pool.query(query, [address]);
        return rows[0];
    }
};

module.exports = UserModel;


// // models/userModel.js
// const pool = require('../config/db');

// const createUserSchema = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             user_address VARCHAR(255) NOT NULL,
//             encryption_key BYTEA DEFAULT NULL,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('User schema created successfully');
//     } catch (error) {
//         console.error('Error creating schema:', error);
//         throw error;
//     }
// };

// const uploadImage = async (userAddress, encryptionKey) => {
//     const query = `
//         INSERT INTO users (user_address, encryption_key)
//         VALUES ($1, $2)
//         RETURNING *;
//     `;
//     const values = [userAddress, encryptionKey];

//     try {
//         const { rows } = await pool.query(query, values);
//         console.log('Image metadata uploaded:', rows[0]);
//         return rows[0];
//     } catch (error) {
//         console.error('Error uploading image metadata:', error);
//         throw error;
//     }
// };

// const getImage = async (userAddress) => {
//     const query = `
//         SELECT * FROM users
//         WHERE user_address = $1;
//     `;
//     const values = [userAddress];

//     try {
//         const { rows } = await pool.query(query, values);
//         if (rows.length === 0) {
//             console.log('No image metadata found for this user');
//             return null;
//         }
//         console.log('Image metadata retrieved:', rows[0]);
//         return rows[0];
//     } catch (error) {
//         console.error('Error retrieving image metadata:', error);
//         throw error;
//     }
// };

// const authImage = async (userAddress, encryptionKey) => {
//     const query = `
//         SELECT * FROM users
//         WHERE user_address = $1 AND encryption_key = $2;
//     `;
//     const values = [userAddress, encryptionKey];

//     try {
//         const { rows } = await pool.query(query, values);
//         if (rows.length === 0) {
//             console.log('Authentication failed. Invalid user or key.');
//             return false;
//         }
//         console.log('Authentication successful for:', rows[0]);
//         return true;
//     } catch (error) {
//         console.error('Error authenticating image metadata:', error);
//         throw error;
//     }
// };

// module.exports = {
//     createUserSchema,
//     uploadImage,
//     getImage,
//     authImage,
// };
