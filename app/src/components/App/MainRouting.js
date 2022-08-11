import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../core/routing';
import MissionsOverview from './Missions/MissionsOverview';


const MainRouting = () => {   
    
    return (
        <Switch>
            <Route path={Routes.MissionsOverview}>
                <MissionsOverview />
            </Route>
            <Redirect to={Routes.MissionsOverview} />
        </Switch>
    );
};

export default MainRouting;
