import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from "./SignUp";
import Points from "./Points";
//<Route exact path="/Points_Tracking/" Component={SignUp} />


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path="/Points_Tracking/" Component={Points} />
            </Routes>
                 </Router>
    )

}

export default AppRouter