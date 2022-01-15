import React from 'react';
import './App.css';
import { BrowserRouter, } from 'react-router-dom';
import RoutesComp from './Main/Components/RoutesComp';

import * as actions from './Main/Redux/actionstore'
import { connect } from 'react-redux';

const mapdispatchToProps = (dispatch) => {
  return {
    authcheck: () => dispatch(actions.authcheck()),
    getProfile: (u_id) => dispatch(actions.fetchprofile(u_id))
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  }
}

const App = (props) => {
  const { authcheck, userId, getProfile } = props;
  React.useEffect(() => {
    authcheck()
  }, [authcheck])
  React.useEffect(() => {
    if (userId && userId !== null) {
      getProfile(userId)
    }

  }, [getProfile, userId]);
  return (
    <>
      <BrowserRouter>
        <div className='app'>
          <RoutesComp />
        </div>
      </BrowserRouter>
    </>
  );
}

export default connect(mapStateToProps, mapdispatchToProps)(App);
