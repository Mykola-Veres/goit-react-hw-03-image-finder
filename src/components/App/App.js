import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticleConteiner } from './App.styled';
import Searchbar from '../Searchbar';
import ImagesAPI from '../../services/ImagesAPI';
import ImageGallery from '../ImageGallery';
import ButtonLoad from '../ButtonLoad';
import Loader from '../Loader';
import Modal from '../Modal';

class App extends Component {
  state = {
    images: null,
    page: 1,
    query: '',
    error: '',
    status: 'idle',
    activeImge: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ page: 1, status: 'pending' });
      ImagesAPI.fetchImages(query, page)
        .then(images => {
          if (images.hits.length === 0) {
            this.notify();
          }
          this.setState({ images, status: 'resolved' });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
    if (prevState.page !== page && page > 1) {
      this.setState({ status: 'pending' });
      ImagesAPI.fetchImages(query, page).then(images => {
        this.setState({ images, status: 'resolved' });
      });
    }
  }

  handlerSubmitUserQuery = query => {
    this.setState({ query });
  };

  handlerClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  notify = () =>
    toast.error(
      `There are no matching images for this request: ${this.state.query} !`,
    );

  handleronClickImage = id => {
    this.setState({
      activeImge: this.state.images.hits.find(image => id === image.id),
    });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, error, activeImge, showModal } = this.state;

    return (
      <ArticleConteiner>
        <ToastContainer position="top-center" autoClose={2000} />
        <Searchbar onSubmit={this.handlerSubmitUserQuery} />
        {status === 'resolved' && (
          <ImageGallery
            userImages={images}
            onClick={this.handleronClickImage}
          />
        )}
        {status === 'resolved' && images.hits.length && (
          <ButtonLoad onClick={this.handlerClickLoadMore} />
        )}
        {status === 'rejected' && <p>{error.massage}</p>}
        {status === 'pending' && <Loader />}
        {showModal && <Modal image={activeImge} onClose={this.toggleModal} />}
      </ArticleConteiner>
    );
  }
}
export default App;
