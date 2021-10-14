import { Component } from 'react';
import s from './App.module.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    // console.log(imageName);
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        {/* <Loader /> */}
        {/* <Button /> */}
        {/* <Modal /> */}
        <ToastContainer autoClose={2500} theme="colored" />
      </div>
    );
  }
}

export default App;
