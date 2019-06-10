import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomePage from "../components/HomePage";
import { setAppState } from "actions/actions";


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    setAppState: (data => { dispatch(setAppState(data)); }),
    dispatch
});

const Home = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage));


export default Home;
