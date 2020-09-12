import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const getUrlProducts = (row) => {
    return row.products.reduce((prev, cur) => {
      let res = prev
      res[cur.product_id]=cur.amount
      return res
    }, {})
  }

  return (
    <React.Fragment>

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user_name}
        </TableCell>
        <TableCell align="right">{row.num_of_products}</TableCell>
        <TableCell align="right">{row.sum_of_prices + " Kč"}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} component="span" display="block">
              <Typography variant="h6" gutterBottom component="div">
                Produkty
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Název Produktu</TableCell>
                    <TableCell>Množství</TableCell>
                    <TableCell align="right">Jednotka</TableCell>
                    <TableCell align="right">Cena za jednotku</TableCell>
                    <TableCell align="right">Celková cena</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((historyRow) => (
                    <TableRow key={historyRow.product_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.unit}</TableCell>
                      <TableCell align="right">{historyRow.price_per_unit + " Kč"}</TableCell>
                      <TableCell align="right">
                        {historyRow.price + " Kč"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box  margin={1} display="flex" flexDirection="row-reverse" >
              {console.log(getUrlProducts(row))}
              <Button variant="contained" color="primary" href={"/order/new?"+ new URLSearchParams(getUrlProducts(row)).toString()} >
                Vytvořit objednávku
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};