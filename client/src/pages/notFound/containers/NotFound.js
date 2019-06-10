import { connect } from "react-redux";
import { withRouter } from "react-router";
import NotFoundPage from "../components/NotFoundPage";
import { setAppState } from "actions/actions";


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    setAppState: (data => { dispatch(setAppState(data)); }),
    dispatch
});

const NotFound = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotFoundPage));


export default NotFound;
