import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener(
      'keydown',
      this.closeModalOnEsc,
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'keydown',
      this.closeModalOnEsc,
    );
  }

  closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalOnBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { url, alt } = this.props;
    return createPortal(
      <div
        className={s.Overlay}
        onClick={this.closeModalOnBackdropClick}
      >
        <div className={s.Modal}>
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
