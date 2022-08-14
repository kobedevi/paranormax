import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import ProfileMissionsOverview from './ProfileMissionsOverview';

function Profile() {
    return (
        <Switch>
            <Route path={Routes.UsersEdit}>
                <ProfileMissionsOverview />
            </Route>
            <Redirect to={Routes.ProfileMissions} />
        </Switch>
    );
}

export default Profile