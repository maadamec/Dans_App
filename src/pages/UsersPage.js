import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import MaterialTable from "material-table";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SwipableManu from "../components/SwipableManu";
import Cookie from 'js-cookie'
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  },
  column: {
    flexBasis: '33.33%',
  },

}));

export default function UserPage() {
  const classes = useStyles();
  const [errors, setErrors] = React.useState(null)
  const [columns, setColumns] = React.useState([
      { title: 'Název restaurace', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Fakturační adresa', field: 'invoice_address'},
      { title: 'Dodací adresa', field: 'delivery_address'},
      { title: 'Telefon', field: 'phone_number'},
      { title: 'Poznámka', field: 'note'},
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
    const res = await fetch("http://localhost:5000" + "/user", {
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPopperState({...popperState, open: false});
  };

  async function addUser(user, resolve, reject) {
    const res = await fetch("http://localhost:5000" + "/user", {
     method: 'post',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token"),
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify(user)}
    );

    res
      .json()
      .then(ress => {
        console.log(ress);
        if(ress !== undefined && ress.status === 'success'){
          setTableDate([...tableData, {...user, 'id': ress.user_id}]);
        }
        resolve();
      })
      .catch(err => {reject()});
  }

  async function removeUser(user) {
    const res = await fetch("http://localhost:5000" + "/user/" + user.id, {
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
      .then(res => {
        console.log(res)
      })
      .catch(err => setErrors(err));
  }

  async function updateUser(user) {
    const res = await fetch("http://localhost:5000" + "/user", {
     method: 'put',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer ' + Cookie.get("token"),
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify(user)}
    );

    res
      .json()
      .then(res => {
        console.log(res)
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchUser().then((res) => {fetchData()});
  },[]);


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
          <CssBaseline/>
          <Snackbar open={popperState.open} autoHideDuration={1000} onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert severity={popperState.severity} variant="filled">
              {popperState.text}
            </Alert>
          </Snackbar>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <StorefrontIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Uživatelé
            </Typography>

            <Divider t={4} style={{marginTop: 50}}/>

            <MaterialTable

              title="Uživatelé"
              columns={columns}
              data={tableData}
              style={{width: '75%', alignItems: 'center'}}
              editable={{
                onRowAdd: newData =>
                  new Promise(async (resolve, reject) => {
                    if ((newData.name === undefined) || (newData.email === undefined)) {
                      setPopperState({severity: "warning", open: true, text: "You need to specify name and email"})
                      reject();
                    } else {
                      addUser(newData, resolve, reject).then(
                        setPopperState({severity: "success", open: true, text: "User added successfully."})
                      );
                    }
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    let res = updateUser(newData);
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
                    setPopperState({severity: "success", open: true, text: "User updated successfully."})
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    let res = removeUser(oldData);
                    setTimeout(() => {
                      resolve();

                      setTableDate((prevState) => {
                        const data = [...tableData];
                        data.splice(data.indexOf(oldData), 1);
                        return data;
                      });
                    }, 600);
                    setPopperState({severity: "success", open: true, text: "User deleted successfully."})
                  }),
              }}
            />
          </div>
        </Container>
      }
    </div>

  );
}