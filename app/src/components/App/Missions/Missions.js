import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import MissionCreate from './MissionsCreate';
import MissionsDetail from './MissionsDetail';
import MissionsOverview from './MissionsOverview';

const Missions = () => {
    return (
        <Switch>
            <Route path={Routes.MissionCreate}>
                <MissionCreate />
            </Route>
            <Route path={Routes.MissionDetail}>
                <MissionsDetail />
            </Route>
            <Route path={Routes.MissionsOverview}>
                <MissionsOverview />
            </Route>
            <Redirect to={Routes.MissionsOverview} />
        </Switch>
    );
};

export default Missions;
