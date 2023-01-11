import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer} from 'react-toastify';
import { userContext } from '../context/userContext';

function App({ Component, pageProps }) {

  return (
    <Layout>
      <userContext.Provider></userContext.Provider>
      <ToastContainer limit={1}/>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default App;