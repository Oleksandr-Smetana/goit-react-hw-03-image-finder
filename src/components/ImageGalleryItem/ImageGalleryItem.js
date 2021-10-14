import { Component } from 'react';
import s from './ImageGalleryItem.module.css';
import fetchImages from '../../apiServises/PixabayAPI';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '23038692-8ee91ca42b74ab69b2665b678';

export default class ImageGalleryItem extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pending' });
      fetch(
        `${BASE_URL}q=${this.props.imageName}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `No images with query: ${this.props.imageName}...`,
            ),
          );
        })
        .then(data => data.hits)
        .then(images =>
          this.setState({ images, status: 'resolved' }),
        )
        .catch(error =>
          this.setState({ error, status: 'rejected' }),
        );
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>Enter your query!</div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return images.map(image => (
        <li key={image.id} className={s.ImageGalleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            data-source={image.largeImageURL}
            className={s.ImageGalleryItemImage}
          />
        </li>
      ));
    }
  }
}
