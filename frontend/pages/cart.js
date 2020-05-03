import MaterialTable from "material-table";

const Cart = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Food", field: "name" },
      { title: "Price", field: "price" },
      { title: "Date", field: "date", type: "date" },
    ],
    data: [
      { name: "Pizza Maggio", price: "1800", date: "1987.01.01" },
      { name: "Ananas", price: "1000", date: "1987.02.03" },
    ],
  });

  return (
    <div style={{ flex: 1, alignSelf: "center"}}>
      <MaterialTable
        title="Cart"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
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
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default Cart;
