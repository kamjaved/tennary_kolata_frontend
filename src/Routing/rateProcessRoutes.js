import React from "react";
import PrivateRoute from "./PrivateRoute";

import GlobalRateCard from "../component/Pages/GlobalPrice/GlobalRateCard";
import AddGlobalRate from "../component/Pages/GlobalPrice/addGlobalRate";
import EditGlobalRate from "../component/Pages/GlobalPrice/editGlobalRate";


const Routes = () => {
    return (
        <React.Fragment>
            <PrivateRoute exact path="/global-price" component={GlobalRateCard} />
            <PrivateRoute exact path="/add/global-price" component={AddGlobalRate} />
            <PrivateRoute exact path="/edit/global-price/:id" component={EditGlobalRate} />

        </React.Fragment>
    );
}



export default Routes;
