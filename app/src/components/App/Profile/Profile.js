import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import BecomeMedium from './BecomeMedium';
import ProfileMissionsOverview from './ProfileMissionsOverview';

function Profile() {
    return (
        <Switch>
            <Route path={Routes.ProfileMissions}>
                <ProfileMissionsOverview />
            </Route>
            <Route path={Routes.ProfileMedium}>
                <BecomeMedium />
            </Route>
            <Redirect to={Routes.ProfileMissions} />
        </Switch>
    );
}

export default Profile