import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imageQuery: '',
  };

  handleImageNameChange = e => {
    this.setState({
      imageQuery: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmitButton = e => {
    e.preventDefault();

    if (this.state.imageQuery.trim() === '') {
      return toast.warn('Please enter your query!');
    }
    this.props.onSubmit(this.state.imageQuery);
    this.setState({ imageQuery: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm}>
          <button
            type="submit"
            className={s.SearchFormButton}
            onClick={this.handleSubmitButton}
          >
            <span className={s.SearchFormButtonLabel}>
              Search
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageName"
            value={this.state.imageQuery}
            onChange={this.handleImageNameChange}
          />
        </form>
      </header>
    );
  }
}
