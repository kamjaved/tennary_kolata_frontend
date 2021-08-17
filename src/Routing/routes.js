import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Register from '../component/Pages/Authorization/Register'
import Login from '../component/Pages/Authorization/Login'



import ManufacturerView from "../component/Pages/Manufacturer/manufacturerView";

import ProcessCard from "../component/Pages/Process/processCard";
import RateProcessRoutes from "./rateProcessRoutes";

import SplittingView from "../component/Pages/Process/ProcessTable/splittingView";
import SplittingEdit from "../component/Pages/Process/ProcessForm/splittingEdit";
import SplittingAdd from "../component/Pages/Process/ProcessForm/splittingAdd";

import DryDrumView from "../component/Pages/Process/ProcessTable/drydrumView";
import DryDrumAdd from '../component/Pages/Process/ProcessForm/drydrumAdd'
import DryDrumEdit from '../component/Pages/Process/ProcessForm/drydrumEdit'
const Routes = () => {
    return (
        <React.Fragment>



            <Switch>

                <PrivateRoute path="/manufacturer" component={ManufacturerView} />
                <PrivateRoute exact path="/process" component={ProcessCard} />



                {/** SPLITTING----ROUTES--- */}

                <PrivateRoute path={`/edit-splitting/:id`} component={SplittingEdit} />
                <PrivateRoute path={`/add-splitting/:id`} component={SplittingAdd} />
                <PrivateRoute path="/Splitting/:processid" component={SplittingView} />

                {/** DRYDRUM----ROUTES--- */}

                <PrivateRoute path="/Dry-Drum/:processid" component={DryDrumView} />
                <PrivateRoute path={`/add-drydrum/:id`} component={DryDrumAdd} />
                <PrivateRoute path={`/edit-drydrum/:id`} component={DryDrumEdit} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <RateProcessRoutes />
            </Switch>
        </React.Fragment>
    );
}



export default Routes;
