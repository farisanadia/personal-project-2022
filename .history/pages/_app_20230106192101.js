import '../styles/globals.css'
import Layout from '../components/layout'
import {ToastContainer} from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from "react-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function App({ Component, pageProps }) {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
  }
  return (
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default App;