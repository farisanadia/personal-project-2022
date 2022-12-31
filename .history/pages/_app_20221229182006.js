import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer}

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default App;