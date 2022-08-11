import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import EditUser from './EditUser';

function Users() {
    return (
        <Switch>
            <Route path={Routes.UsersEdit}>
                <EditUser />
            </Route>
            <Redirect to={Routes.UsersEdit} />
        </Switch>
    );
}

export default Users