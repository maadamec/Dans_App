import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SwipableManu from "../components/SwipableManu";
import Cookie from "js-cookie"
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
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

  useEffect(() => {
    fetchUser();
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
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FaceIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Profil
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Emailová Adresa"
                    name="email"
                    autoComplete="email"
                    disabled={!editing}
                    value={user.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="companyName"
                    variant="outlined"
                    required
                    fullWidth
                    id="companyName"
                    label="Název společnosti"
                    autoFocus
                    disabled={!editing}
                    value={user.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="phone"
                    name="phone"
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Telefonní číslo"
                    disabled={!editing}
                    defaultValue={user.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="invoice_address"
                    variant="outlined"
                    required
                    fullWidth
                    id="invoice_address"
                    label="Fakturační Addresa"
                    disabled={!editing}
                    defaultValue={user.invoice_address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="delivery_address"
                    variant="outlined"
                    required
                    fullWidth
                    id="delivery_address"
                    label="Dodací Addresa"
                    disabled={!editing}
                    defaultValue={user.delivery_address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="note"
                    name="note"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={5}
                    id="note"
                    label="Poznámka"
                    disabled={!editing}
                    defaultValue={user.note}
                  />
                </Grid>
              </Grid>
              {
                editing ?
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setEditing(false)}
                  >
                    Uložit změny
                  </Button>
                  :
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setEditing(true)}
                  >
                    Upravit
                  </Button>
              }
            </form>
          </div>
        </Container>
      }
    </div>
  );
}