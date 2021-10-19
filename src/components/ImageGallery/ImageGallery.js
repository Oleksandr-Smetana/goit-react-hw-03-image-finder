import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './ImageGallery.module.css';
import fetchImages from '../../apiServises/PixabayAPI';
import ImageGalleryItem from '../ImageGalleryItem/';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  static propTypes = {
    imageQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    status: 'idle',
    moreButton: false,
    showModal: false,
    modalContent: { url: null, alt: null },
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageQuery } = this.props;
    const { page, images } = this.state;
    // console.log('gal: ', this.props);

    if (
      prevProps.imageQuery !== imageQuery ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });

      fetchImages(imageQuery, page)
        .then(data => {
          this.setState({
            status: 'resolved',
          });
          // console.log(data.totalHits);
          // console.log(images.length);

          if (prevProps.imageQuery !== imageQuery) {
            if (data.hits.length === 0) {
              this.setState({
                images: [],
                page: 1,
                moreButton: false,
              });
              return toast.error(
                `No images with query: "${imageQuery}".`,
              );
            } else {
              this.setState({
                images: data.hits,
                page: 1,
                moreButton: true,
              });
            }
          } else {
            if (page === 1) {
              this.setState({ images: data.hits });
            } else {
              this.setState({
                images: [...images, ...data.hits],
              });
              if (
                data.totalHits ===
                images.length + data.hits.length
              ) {
                this.setState({
                  moreButton: false,
                });
                return toast.success(
                  `All images with query "${imageQuery}" were downloaded.`,
                  this.scrollToEndPage(),
                );
              }
              // console.log(images.length + data.hits.length);

              this.scrollToEndPage();
            }
          }
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
            moreButton: false,
          }),
        );
    }
  }

  incrementPageNumber = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  scrollToEndPage = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  closeModal = () => {
    this.setState(({ showModal, modalContent }) => ({
      showModal: false,
      modalContent: { url: null, alt: null },
    }));
  };

  openModal = e => {
    this.setState(({ showModal, modalContent }) => ({
      showModal: true,
      modalContent: {
        alt: e.target.alt,
        url: e.target.dataset.source,
      },
    }));
  };

  render() {
    const {
      images,
      status,
      moreButton,
      showModal,
      modalContent: { url, alt },
      error,
    } = this.state;

    if (status === 'idle') {
      return (
        <h2 className={s.message}>
          What are we looking for?
        </h2>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h2 className={s.message}>{error.message}</h2>;
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
                openModal={this.openModal}
              />
            ))}
          </ul>
          {moreButton && (
            <Button onClick={this.incrementPageNumber} />
          )}
          {showModal && (
            <Modal
              closeModal={this.closeModal}
              url={url}
              alt={alt}
            />
          )}
        </>
      );
    }
  }
}
