import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from "@material-ui/core/TableContainer";
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Row from "./../components/OrderRow"
import SwipableManu from "../components/SwipableManu";
import {ThemeProvider} from "@material-ui/styles";
import Cookie from "js-cookie";
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
  card_grid: {
    marginTop: theme.spacing(3),
  },
}));

export default function OrdersPage() {

  const classes = useStyles();
  const [orders, setOrders] = useState([]);
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
    const res = await fetch("http://localhost:5000" + "/order", {
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
        setOrders((prevState) => {
          return [...data];
        });
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchUser().then(res => {
      fetchData()
    });
  },[]);

  function createData(row) {
    return {
      order_id: row.order_id,
      user_id: row.user_id,
      user_name: row.user_name,
      num_of_products: row.products.reduce((prev, cur) => prev+1,0),
      sum_of_prices: row.products.reduce((prev, cur) => prev+(Number(cur.product.price_per_unit) * Number(cur.amount)),0),
      date: row.date,
      products: row.products.map((order_product) => {
        return {
          product_id: order_product.product.id,
          name: order_product.product.name,
          amount: order_product.amount,
          price_per_unit: order_product.product.price_per_unit,
          unit: order_product.product.unit,
          price: order_product.product.price_per_unit * order_product.amount
        }
      })
    };
  }

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
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Historie objednávek
            </Typography>

            <TableContainer component={Paper} className={classes.paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell>Zákazník</TableCell>
                    <TableCell align="right">Počet produktů</TableCell>
                    <TableCell align="right">Celková cena</TableCell>
                    <TableCell align="right">Datum vytvoření</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
                    <Row key={row.order_id} row={createData(row)}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      }
    </div>
  );
}