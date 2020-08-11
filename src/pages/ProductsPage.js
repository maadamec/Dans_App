import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import MaterialTable from "material-table";
import StorefrontIcon from '@material-ui/icons/Storefront';

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
  const [state, setState] = React.useState({
    columns: [
      { title: 'Název produktu', field: 'name' },
      { title: 'Cena za jednotku', field: 'price_per_unit', type: "numeric"},
      { title: 'jednotka', field: 'unit'}
    ],
    data: [
      { name: 'Brambory', price_per_unit: 50, unit: 'kg'},
      { name: 'Mrkev', price_per_unit: 150, unit: 'kg'},
      { name: 'Okurka', price_per_unit: 30, unit: 'g'},
      { name: 'Jahody', price_per_unit: 100, unit: 'kg'},
      { name: 'Maliny', price_per_unit: 120, unit: 'g'},
      { name: 'Bataty', price_per_unit: 50, unit: 'kg'},
    ],
  });

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorefrontIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Produkty
        </Typography>

        <Divider t={4} style={{marginTop: 50}}/>

        <MaterialTable

          title="Produkty"
          columns={state.columns}
          data={state.data}
          style={{width: '75%', alignItems: 'center'}}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </div>
    </Container>
  );
}