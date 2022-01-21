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

const ImageGalleryItem = ({ userImages, onClick }) =>
  userImages.hits.map(image => (
    <ImageGalleryItemStyle
      key={image.id}
      onClick={() => {
        onClick(image.id);
      }}
    >
      <ImageGalleryItemImage src={image.webformatURL} alt={image.tags} />
    </ImageGalleryItemStyle>
  ));

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  userImages: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
