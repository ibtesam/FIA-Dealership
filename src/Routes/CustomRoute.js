import {Route} from "react-router";

// import { APP_NAME_MINI } from "../Constants/constant";
import useDocumentTitle from "../CustomHooks/useDocumentTitle";

const CustomRoute = (props) => {
    useDocumentTitle(props.title);
    return <Route {...props} />;
};

export default CustomRoute;
