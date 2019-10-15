module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const jwt = require('jsonwebtoken');
    const authConfig = require('../../config/auth.json');
    if (!authHeader)
        return res.status(401).send({ error: 'No token Provided'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error'});

    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatado'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido'});

        req.userId = decoded.id;
        return next();
    });
};