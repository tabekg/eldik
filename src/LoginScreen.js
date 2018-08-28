import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  typography: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  }
});

function SignIn(props){
  const { classes } = props;

  let uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: { signInSuccess: () => false }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Кириңиз..</Typography>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth()} />
          <Typography variant="caption">Элдик - дайыма эл менен бирге!</Typography>
        </Paper>
        <Typography className={classes.typography} variant="caption">&copy; Элдик 2018</Typography>
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(SignIn);
