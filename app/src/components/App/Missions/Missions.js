import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import MissionsOverview from './MissionsOverview';

const Movies = () => {
    return (
        <Switch>
            <Route path={Routes.MissionsOverview}>
                <MissionsOverview />
            </Route>
            <Redirect to={Routes.Movies} />
        </Switch>
    );
};

export default Movies;
