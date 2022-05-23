import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

export function Routes() {
  return (
    <Router >
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
}
