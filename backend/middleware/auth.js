/**
 * @name checkAuthenticated
 * @param  {Request} req - The request object
 * @param  {Response} res - The response object
 * @param  {NextFunction} next - The function to execute after this one
 * @returns null
 * @description This function checks if the user is authenticated
 */
exports.checkAuthenticated = (req, res, next) => {
    //Checks if the user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

/**
 * @name checkNotAuthenticated
 * @param  {Request} req - The request object
 * @param  {Response} res - The response object
 * @param  {NextFunction} next - The function to execute after this one
 * @returns null
 * @description This function checks if the user is not authenticated
 */
exports.checkNotAuthenticated = (req, res, next) => {
    //Checks if the user is authenticated
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}