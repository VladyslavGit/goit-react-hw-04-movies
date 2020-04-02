import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import styles from "./App.module.css";

const MovieDetailsPage = lazy(() =>
  import("./movieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("./moviesPage/MoviesPage"));
const Navigation = lazy(() => import("./navigation/Navigation"));

const App = () => (
  <>
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </>
);

export default App;
