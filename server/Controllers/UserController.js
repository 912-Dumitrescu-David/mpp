const User = require('../Models/UserModel');
const connection = require('../connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ username: user.username}, 'secretkey', { expiresIn: '1h' });
}
// register a new user
function registerUser(req, res) {
    const { username, password } = req.body;
    const query = 'INSERT INTO user SET ?';
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User(username, hashedPassword);
    connection.query(query, user, (error, result) => {
        if (error) {
            console.log('Error registering user:', error);
            console.error('Error registering user:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User registered successfully');
        res.status(200).json({ message: 'User registered successfully' });
    });
}

// login a user
function loginUser(req, res) {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ?';
    connection.query(query, username, (error, results) => {
        if (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                console.log('Invalid password');
                res.status(401).send('Invalid password');
            }
        } else {
            console.log('Invalid username');
            res.status(401).send('Invalid username ');
        }
    });
}

module.exports = {
    registerUser,
    loginUser
};