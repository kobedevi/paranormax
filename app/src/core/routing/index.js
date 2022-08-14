const Routes = Object.freeze({
    Login: '/login',
    Register: '/register',

    MissionsOverview: '/missions',
    MissionCreate: '/missions/create',
    MissionDetail: '/missions/:id',

    Profile: '/user',
    ProfileMissions: '/user/missions',
    ProfileEdit: '/user/edit',

    History: '/history',
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
