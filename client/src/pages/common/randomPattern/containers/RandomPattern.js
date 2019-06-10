import { connect } from "react-redux";
import { withRouter } from "react-router";
import RandomPatternComponent from "../components/RandomPatternComponent";
import { setAppState } from "actions/actions";

const mapStateToProps = (state, ownProps) => ({
    seed: ownProps.seed
});


const mapDispatchToProps = dispatch => ({
    setAppState: (data => { dispatch(setAppState(data)); }),
    dispatch
});

const RandomPattern = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(RandomPatternComponent));

export default RandomPattern;
