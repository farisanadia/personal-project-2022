import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer} from 'react-toastify';

function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer</ToastContainer>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default App;