import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
class AuthController {
    constructor({ authRepo, userRepo, roleRepo }) {
        this.authRepo = authRepo;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.secretKey = process.env.JWT_SECRET;
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await this.authRepo.findByUsername(username);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const role = await this.roleRepo.getRoleByID(user.roleid);
            console.log(role.name);
            const token = jwt.sign({ id: user.userid, role: role.name }, this.secretKey, {
                expiresIn: '1h' // Token expires in 1 hour
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async register(req, res) {
        const { username, password, first_name, last_name, email, phone_number, address } = req.body;

        try {
            // Validate inputs
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Invalid email address' });
            }
            if (!validator.isAlpha(first_name) || !validator.isAlpha(last_name)) {
                return res.status(400).json({ error: 'First and last names must be valid strings' });
            }
            if (!validator.isMobilePhone(phone_number, 'any', { strictMode: false })) {
                return res.status(400).json({ error: 'Invalid phone number' });
            }

            // Validate password
            const passwordErrors = this.validatePassword(password);
            if (passwordErrors.length > 0) {
                return res.status(400).json({ errors: passwordErrors });
            }

            // Check if user already exists
            const existingUser = await this.authRepo.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await this.userRepo.createUser({
                first_name,
                last_name,
                email,
                phone_number,
                address
            });

            const userRoleId = await this.roleRepo.getRoleByName("user");

            const newCreds = await this.authRepo.createIdentity({
                username,
                password: hashedPassword,
                roleid: userRoleId,
                userid: newUser.id,
            });

            res.status(201).json([newUser, newCreds]);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Password validation function
    validatePassword(password) {
        const errors = [];
        const minLength = 8;
        const maxLength = 20;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumeric = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength || password.length > maxLength) {
            errors.push(`Password must be between ${minLength} and ${maxLength} characters long.`);
        }
        if (!hasUpperCase.test(password)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!hasLowerCase.test(password)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!hasNumeric.test(password)) {
            errors.push('Password must contain at least one numeric digit.');
        }
        if (!hasSpecialChar.test(password)) {
            errors.push('Password must contain at least one special character.');
        }

        return errors;
    }
}

export default AuthController;