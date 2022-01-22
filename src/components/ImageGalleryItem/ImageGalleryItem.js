import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

// (function scrollTo (ImageGalleryItemStyle){
//   const cardHeight = ImageGalleryItemStyle.firstElementChild.getBoundingClientRect().height
//   window.scrollBy({
//     left: 0,
//     top: cardHeight * 4,
//     behavior: 'smooth'
//   })
// })()

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => (
  <ImageGalleryItemStyle
    onClick={() => {
      onClick(largeImageURL, tags);
    }}
  >
    <ImageGalleryItemImage src={webformatURL} alt={tags} />
  </ImageGalleryItemStyle>
);
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
