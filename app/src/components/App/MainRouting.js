import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../core/routing';
import MissionsOverview from './Missions/MissionsOverview';
import Users from './Users/Users';


const MainRouting = () => {   
    
    return (
        <Switch>
            <Route path={Routes.MissionsOverview}>
                <MissionsOverview />
            </Route>
            <Route path={Routes.Users}>
                <Users/>
            </Route>
            <Redirect to={Routes.MissionsOverview} />
        </Switch>
    );
};

export default MainRouting;
