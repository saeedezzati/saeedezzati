import { connect } from "react-redux";
import { withRouter } from "react-router";
import HeaderComponent from "../components/HeaderComponent";
import { setAppState } from "actions/actions";

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    setAppState: (data => { dispatch(setAppState(data)); }),
    dispatch
});

const Header = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderComponent));

export default Header;
