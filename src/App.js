import React, { useEffect } from "react";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";


import EmbedSideNav from './component/UI/EmbedSideNav'


if (localStorage.token) {
  setAuthToken(localStorage.token);
}



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <React.Fragment>
        <EmbedSideNav />
      </React.Fragment>
    </Provider>
  );
};

export default App;
