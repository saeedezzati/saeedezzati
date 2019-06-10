import { connect } from "react-redux";
import { withRouter } from "react-router";
import AlienPage from "../components/AlienPage";
import { setAppState } from "actions/actions";


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    setAppState: (data => { dispatch(setAppState(data)); }),
    dispatch
});

const Alien = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AlienPage));


export default Alien;
