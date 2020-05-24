import MaterialTable from "material-table";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import Button from '@material-ui/core/Button';

const Cart = () => {

  const {cart, removeCart, updateCart, user} = useContext(Context);

  const [state, setState] = useState({
    columns: [
      {field: 'url',
        title: 'Icon',
        editable: "never",
        render: rowData => <img src="/static/images/pizza1.jpg" style={{width: 50, borderRadius: '75%'}}/>},
      { title: "Food", field: "name", editable: "never"},
      { title: "Quantity", field: "quantity"},
      { title: "Price", field: "price", editable: "never"},
      { title: "Date", field: "date", type: "date" },
    ],
    data: [...cart],
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(data);
    setState(prevState => {return {...prevState, data}});
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "800px", overflowY: "auto"}}>
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
                    if(newData.date < oldData.date){
                      return { ...prevState, data };
                    }else{
                      updateCart(oldData, newData);
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    }
                  });
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
                  removeCart(oldData);
                  return { ...prevState, data };
                });
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
      user.email && <div style={{flex: 1, display: "flex", alignItems: "flex-start"}}>
        <Button style={{flex: 1}} variant="contained" color="primary">
          Order
        </Button>
      </div>
      }   
    </div>
  );
};

export default Cart;
