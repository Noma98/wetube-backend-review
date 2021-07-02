export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Review-tube";
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.loggedInUser = req.session.user || {};
    next();
};