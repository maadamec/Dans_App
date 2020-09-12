import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 200
  },
});

export default function OrderProductCard(props) {
  const [imageUrl] = useState(props.imageurl);
  const [title] = useState(props.title);
  const [description] = useState(props.description);
  const [units] = useState(props.units);
  const [value, setValue] = useState( 0);
  const classes = useStyles();

  const increaseValue = () => {
    setValue(value+1);
    props.onChange(value+1);
  }

  const decreaseValue = () => {
    setValue(value > 0 ? value-1 : value);
    props.onChange(value > 0 ? value-1 : value);
  }

  return (
    <Card className={classes.root} elevation={4}>
      <CardActionArea disabled>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Grid container justify={"flex-end"}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              {value + " " + units}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton color="primary" size={"small"} onClick={increaseValue}>
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton color="primary" size={"small"} onClick={decreaseValue} disabled={value === 0}>
              <RemoveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

OrderProductCard.propTypes = {
  imageurl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  units: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
}