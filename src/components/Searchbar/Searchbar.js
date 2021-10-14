import { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleImageNameChange = e => {
    this.setState({
      imageName: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmitButton = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.warn('Please enter your query!');
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
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
            value={this.state.imageName}
            onChange={this.handleImageNameChange}
          />
        </form>
      </header>
    );
  }
}
