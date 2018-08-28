import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { auth } from 'firebase';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends Component {
  constructor(){
    super();
    this.state = { anchorEl: false };
    this.handleMenu.bind(this);
    this.handleClose.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render(){
    const open = Boolean(this.state.anchorEl);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.flex}>{this.props.title}</Typography>
            <Tooltip title={auth().currentUser.displayName}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              id='menu-appbar'
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open}
              onClose={this.handleClose}>
              <MenuItem onClick={this.handleClose}>Профиль</MenuItem>
              <MenuItem onClick={() => auth().signOut()}>Чыгуу</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(MenuAppBar);
