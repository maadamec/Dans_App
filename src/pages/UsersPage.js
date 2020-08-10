import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from "material-table";

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
  const [state, setState] = React.useState({
    columns: [
      { title: 'Název restaurace', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Fakturační adresa', field: 'invoice_address'},
      { title: 'Dodací adresa', field: 'delivery_address'},
      { title: 'Telefon', field: 'phone_number'},
      { title: 'Poznámka', field: 'note'},
    ],
    data: [
      { name: 'Restarurace u Raka', email: 'rak@mail.com',
        invoice_address: 'Kožlí, Nové Město 860, 582 93',
        delivery_address: 'Kožlí, Nové Město 860, 582 93', phone_number: '', note: '' },
      { name: 'Restaurace u Kozla', email: 'kozel@mail.com',
        invoice_address: 'Kožlí, Nové Město 860, 582 93',
        delivery_address: 'Kožlí, Nové Město 860, 582 93', phone_number: '', note: '' },
    ]
  });

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Uživatelé
        </Typography>
        <Divider t={4} style={{marginTop: 50}}/>

        <MaterialTable

          title="Uživatelé"
          columns={state.columns}
          data={state.data}
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