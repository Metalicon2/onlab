import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { deleteFromCartAction, updateCartAction } from "../redux/actions";
import RemoveIcon from "@material-ui/icons/Remove";
import API from "../utils/API";
import { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import { Cookies } from "react-cookie";
import TextField from "@material-ui/core/TextField";

const cookie = new Cookies();

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(230,230,230)",
  },
  firstChild: {
    flex: 15,
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    borderBottom: "1px solid gray",
  },
  secondChild: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    "& > div": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      fontSize: "20px",
      fontWeight: "500",
      color: "black",
      "&:first-child": {
        padding: "10px",
      },
    },
  },
  columns: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid grey",
    "& > div:nth-child(1)": {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "500",
      color: "black",
      borderBottom: "1px solid grey",
    },
    "& > div:nth-child(2)": {
      flex: 10,
    },
  },
  card: {
    minWidth: "20%",
    padding: "10px",
    margin: "5px",
    height: "13%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.5s ease-in-out",
    animation: "$grow 1s",
    "&:hover": {
      transform: "scale(1.03)",
    },
    "& > div:nth-child(1)": {
      flex: 1,
    },
    "& > div:nth-child(2)": {
      flex: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > div": {
        display: "flex",
        height: "100%",
        alignItems: "flex-end",
      },
    },
  },
  "@keyframes grow": {
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: "scale(1.02)",
    },
  },
  popoverRoot: {
    height: "400px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    "& > div": {
      height: "40px",
      minWidth: "100%",
      border: "1px solid gray",
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      cursor: "pointer",
      background: "white",
      "&:hover": {
        background: "rgb(63,81,181)",
        color: "white",
      },
    },
  },
  popoverRootOne: {
    height: "70px",
    width: "400px",
    display: "flex",
    alignItems: "center",
    "& > div": {
      margin: 0,
    },
  },
}));

