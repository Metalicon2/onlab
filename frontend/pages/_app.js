import Head from "next/head";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Footer } from "../components/Layouts";
import "react-awesome-slider/dist/styles.css";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
}));

const App = ({ Component, pageProps }) => {
  return (
    <>
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
      <Container maxWidth="lg" className={useStyle().root}>
        <Header style={{ flex: 1 }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            backgroundColor: "#E8E8E8",
            alignItems: "flex-start",
          }}
        >
          <Component {...pageProps} />
          </div>
        <Footer style={{ flex: 1 }} />
      </Container>
    </>
  );
};

export default App;
