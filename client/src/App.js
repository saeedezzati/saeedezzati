// Components
import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "common/header/containers/Header";
import Router from "router/containers/Router";

const theme = createMuiTheme({
    palette: {
        common: {
            black: "#29344b",
            white: "#FED128"
        },
        primary: {
            light: "#ffff62",
            main: "#FED128",
            dark: "#c7a000",
            contrastText: "#29344b"
        },
        secondary: {
            light: "#535d77",
            main: "#29344b",
            dark: "#000d23",
            contrastText: "#FED128"
        },
        error: {
            light: "#fa5788",
            main: "#c2185b",
            dark: "#8c0032",
            contrastText: "#fafafa"
        },
        success: {
            light: "#33ab9f",
            main: "#009688",
            dark: "#00695f",
            contrastText: "#fafafa"
        },
        text: {
            primary: "#FED128",
            secondary: "#29344b"
            // disabled: "rgba(0, 0, 0, 0.38)",
            // hint: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            paper: "#fafafa",
            default: "#29344b"
        },
        divider: "rgba(0, 0, 0, 0.12)",
        textShadow: "0 0 50px #FA1C16, 0 0 20px #FA1C16, 0 0 30px #FA1C16, 0 0 10vw #FA1C16, 0 0 20px #FED128, 5px 5px 0px #806914",
        iconShadow: "drop-shadow(0 0 5px #FA1C16) drop-shadow(0 0 10px #FA1C16) drop-shadow(0 0 200px #FED128) drop-shadow(0 0 0px #806914)"
    }
    // breakpoints: {
    // 	values: {xxs:0, xs:320, sm:600, md:960, lg:1280, xl:1440, xxl:1920},
    // },

});
const styles = _theme => ({
    root: {
        width: "100%"
        // backgroundColor: theme.palette.primary.main,
    }

});

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Header />
                    <Router />
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(App);