const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const NewCart = ({ user, cart, deleteFromCartAction, updateCartAction }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElOne, setAnchorElOne] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [menuName, setMenuName] = useState(null);
  const open = Boolean(anchorEl);
  const openOne = Boolean(anchorElOne);
  const id = open ? "simple-popover" : undefined;
  const idOne = openOne ? "simple-popoverOne" : undefined;
  const [menuNameInputValue, setMenuNameInputValue] = useState(null);

  //show redux cart or show menu
  const currentCart = menuName
    ? menuList
        .find((menu) => menu.name === menuName)
        .MenuItems.map((menuItem) => ({
          ...menuItem.Food,
          quantity: menuItem.quantity,
        }))
    : cart.filter((cartItem) => cartItem.userId === user.id);

  const increaseQuantity = (food) => {
    const oldCartItem = currentCart.find((cartItem) => cartItem.id === food.id);
    const newCartItem = oldCartItem;
    ++newCartItem.quantity;
    !menuName && updateCartAction(oldCartItem, newCartItem);
  };

  const decreaseQuantity = (food) => {
    const oldCartItem = currentCart.find((cartItem) => cartItem.id === food.id);
    const newCartItem = oldCartItem;
    --newCartItem.quantity;
    !menuName && updateCartAction(oldCartItem, newCartItem);
  };

  const summaryPrice = () => {
    let tempPrice = 0;
    console.log(currentCart);
    currentCart.forEach(
      (cartItem) => (tempPrice += cartItem.price * cartItem.quantity)
    );
    return tempPrice;
  };

  const handleOrder = async () => {
    let orderArray = [];
    currentCart.forEach((item) => {
      const order = {
        userid: user.id,
        orderDate: new Date(), //item.date,
        quantity: item.quantity,
        foodid: item.id,
      };
      orderArray.push(order);
    });
    const res = await API.post("/order/new", orderArray, {
      headers: {
        Authorization: cookie.get("token", { path: "/" }) || null,
      },
    }).catch((err) => console.log(err));
    if (res.data.status == 200) {
      window.alert("Succesfull order!");
      !menuName &&
        currentCart.forEach((cartItem) => deleteFromCartAction(cartItem));
    } else {
      window.alert("Cannot make new order!");
    }
  };

  const getFavorites = async () => {
    const res = await API.get(`/menu/${user.id}`, {
      headers: {
        Authorization: cookie.get("token", { path: "/" }) || null,
      },
    });
    if (res?.data?.status === 200) {
      setMenuList(res.data.data);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleMenuSelect = (menuName) => {
    if (menuName === "show current Cart") {
      setMenuName(null);
    } else {
      setMenuName(menuName);
    }
  };

  const saveAsFavorite = async () => {
    let favoriteArray = [];
    currentCart.forEach((item) => {
      const order = {
        userid: user.id,
        name: menuNameInputValue,
        quantity: item.quantity,
        foodid: item.id,
      };
      favoriteArray.push(order);
    });
    console.log(favoriteArray);
    const res = await API.post("/menu/new", favoriteArray, {
      headers: {
        Authorization: cookie.get("token", { path: "/" }) || null,
      },
    }).catch((err) => console.log(err));
    if (res.data.status == 200) {
      window.alert("Succesfully saved!");
      getFavorites();
    } else {
      console.log(res);
      window.alert("Cannot save!");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.firstChild}>
        {columns.map((column, index) => (
          <div className={classes.columns} key={index}>
            <div>{column}</div>
            <div>
              {currentCart.map(
                (food) =>
                  food.availableDate === column && (
                    <Card className={classes.card} key={food.id}>
                      <div>
                        {food.name +
                          (food.quantity > 1 ? ` (${food.quantity})` : "")}
                      </div>
                      <div>
                        <img
                          src={food.src[0]}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10%",
                          }}
                        />
                        <div>
                          <div style={{ padding: "5px" }}>{food.price} Ft</div>
                          <div>
                            <IconButton
                              color="secondary"
                              aria-label="decrease"
                              style={{ padding: "5px" }}
                              onClick={() => decreaseQuantity(food)}
                              disabled={food.quantity <= 1 || menuName}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </div>
                          <div>
                            <IconButton
                              color="primary"
                              aria-label="increase"
                              style={{ padding: "5px" }}
                              onClick={() => increaseQuantity(food)}
                              disabled={menuName}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                          <div>
                            <IconButton
                              color="secondary"
                              aria-label="delete"
                              style={{ padding: "5px" }}
                              onClick={() =>
                                !menuName && deleteFromCartAction(food)
                              }
                              disabled={menuName}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.secondChild}>
        <div>Summary: {summaryPrice()} Ft</div>
        <div>
          <Button
            fullWidth
            style={{ height: "100%" }}
            variant="contained"
            color="primary"
            aria-describedby={id}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Saved menus
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div className={classes.popoverRoot}>
              <Card onClick={() => handleMenuSelect("show current Cart")}>
                {"show current Cart"}
              </Card>
              {menuList.map((menu, index) => (
                <Card key={index} onClick={() => handleMenuSelect(menu.name)}>
                  {menu.name}
                </Card>
              ))}
            </div>
          </Popover>
          <Button
            fullWidth
            style={{ height: "100%" }}
            variant="contained"
            color="primary"
            disabled={menuName}
            onClick={(e) => setAnchorElOne(e.currentTarget)}
          >
            Save as favorite
          </Button>
          <Popover
            id={idOne}
            open={openOne}
            anchorEl={anchorElOne}
            onClose={() => setAnchorElOne(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div className={classes.popoverRootOne}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Menu name"
                onChange={(e) => setMenuNameInputValue(e.target.value)}
                value={menuNameInputValue}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ height: "80%" }}
                onClick={saveAsFavorite}
                disabled={currentCart.length < 1}
              >
                Save
              </Button>
            </div>
          </Popover>
          <Button
            fullWidth
            style={{ height: "100%" }}
            variant="contained"
            color="secondary"
            onClick={() => handleOrder()}
            disabled={currentCart.length < 1}
          >
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  deleteFromCartAction: deleteFromCartAction,
  updateCartAction: updateCartAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCart);
