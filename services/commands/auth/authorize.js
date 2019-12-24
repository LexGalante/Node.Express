const expressJwt = require('express-jwt');
const _ = require('lodash');

module.exports = (roles) => {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: process.env.JWT_SECRET }),
        // authorize based on user role
        (req, res, next) => {
            let authorized = false;

            _.forEach(roles, (role, index) => {
                if (req.user.role.includes(role)) {
                    authorized = true;
                    next();
                }
            });

            //when role not found in user roles
            if (!authorized)
                return res.status(401).json({ message: 'Unauthorized' });
        }
    ];
}