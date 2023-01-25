const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    let token = getTokenFromCookie(req.headers.cookie);

    if (!token) {
        return res.status(403).send();
    }
    try {
        const isVerified = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(isVerified);
        req.user = isVerified;
    } catch (err) {
        return res.status(401).send();
    }
    next();
};

module.exports = { auth }