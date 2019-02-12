import React, { Component } from 'react';
import {connect} from 'react-redux';
import { checkConnection } from './redux/actions/searchEngineActions';
import Form from './components/Form'
import Results from './components/Results'

class App extends Component {
  componentDidMount() {
    this.props.checkConnection();
  }

  // callApi = async () => {
  //   const response = await fetch('/api/ping');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    const { connected, query } = this.props; 

    if (connected) {
      return (
        <div className="App">
          <Form />
          {query && <Results /> }
        </div>
      );
    } else if (connected === false) {
      return <div className="App">Server is unavailable. Please make sure you entered <code>yarn dev</code></div>
    } else {
      return <div className="App">Connecting to server...</div>
    }
  }
}

function mapStateToProps({ searchEngine }) {
  return {
    connected: searchEngine.connected,
    query: searchEngine.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      checkConnection: () => {
        dispatch(checkConnection())
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
