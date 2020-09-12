import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookie from 'js-cookie'
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [popperState, setPopperState] = React.useState({
      text: "",
      severity: "",
      open: false
  });

  const handleChangeEmail = (event) => {
    setEmail( event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword( event.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPopperState({...popperState, open: false});
  };

  async function sendLoginRequest() {
    const res = await fetch("http://localhost:5000" + "/auth/login", {
     method: 'post',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify({
        'email': email.toLowerCase(),
        'password': password
        })
      })

    res.json()
      .then(res => {
        if(res.status === "success" && res.auth_token !== undefined){
          Cookie.set("token", res.auth_token);
          window.location.href='/'
        } else {
          setPopperState({severity: "error", open: true, text: res.message});
        }
        console.log(res)
      })
    };

  const handleSubmit = (event) => {
    sendLoginRequest()
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar open={popperState.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={popperState.open} severity={popperState.severity} variant="filled">
          {popperState.text}
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingBasketIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Přihlášení
        </Typography>
        <form className={classes.form} noValidate >
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
                onChange={handleChangeEmail}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Heslo"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Přihlásit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Ještě nemáte účet? Vytvořte si ho.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>

  );
}