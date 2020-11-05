import Head from "next/head";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Footer } from "../components/Layouts";
import "react-awesome-slider/dist/styles.css";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
}));

let persistor = persistStore(store);

const App = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <CssBaseline />
        {console.log("itt?")}
        <Container maxWidth="lg" className={useStyle().root}>
          <Header style={{ flex: 1 }} />
          <div
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "rgb(245,231,194)",
              alignItems: "flex-start",
            }}
          >
            <Component {...pageProps} />
          </div>
          <Footer style={{ flex: 1 }} />
        </Container>
        </PersistGate>
    </Provider>
  );
};

const makeStore = () => store;

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps: pageProps }
}

export default withRedux(makeStore)(App);
