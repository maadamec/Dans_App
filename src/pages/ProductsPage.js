import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import MaterialTable from "material-table";
import StorefrontIcon from '@material-ui/icons/Storefront';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import SwipableManu from "../components/SwipableManu";
import Cookie from "js-cookie";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  }

}));

export default function ProductsPage() {
  const classes = useStyles();
  const [errors, setErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [columns, setColumns] = React.useState([
      { title: 'Název produktu', field: 'name' },
      { title: 'Cena za jednotku', field: 'price_per_unit', type: "numeric"},
      { title: 'jednotka', field: 'unit'}
    ]);
  const [tableData, setTableDate] = React.useState([]);
  const [popperState, setPopperState] = React.useState({
      text: "",
      severity: "",
      open: false
  });
  const [user, setUser] = useState({admin: false, delivery_address: "", email: "", id: "", invoice_address: "", name: "", note: "", phone: "", registered_on: ""})

  async function fetchUser() {
    const res = await fetch("http://localhost:5000" + "/auth/status", {
     method: 'get',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token")
       })}
    );
    res
      .json()
      .then(res => {
        if(res.data === undefined){
          window.location.href = '/login'
        } else {
          setUser(res.data);
        }
      })
      .catch(err => console.log(err));

    console.log(user);
  }

  async function fetchData() {
    const res = await fetch("http://localhost:5000" + "/product", {
     method: 'get',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token")
       })}
    );
    res
      .json()
      .then(res => {
        let data = res.data
        console.log(data);
        setTableDate((prevState) => {
          return [...data];
        });
      })
      .catch(err => setErrors(err));
  }

  async function addProduct(product, resolve, reject) {
    const res = await fetch("http://localhost:5000" + "/product", {
     method: 'post',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token"),
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify(product)}
    );

    res
      .json()
      .then(ress => {
        console.log(ress);
        if(ress !== undefined && ress.status === 'success'){
          setTableDate([...tableData, {...product, 'id': ress.product_id}]);
          setPopperState({severity: "success", open: true, text: "Product added successfully"});
        } else {
          throw new Error("Error.");
        }
        resolve();
      })
      .catch(err => {reject();
        setPopperState({severity: "error", open: true, text: "Product cant be added"});});
  }

  async function removeProduct(product) {
    const res = await fetch("http://localhost:5000" + "/product/" + product.id, {
        method: 'delete',
        headers: new Headers({
          'Accept': '*/*',
          'Cache-Control': 'no-cache',
          'Authorization': 'Bearer ' + Cookie.get("token"),
        })
      }
    );

    res
      .json()
      .then(ress => {
        console.log(ress);
        if(ress !== undefined && ress.status === 'success'){
          setPopperState({severity: "success", open: true, text: "Product removed successfully"});
        } else {
          throw new Error("Error.");
        }
      })
      .catch(err => {
        setPopperState({severity: "error", open: true, text: "Product cant be removed"});
      });
  }

  async function updateProduct(product) {
    const res = await fetch("http://localhost:5000" + "/product", {
     method: 'put',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token"),
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify(product)}
    );

    res
      .json()
      .then(res => {
        setPopperState({severity: "success", open: true, text: "Product updated successfully"});
      })
      .catch(err => {
          throw new Error("Error.");
      });
  }

  useEffect(() => {
    fetchUser().then(res => {fetchData()})
    setLoading(false);
  },[loading]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPopperState({...popperState, open: false});
  };

  return (
    <div>
      <SwipableManu admin={user.admin}/>
      {user.id === "" ?
        <div style={{height: '90vh', margin: 0, padding: 0}}>
          <Box display='flex' flex='1' justifyContent='center' alignItems="center" style={{height: '90vh'}}>
            <CircularProgress size={50}/>
          </Box>
        </div>
        :
        <Container component="main">
          <Snackbar open={popperState.open} autoHideDuration={1000} onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={popperState.open} severity={popperState.severity} variant="filled">
              {popperState.text}
            </Alert>
          </Snackbar>

          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <StorefrontIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Produkty
            </Typography>

            <Divider t={4} style={{marginTop: 50}}/>

            <MaterialTable
              title="Produkty"
              columns={columns}
              data={tableData}
              style={{width: '75%', alignItems: 'center'}}
              editable={{
                onRowAdd: newData =>
                  new Promise(async (resolve, reject) => {
                    addProduct(newData, resolve, reject);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    let res = updateProduct(newData);
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setTableDate((prevState) => {
                          const data = [...prevState];
                          data[data.indexOf(oldData)] = newData;
                          return data;
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    let res = removeProduct(oldData);
                    setTimeout(() => {
                      resolve();

                      setTableDate((prevState) => {
                        const data = [...tableData];
                        data.splice(data.indexOf(oldData), 1);
                        return data;
                      });
                    }, 600);
                  }),
              }}
            />
          </div>
        </Container>
      }
    </div>
  );
}