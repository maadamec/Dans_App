import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OrderProductCard from "../components/OrderProductCard";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    display: "flex",
    justify: "flex-start",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NewOrderPage() {
  const classes = useStyles();
  const [payment, setPayment] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  function onChangeV(x) {
    console.log(x);
  }
  const getProducts = () => {
    var res = []
    for (var i = 0; i < 5; i++) {
        res.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <OrderProductCard imageurl={'vegetablebox.png'} description={'Description'} title={'Title'} units={'ks'} value={5} onChange={onChangeV}/>
              </Grid>)
    }
    return res
  }
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Nová objednávka
          </Typography>
          <form className={classes.form} noValidate>

            <Grid container spacing={2} justify="center" >
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" align={"left"}>
                  Výběr produktů
                </Typography>
              </Grid>
              {getProducts()}
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" align={"left"}>
                  Informace k objednánce
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl} required>
                  <InputLabel id="order-type-label">Typ objednavky</InputLabel>
                  <Select
                    labelId="order-type"
                    id="order-type"
                    value={orderType}
                    label="Typ objednavky"
                    onChange={(event) => {setOrderType(event.target.value)}}
                  >
                    <MenuItem value={1}>Jednorazova</MenuItem>
                    <MenuItem value={2}>Opakujici se</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl} required>
                  <TextField
                    id="date"
                    label="Datum doručení"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0,10)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl} required>
                  <InputLabel id="payment-label">Zpusob platby</InputLabel>
                  <Select
                    labelId="payment"
                    id="payment"
                    value={payment}
                    label="Zpusob platby"
                    onChange={(event) => {setPayment(event.target.value)}}
                  >
                    <MenuItem value={1}>Kartou</MenuItem>
                    <MenuItem value={2}>Hotovost</MenuItem>
                    <MenuItem value={3}>Faktura</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl} required>
                  <InputLabel id="delivery-time-label">Cas doruceni</InputLabel>
                  <Select
                    labelId="delivery-time"
                    id="delivery-time"
                    value={deliveryTime}
                    label="Cas doruceni"
                    onChange={(event) => {setDeliveryTime(event.target.value)}}
                  >
                    <MenuItem value={1}>Dopoledne</MenuItem>
                    <MenuItem value={2}>Poledne</MenuItem>
                    <MenuItem value={3}>Odpoledne</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    variant="outlined"
                    label="Poznamka"
                    fullWidth
                    multiline
                    rows={4}
                    name="Poznamka"
                    type="note"
                    id="note"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ulozit
            </Button>

          </form>
        </div>
      </Grid>


    </Container>
  );
}