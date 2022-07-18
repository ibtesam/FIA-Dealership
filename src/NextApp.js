import "antd/dist/antd.min.css";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {FullPageLoader} from "./Components";
import MainApp from "./Containers/App/MainApp";
import {useHistory} from "react-router";
import UnAuthenticatedApp from "./Routes/unauthenticated-app-routes";
import AuthService from "./Utils/auth.service";
import {BrowserRouter} from "react-router-dom";

const isTokenExist = AuthService.isTokenExist();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const RegisterRoutes = () => {
  if (isTokenExist) {
    return <MainApp />;
  } else {
    return <UnAuthenticatedApp />;
  }
};

const App = () => (
  <React.Suspense fallback={<FullPageLoader />}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{RegisterRoutes()}</BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  </React.Suspense>
);

const NextApp = () => {
  return <App />;
};

export default NextApp;
