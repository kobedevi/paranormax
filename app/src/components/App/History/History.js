import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from '../../../core/routing';
import HistoryMissions from "./HistoryMissions";

const History = () => {
    return (
        <Switch>
            <Route path={Routes.History}>
                <HistoryMissions />
            </Route>
            <Redirect to={Routes.History} />
        </Switch>
    );
}

export default History