import Head from "next/head";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Footer } from "../components/Layouts";

const useStyle = makeStyles(() => ({
  root: {
    position: "relative",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 0
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
      <Container maxWidth="maxWidth" className={useStyle().root}>
        <Header />
        <div style={{display: "flex", flexGrow: 1, backgroundColor: "#E8E8E8"}}>
            <Component {...pageProps}/>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default App;
