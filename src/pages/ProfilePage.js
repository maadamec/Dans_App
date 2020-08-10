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

export default function RegisterPage() {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaceIcon />
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
                defaultValue={'test mail'}
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
                defaultValue={'test company name'}
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
                defaultValue={'777 666 555'}
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
                defaultValue={'...'}
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
                defaultValue={'...'}
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
                defaultValue={'Poznámka...'}
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
  );
}