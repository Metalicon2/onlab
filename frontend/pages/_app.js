import Head from "next/head";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Footer } from "../components/Layouts";
import "react-awesome-slider/dist/styles.css";
import {Context} from "../Context";
import { useState, useEffect } from "react";
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
}));

const App = ({ Component, pageProps }) => {

  const [user, setUser] = useState({});
  const [subCategory, setSubCategory] = useState("");
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || {});
    setCartArray(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const setUserFunc = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  const addCart = (item) => {
    const res = window.confirm("Are you sure?");
    if(res) {
      setCartArray(prevState => [...prevState, item]);
      localStorage.setItem("cart", JSON.stringify([...cartArray, item]));
    }
  }

  const removeCart = (item) => {
    const data = cartArray;
    const searchedIndex = data.findIndex(element => element.name === item.name);
    data.splice(searchedIndex,1);
    setCartArray(data);
    localStorage.setItem("cart", JSON.stringify(data));
  }

  const updateCart = (oldData, newData) => {
    const data = cartArray;
    const searchedOldIndex = data.findIndex(element => element.name === oldData.name);
    data[searchedOldIndex] = newData;
    setCartArray(data);
    localStorage.setItem("cart", JSON.stringify(data));
  }

  const resetCart = () => {
    setCartArray([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  return (
    <Provider store={store}>
      <Context.Provider value={{
        user: user,
        setUser: setUserFunc,
        subCategory: subCategory,
        setSubCategory: setSubCategory,
        cart: cartArray,
        addCart: addCart,
        removeCart: removeCart,
        updateCart: updateCart,
        resetCart: resetCart
      }}>
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
      </Context.Provider>
    </Provider>
  );
};

const makeStore = () => store;

App.getInitialProps = async ({Component, ctx}) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return {pageProps: pageProps} 
}

export default withRedux(makeStore)(App);
