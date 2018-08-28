import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

class MainScreen extends Component {
  constructor(){
    super();
    this.state = {
      draft: ''
    };
    this.textFieldHandler = this.textFieldHandler.bind(this);
  }

  componentDidMount(){
    let draftRef = this.props.database.ref().child('drafts/' + this.props.auth.currentUser.uid);
    draftRef.on('value', snapshot => {
      this.setState({ draft: snapshot.val() });
    });
  }

  textFieldHandler(e){
    this.setState({ draft: e.target.value });
    let updates = {};
    updates['drafts/' + this.props.auth.currentUser.uid] = e.target.value;
    this.props.database.ref().update(updates);
  }

  render(){
    return (
      <div>
        <Grid container direction='row' spacing={24} justify='center'>
          <Grid item lg={7} md={8} sm={10} xl={7} xs={11}>
            <Paper className='paper'>
              <TextField
                multiline
                rows="4"
                label="Талкуу үчүн суроо же ой-пикир жазыңыз"
                margin="normal"
                onChange={this.textFieldHandler}
                fullWidth
                value={this.state.draft}
              />
              <Grid container direction='row' justify='flex-end' alignItems='flex-start'>
                <Grid item><Button variant="contained" color="secondary">Талкууга коюу</Button></Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={7} md={8} sm={10} xl={7} xs={11}>
            <Paper className='paper'>A</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MainScreen;
