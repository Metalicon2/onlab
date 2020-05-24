import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import styles from "./Card.module.css";
import { useContext } from 'react';
import { Context } from '../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "210px",
    height: "320px",
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardItem = ({ name, desc, price, color, src}) => {

  const classes = useStyles();

  const { addCart } = useContext(Context);

  return (
    <div className={styles.grow}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: color}}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={src}
        title="Paella dish"
        maxwidth="30"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <p style={{marginLeft: "10px"}}>{price} Ft</p>
        <IconButton
          className={classes.expand}
          onClick={() => addCart({name: name, price: price, date: new Date(), quantity: 1})}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </div>
  );
}

export default CardItem;