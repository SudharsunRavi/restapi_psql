const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authTable = require('../dbConnection');
const authQueries = require('../queries/authQueries');

const registerStudent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const emailExistsResult = await authTable.query(authQueries.checkIfEmailExists, [email]);
        if (emailExistsResult.length) return res.status(400).json({ message: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const register = await authTable.query(authQueries.registerStudent, [name, email, hashedPassword]);
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }
    try {
        const checkIfEmailExists = await authTable.query(authQueries.checkIfEmailExists, [email])
        if (!checkIfEmailExists.rows.length) return res.status(400).json({ message: 'Email does not exist' });

        const hashedPassword = checkIfEmailExists.rows[0].password;
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json(token)
        res.status(200).json({ message: 'Logged in successfully' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Unauthenticated' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: 'Unauthenticated' });

        res.status(200).json({ message: 'Authenticated' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = { registerStudent, loginStudent, getCurrentUser };
