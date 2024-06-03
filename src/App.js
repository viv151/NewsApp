import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';
import Loader from './components/Loader';
import News from './components/News';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className="main">
            <Layout>
              <div className='routes'>
                  <Routes>
                    <Route path='/' element={<News />} />
                  </Routes>
              </div>
            </Layout>
        <div className="footer" >
              <Typography.Title level={5} style={{color: 'white', textAlign: 'center' }}>
                 NewsWeb <br />
                 All rights reserved
              </Typography.Title>
              <Space>
                    {/* <Link to='/'>Home</Link> */}
                    {/* <Link to='/exchanges'>Exchanges</Link> */}
                    <Link to='/'>News</Link>
              </Space> 
        </div>
        </div>
    </div>
  );
}

export default App