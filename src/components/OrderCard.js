import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import RepeatIcon from '@material-ui/icons/Repeat';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import DescriptionIcon from '@material-ui/icons/Description';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function OrderCard() {
  const classes = useStyles();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs };
  }
  const rows = [
    createData('Frozen yoghurt', 159, '6.0 kg', 24, 4.0),
    createData('Ice cream sandwich', 237, '9.0 kg', 37, 4.3),
    createData('Eclair', 262, 16.0, '24 kg', 6.0),
    createData('Cupcake', 305, 3.7, '67 kg', 4.3),
    createData('Gingerbread', 356, 16.0, '49 kg', 3.9),
  ];
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false} elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
             <Typography className={classes.heading}> Objednavka #123</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>4. 7. 2020</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>2000 Kč</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Produkt</TableCell>
                  <TableCell align="right">Množství</TableCell>
                  <TableCell align="right">Cena za jednotku</TableCell>
                  <TableCell align="right">Celkem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={clsx(classes.column, classes.helper)}>
            <Chip
              icon={<LooksOneIcon/>}
              label="Jednorázová"
              className={classes.divider}
            />
            <Chip
              icon={<RepeatIcon />}
              label="Jednorázová"
              className={classes.divider}
            />
            <Chip
              icon={<CreditCardIcon />}
              label="Kartou"
              className={classes.divider}
            />
            <Chip
              icon={<MoneyIcon />}
              label="Hotově"
              className={classes.divider}
            />
            <Chip
              icon={<DescriptionIcon />}
              label="Faktura"
              className={classes.divider}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
