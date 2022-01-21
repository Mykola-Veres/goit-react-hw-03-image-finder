import { BtnLoadMore } from './ButtonLoad.styled';
import PropTypes from 'prop-types';

const ButtonLoad = ({ onClick }) => (
  <BtnLoadMore type="button" onClick={onClick}>
    Load more
  </BtnLoadMore>
);
export default ButtonLoad;

ButtonLoad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
