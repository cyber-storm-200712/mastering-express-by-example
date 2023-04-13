module.exports = function restrictAccess(req, res, next) {
    const ip = req.ip;

    if(ip === '127.0.0.1' || /^192\.168\./.test(ip) || '::1') {
        next()
    }
    else {
        res.status(403).send(`Forbidden IP address! (${req.socket.remoteAddress})`)
    }
}