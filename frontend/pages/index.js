import CardList from '../components/Cards/CardList';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
   flexGrow: 1,
  },
}));

const Home = () => {
  return (
    <div className={useStyle().root}>
    <Grid container>
      <CardList />
    </Grid>
    </div>
  );
};

export default Home;
