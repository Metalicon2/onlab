import MaterialTable from "material-table";
import { useState } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { deleteFromCartAction, updateCartAction } from "../redux/actions";

const Cart = ({user, cart, deleteFromCartAction, updateCartAction}) => {

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
                    const data = [...prevState.data];
                    if (newData.date <= oldData.date) {
                      window.alert("You cannot set older date than today!");
                      return { ...prevState, data };
                    } else {
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    }
                  });
                  if(newData.date >= oldData.date){
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
                  console.log("render");
                  return { ...prevState, data };
                });
                deleteFromCartAction(oldData);
              }, 600);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 12,
          pageSizeOptions: [10]
        }}
      />
      {
        user.email && <div style={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
          <Button style={{ flex: 1 }} variant="contained" color="primary">
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
  updateCartAction: updateCartAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
