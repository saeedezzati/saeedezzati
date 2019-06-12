// Components
import React, { Component } from "react";
import PropTypes from "prop-types";


import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        width: "100%"
    },
    mainColumn: {
        width: "100%",
        height: "100vh",
        fontSize: "calc(10em + 10vw)",
        fontFamily: "Monoton",
        textShadow: theme.palette.textShadow,
        color: theme.palette.primary.main
    },
    flicker: {
        animation: "$flicker 6s infinite step-end"
    },
    "@keyframes flicker": {
        "0%": { opacity: 1 },
        "3%": { opacity: 0.4 },
        "6%": { opacity: 1 },
        "7%": { opacity: 0.4 },
        "8%": { opacity: 1 },
        "9%": { opacity: 0.4 },
        "10%": { opacity: 1 },
        "89%": { opacity: 1 },
        "90%": { opacity: 0.4 },
        "100%": { opacity: 0.4 }
    }
});

class NotFoundPage extends Component {
    // componentDidMount() {
    // }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} container spacing={0} direction="row" justify="center" alignItems="center" className={classes.mainColumn}>
                    4<span className={classes.flicker}>0</span>4
                </Grid>
            </Grid>
        );
    }
}

NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(NotFoundPage);
