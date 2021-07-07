import User from './models/User';

export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Review-tube";
    res.locals.loggedIn = req.session.loggedIn || false;
    res.locals.loggedInUser = req.session.user || {};
    next();
};
export const loggedInOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.render("screens/403");
    }
    next();
}
export const publicOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return res.render("screens/403");
    }
    next();
}
export const ownerOnlyMiddleware = async (req, res, next) => {
    const userId = req.params.id;
    if (req.session.user.userId !== userId) {
        return res.render("screens/403");
    }
    next();
}