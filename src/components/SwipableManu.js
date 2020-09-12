import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableMenu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [admin, setAdmin] = React.useState(props.admin)

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  React.useEffect(() => {
    setAdmin(props.admin);
  }, [props.admin]);

  const list_of_sites = [
    {text: 'Úvod', icon: <HomeIcon />, redirect: '/'},
    {text: 'Profil', icon: <PersonIcon />, redirect: '/profile'},
    {text: 'Nová objednávka', icon: <AddShoppingCartIcon />, redirect: '/order/new'},
    {text: 'Historie Objednávek', icon: <ImportContactsIcon />, redirect: '/order/list'},
  ]

  const list_of_sites_admin = [
    {text: 'Uživatelé', icon: <GroupIcon />, redirect: '/user/list'},
    {text: 'Produkty', icon: <StorefrontIcon />, redirect: '/products/list'},
    {text: 'Objednávky', icon: <LocalGroceryStoreIcon />, redirect: '/order/list'},
  ]

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {list_of_sites.map((item) => (
          <ListItem button key={item.text} onClick={event =>  window.location.href=item.redirect}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {
        admin ? <List>
        {list_of_sites_admin.map((item) => (
          <ListItem button key={item.text} onClick={event =>  window.location.href=item.redirect}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List> : null
      }

    </div>
  );

  return (
    <Grid container alignItems={'flex-start'} spacing={3}>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={1} justify={"flex-end"} >
        <div>
          <React.Fragment key={'left'}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            <SwipeableDrawer
              anchor={'left'}
              open={state}
              onClose={toggleDrawer( false)}
              onOpen={toggleDrawer( true)}
            >
              {list('left')}
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </Grid>
    </Grid>

  );
}

SwipeableMenu.propTypes = {
  admin: PropTypes.bool
}