import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Pokemon from "pages/Pokemon";

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
}
