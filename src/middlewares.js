export const localsMiddleware = (req, res, next) => {
    console.log(req.session);
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.loggedInUser = req.session.user || {};
    next();
};