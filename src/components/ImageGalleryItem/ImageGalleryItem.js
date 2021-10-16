// import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  tags,
  smallImage,
  largeImage,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        alt={tags}
        src={smallImage}
        data-source={largeImage}
      />
    </li>
  );
}
