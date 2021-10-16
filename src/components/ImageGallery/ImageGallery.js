import { Component } from 'react';
import s from './ImageGallery.module.css';
import fetchImages from '../../apiServises/PixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageQuery } = this.props;
    const { page, images } = this.state;

    if (
      prevProps.imageQuery !== imageQuery ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      fetchImages(imageQuery, page)
        .then(data => {
          this.setState({
            images: [...images, ...data.hits],
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({
            error: error,
            status: 'rejected',
          }),
        );
    }
  }

  incrementPageNumber = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // scrollToEndPage = () => {
  //   return window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // };

  // .then(images => {
  //           if (page === 1) {
  //             this.setState({ images, status: 'resolved' });
  //           }
  //           if (page < 1) {
  //             this.setState(prevState => [
  //               ...prevState.images,
  //               ...images,
  //             ]);
  //           }
  //         })

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>What are we looking for?</div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                tags={image.tags}
                smallImage={image.webformatURL}
                largeImage={image.largeImageURL}
              />
            ))}
          </ul>

          <Button onClick={this.incrementPageNumber} />
        </>
      );
    }
  }
}
