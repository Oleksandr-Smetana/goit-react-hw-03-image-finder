import { Component } from 'react';
import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  render() {
    return (
      <Loader
        type="Rings"
        color="#3f51b5"
        height={80}
        width={80}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }
}
