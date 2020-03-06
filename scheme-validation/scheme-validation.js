
const db = require('../schemes/scheme-model');

const validateId = (req, res, next) => {
    const id = req.params.id;
    db.findById(id)
        .then( resou => {
            if (resou) {
                req.resou = resou;
                next();
            } else {
                const err = new Error(`could not resolve id against database`);
                err.status(404);
                next(err);
            }
        })
        .catch( err => {
            next(err);
        })
}

module.exports = {
    validateId
}