const Routes = Object.freeze({
    Login: '/login',
    Register: '/register',

    MissionsOverview: '/missions',

    Users: '/users',
    UsersEdit: '/users/edit'
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /movies/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach(key => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { Routes };
