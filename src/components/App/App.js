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
    activeImge: '',
    tags: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState({ images: [], status: 'pending' });
    }

    if (prevState.query !== query || prevState.page !== page) {
      ImagesAPI.fetchImages(query, page)
        .then(({ hits }) => {
          if (!query) {
            this.setState({ status: 'idle' });
            return this.notify();
          }
          if (hits.length === 0) {
            this.notify();
          }
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: 'resolved',
          }));
          this.scrollTo();
          return hits;
        })
        .then(hits => this.scrollTo())
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  scrollTo = () => {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 4,
      behavior: 'smooth',
    });
  };

  handlerSubmitUserQuery = query => {
    this.setState({ query: query.trim(), page: 1 });
  };

  handlerClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  notify = () =>
    toast.error(
      `There are no matching images for this request: ${this.state.query} !`,
    );

  handleronClickImage = (activeImge, tags) => {
    this.setState({ activeImge, tags });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, error, activeImge, showModal, tags } = this.state;

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
        {status === 'resolved' && images.length && (
          <ButtonLoad onClick={this.handlerClickLoadMore} />
        )}
        {status === 'rejected' && <p>{error.massage}</p>}
        {status === 'pending' && <Loader />}
        {showModal && (
          <Modal image={activeImge} tags={tags} onClose={this.toggleModal} />
        )}
      </ArticleConteiner>
    );
  }
}
export default App;
