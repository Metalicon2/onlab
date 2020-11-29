import Head from "next/head";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Layouts/Header";
import "react-awesome-slider/dist/styles.css";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../public/styles/globalStyles.css";
import { handleAuth } from "../utils/handleAuth";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  componentStyle: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "rgb(240,240,240)",
  },
}));

let persistor = persistStore(store);

const App = ({ Component, pageProps, isTokenValid }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Foodster</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <CssBaseline />
        <Container maxWidth="lg" className={useStyle().root}>
          <Header isTokenValid={isTokenValid} />
          <div className={useStyle().componentStyle}>
            <Component {...pageProps} />
          </div>
        </Container>
      </PersistGate>
    </Provider>
  );
};

const makeStore = () => store;

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps: pageProps, isTokenValid: await handleAuth(ctx) };
};

export default withRedux(makeStore)(App);
