import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../../utils/PrivateRoute";

import ProcessMainPage from "./ProcessMainPage";

const Routes = () => {
    return (
        <React.Fragment>
            <Switch>
                <PrivateRoute exact path="/process/:id/:processId/" component={ProcessMainPage} />

            </Switch>
        </React.Fragment>
    );
}



export default Routes;
