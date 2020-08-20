function midlewareToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.sendStatus(401);
    }

}

export default midlewareToken;