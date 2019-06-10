import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// The Header creates links that can be used to navigate
// between routes.

// const SelectableList = makeSelectable(List);

const styles = theme => ({
    root: {
        width: "100%",
        zIndex: 1250

    }

});
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            </div>
        );

    }
}
HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired

};
export default withStyles(styles, { withTheme: true })(HeaderComponent);
