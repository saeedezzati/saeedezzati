import { connect } from "react-redux";
import { withRouter } from "react-router";
import RouterComponent from "../components/RouterComponent";


const mapStateToProps = state => ({
});


const Router = withRouter(connect(mapStateToProps)(RouterComponent));

export default Router;
