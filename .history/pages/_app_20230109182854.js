import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer} from 'react-toastify';
import { userContext } from '../context/userContext';

function App({ Component, pageProps }) {

  return (
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} /> 
      <userContext.Provider/>
    </Layout>
  );
}

export default App;