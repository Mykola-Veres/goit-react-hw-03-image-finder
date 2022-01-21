import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ userImages, onClick }) => (
  <ImageGalleryStyle>
    <ImageGalleryItem userImages={userImages} onClick={onClick} />
  </ImageGalleryStyle>
);
export default ImageGallery;

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  userImages: PropTypes.object.isRequired,
};
