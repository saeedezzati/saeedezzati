// Components
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { LogoIcon } from "icons/CommonIcons";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    root: {
        height: "100vh",
        userSelect: "none"
    },
    flashWrapper: {
        height: 80,
        width: 80,
        cursor: "default",
        animation: "$flicker 6s infinite step-end",
        filter: theme.palette.iconShadow,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    flash: {
        height: 80,
        width: 80
    },
    "@keyframes shake": [...new Array(10).keys()].reduce((acc, index) => {
        acc[`${index * 2.5}%`] = {
            transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
        };
        return acc;

    }, {
        "100%": {
            transform: "rotate(0deg)"
        }
    }),
    "@keyframes flicker": {
        "0%": { opacity: 1 },
        "3%": { opacity: 0.4 },
        "6%": { opacity: 1 },
        "7%": { opacity: 0.4 },
        "8%": { opacity: 1 },
        "9%": { opacity: 0.2, cursor: "pointer" },
        "15%": { opacity: 1, cursor: "default" },
        "89%": { opacity: 1 },
        "90%": { opacity: 0.4 },
        "100%": { opacity: 0.4 }
    }
});


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.logoNode = React.createRef();

        this.state = {

        };
    }
    componentDidMount() {
        const { history } = this.props;
        if (location.pathname !== "/") {
            history.push("/");
        }
    }
    handleFlashClick = () => {
        const { history } = this.props;
        if (window.getComputedStyle(this.logoNode.current).opacity < 0.3) {
            history.push("/alien");
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={0} justify={"center"} alignItems={"center"} className={classes.root}>
                <IconButton disableRipple ref={this.logoNode} onClick={this.handleFlashClick} className={classes.flashWrapper}>
                    <LogoIcon viewBox={"0 0 512 512"} className={classes.flash} />
                </IconButton>
            </Grid>
        );
    }
}
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(HomePage);
