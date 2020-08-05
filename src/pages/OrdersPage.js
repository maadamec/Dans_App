import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OrderCard from "../components/OrderCard";

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
  card_grid: {
    marginTop: theme.spacing(3),
  }
}));

export default function OrdersPage() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingBasketIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Historie objednávek
        </Typography>

        <Grid container spacing={3} className={classes.form} >
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
          <Grid item xs={12}>
            <OrderCard/>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}