import MaterialTable from "material-table";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { deleteFromCartAction, updateCartAction, resetCartAction } from "../redux/actions";
import API from "../utils/API";

const Cart = ({user, cart, deleteFromCartAction, updateCartAction, resetCartAction}) => {

  const [state, setState] = useState({
    columns: [
      {
        field: 'url',
        title: 'Icon',
        editable: "never",
        render: rowData => <img src={rowData.src} style={{ width: 50, height: 50, borderRadius: '10%' }} />
      },
      { title: "Food", field: "name", editable: "never" },
      { title: "Quantity", field: "quantity" },
      { title: "Price", field: "price", editable: "never" },
      { title: "Date", field: "date", type: "date" },
    ],
    data: [...cart],
  });

  const orderHandler = async () => {
    let orderArray =  [];
    if(cart.length > 0){
      cart.map((item) => {
        const order = {
          userid: user.id,
          orderDate: item.date,
          quantity: item.quantity,
          foodid: item.id
        }
        orderArray.push(order);
      });
      const res = await API.post("/order/new", orderArray).catch(err => console.log(err));
      if(res.data.status == 200){
        window.alert("Succesfull order!");
        const data = [];
        setState(prevState => {return {...prevState, data}});
        resetCartAction();
      }else{
        window.alert("Cannot make new order!");
      }
    }else{
      window.alert("The cart is empty!");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "800px", overflowY: "auto" }}>
      <MaterialTable
        title="Cart"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];;
                    if (Date.parse(newData.date) <= Date.parse(oldData.date)) {
                      window.alert("You cannot set older date than today!");
                      return { ...prevState, data };
                    } else {
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    }
                  });
                  if(Date.parse(newData.date) >= Date.parse(oldData.date)){
                    updateCartAction(oldData, newData)
                  }
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
                deleteFromCartAction(oldData);
              }, 600);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 11,
          pageSizeOptions: [10]
        }}
      />
      {
        user.email && <div style={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
          <Button style={{ flex: 1 }} variant="contained" color="primary" onClick={() => orderHandler()}>
            Order
        </Button>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = {
  deleteFromCartAction: deleteFromCartAction,
  updateCartAction: updateCartAction,
  resetCartAction: resetCartAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
