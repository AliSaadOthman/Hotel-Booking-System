import jwt from 'jsonwebtoken'

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.send(401).json({message: 'Access denied. No token provided'});
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Save the decoded payload to the request object
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

const authorizeUser = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
}

export { authenticateUser, authorizeUser };