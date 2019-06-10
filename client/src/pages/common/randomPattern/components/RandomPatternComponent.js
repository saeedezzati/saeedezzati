import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

// The Header creates links that can be used to navigate
// between routes.

// const SelectableList = makeSelectable(List);

const styles = theme => ({
    root: {
    }
});
class RandomPatternComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, theme, seed } = this.props;

        return (
            <svg width="80" height="80" className={classes.root}>
                <pattern id={`random-pattern-${seed}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" >
                    {new Array(64).fill(1).map((value, index) => <rect key={index} x={Math.floor(index / 8) * 10} y={(index % 8) * 10} width="10" height="10" fill={Math.random() < 0.5 ? theme.palette.primary.main : theme.palette.secondary.main} />)}
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" stroke={theme.palette.primary.main} fill={`url(#random-pattern-${seed})`} />
            </svg>
        );

    }
}
RandomPatternComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    seed: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired

};
export default withStyles(styles, { withTheme: true })(RandomPatternComponent);
