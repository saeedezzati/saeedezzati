// Components
import React, { Component, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";

const Home = (lazy(() => (import(/* webpackChunkName: "Home" */ "pages/home/containers/Home"))));
const Alien = (lazy(() => (import(/* webpackChunkName: "Alien" */ "pages/alien/containers/Alien"))));
const NotFound = (lazy(() => (import(/* webpackChunkName: "NotFound" */ "pages/notFound/containers/NotFound"))));

const styles = theme => ({
    root: {
        width: "100%"
    },
    loading: {
        height: "100vh"
    }
});

class RouterComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.root}>
                <Suspense fallback={<div className={classes.loading} />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/alien" component={Alien} />
                        <Route path="*" component={NotFound} />
                        {/* everything else goes to homepage for login */}
                        {/* <Redirect from='*' to='/' /> */}
                    </Switch>
                </Suspense>

            </main>
        );
    }

}
RouterComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RouterComponent);
