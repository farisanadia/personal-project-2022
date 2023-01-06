import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, route, Navigate}

function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default App;