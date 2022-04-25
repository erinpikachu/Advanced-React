import { PropTypes } from 'prop-types';
import Header from './Header';

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};

export default function Page({ children, cool }) {
  return (
    <div>
      <Header />
      <h2>I am the page component</h2>
      <h3>{cool}</h3>
      {children}
    </div>
  );
}
