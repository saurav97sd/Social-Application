module.exports.setFlash = function(req, res, next) {
    // fetching flesh message from req to res
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };

    next();
}