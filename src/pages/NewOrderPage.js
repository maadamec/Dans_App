import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import { indigo } from '@material-ui/core/colors';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import EnhancedTableHead from "../components/EnhancedTableHead";
import SwipableManu from "../components/SwipableManu";
import Cookie from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: indigo[500],
    },
  },
});

const removeButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: red.A400,
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: "center",
    width: '100%',
  },
  gridItem: {
    display: 'flex',
    justify: "center"
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  sideTable: {
    width: '90%',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  table: {
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const getPassedProducts = (params) => {
  var arr = {}
  params.forEach((value, key) => arr[key] = value)
  return arr
}

export default function NewOrderPage() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState([]);
  const [user, setUser] = useState({admin: false, delivery_address: "", email: "", id: "", invoice_address: "", name: "", note: "", phone: "", registered_on: ""})

  let search = new URLSearchParams(window.location.search);

  const [passedProducts] = React.useState(getPassedProducts(search));

  function createProduct(product) {
    return {
      id:product.id,
      product:product.name,
      price_per_unit:Number(product.price_per_unit),
      unit:product.unit,
      amount: passedProducts[product.id] !== undefined ? Number(passedProducts[product.id]) : 0,
      price: (passedProducts[product.id] !== undefined ? Number(passedProducts[product.id]) : 0) * Number(product.price_per_unit)};
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
        setProducts((prevState) => {
          return data.map((product) => createProduct(product));
        });
      });
  }
  const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
      <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Produkty
          </Typography>
      </Toolbar>
    );
  };

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

  const EnhancedTableSideToolbar = () => {
    const classes = useToolbarStyles();

    return (
      <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Souhrn
          </Typography>
      </Toolbar>
    );
  };

  useEffect(() => {
    fetchUser().then((res) => {fetchData()});
  },[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpProduct = (event, productUp) => {
    setProducts(products.map((product)=> {
        if (product.id === productUp.id){
          product.amount = product.amount + 1
          product.price = product.amount * product.price_per_unit
        }
        return product
      })
    )
  }

  const handleDownProduct = (event, productDown) => {
    setProducts(products.map((product)=> {
        if (product.id === productDown.id){
          product.amount = product.amount <= 0 ? 0 : product.amount - 1
          product.price = product.amount * product.price_per_unit
        }
        return product
      })
    )
  }

  async function addOrder() {
    const res = await fetch("http://localhost:5000" + "/order", {
     method: 'post',
     headers: new Headers({
       'Accept': '*/*',
       'Cache-Control': 'no-cache',
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTk4NDM5NzMsImlhdCI6MTU5OTc1NzU3Mywic3ViIjoxN30.77EA56NQ3017NAmRSgtbnuA8SuLZvIjHXPBmIqGBpxM',
       'Content-Type': 'application/json'
       }),
      body: JSON.stringify({
        'products': products.filter((product) => {return product.amount > 0}).map((product)=> {
          return {
            product_id: product.id,
            amount: product.amount
          }
        })
      })
    }
    );

    res
      .json()
      .then(ress => {
        console.log(ress);
        setTimeout(() => {
          window.location.href='/order/list'
        }, 2000);

      })
      .catch(err => {});
  }

  const handleOrderConfirm = (event) => {
    addOrder()
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (

        <ThemeProvider theme={outerTheme}>
          <SwipableManu admin={user.admin}/>
          {user.id === "" ?
            <div style={{ height: '90vh', margin: 0, padding: 0 }}>
              <Box display='flex' flex='1' justifyContent='center' alignItems="center" style={{ height: '90vh' }}>
                  <CircularProgress size={50}/>
              </Box>
            </div>
            :
          <div className={classes.root}>

            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nová Objednávka
            </Typography>
            <Grid container>
              <Grid item xs={12} md={8} className={classes.gridItem}>
                <Paper className={classes.paper} elevation={3}>
                  <EnhancedTableToolbar numSelected={products.reduce((prev, cur) => {return prev + (cur.amount > 0 ? 1 : 0)},0)} />
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size={'medium'}
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={products.reduce((prev, cur) => {return prev + (cur.amount > 0 ? 1 : 0)},0)}
                        order={order}
                        orderBy={orderBy}
                        // onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={products.length}
                      />
                      <TableBody>
                        {stableSort(products, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            // const isItemSelected = isSelected(row.product);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={row.amount > 0}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={row.amount > 0}
                                  color={"primary"}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color={"primary"}
                                      checked={row.amount > 0}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.product}
                                  </TableCell>
                                  <TableCell align="right">{row.price_per_unit + ' Kč'}</TableCell>
                                  <TableCell align="right">{row.unit}</TableCell>
                                  <TableCell align="right">{row.amount}</TableCell>
                                  <TableCell align="right">{row.price + ' Kč' }</TableCell>
                                  <TableCell align="right">
                                    <IconButton size="small" color="primary" aria-label="Přidat" onClick={(event) => handleUpProduct(event, row)}>
                                      <AddIcon/>
                                    </IconButton>
                                    <ThemeProvider theme={removeButtonTheme}>
                                      <IconButton size="small" color="secondary" aria-label="Odebrat" onClick={(event) => handleDownProduct(event, row)}>
                                        <RemoveIcon/>
                                      </IconButton>
                                    </ThemeProvider>
                                  </TableCell>
                                </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: (53) * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <TableContainer component={Paper} className={classes.sideTable} elevation={3}>
                  <EnhancedTableSideToolbar/>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produkt</TableCell>
                        <TableCell align="right">Množství</TableCell>
                        <TableCell align="right">Cena</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((row) => ( row.amount > 0 ?
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.product}
                          </TableCell>
                          <TableCell align="right">{row.amount + ' ' + row.unit}</TableCell>
                          <TableCell align="right">{row.price + ' Kč'}</TableCell>
                        </TableRow> : null
                      ))}
                      <TableRow key={'summary'}>
                        <TableCell component="th" scope="row">
                          <b>Celkem</b>
                        </TableCell>
                        <TableCell align="right"><b>{products.reduce((prev, cur) => prev + (cur.amount > 0 ? 1 : 0),0) + ' produktů'}</b></TableCell>
                        <TableCell align="right"><b>{products.reduce((prev, cur) => prev + cur.price,0) + ' Kč'}</b></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Box margin={2} display="flex" justifyContent="center">
                    <Button variant="contained" color="primary" margin={1} disabled={products.reduce((prev, cur) => {return prev + (cur.amount > 0 ? 1 : 0)},0) <= 0} onClick={(event) => handleOrderConfirm(event)}>
                      Dokončit objednávku
                    </Button>
                  </Box>
                </TableContainer>

              </Grid>

            </Grid>
          </div>
          }
        </ThemeProvider>

  );
}
