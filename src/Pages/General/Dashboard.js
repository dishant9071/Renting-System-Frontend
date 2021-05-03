import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../Components/Header/SearchHeader';
import ProductCard from '../../Components/Cardview/ProductCard';
import './style.css';

const Dashboard = () => {
  const [Products, setData] = useState([]);
  useEffect(() => {
    const fetch = () => {
      axios
        .get('http://localhost:5000/product/buyer')
        .then((response) => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, []);

  return (
    <div className='Dashboard'>
      <SearchHeader />
      <div className='Main-card'>
        {Products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
