import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralCard from '../../Components/Cardview/GeneralCard';
import TitleHeader from '../../Components/Header/TitleHeader';
import { useAlert } from 'react-alert';

const BuyerWishlist = () => {
  const alert = useAlert();
  const [Products, setData] = useState([]);
  useEffect(() => {
    const fetch = () => {
      axios
        .get('https://rentingsystem.herokuapp.com/buyer/detail', {
          headers: {
            auth_token: localStorage.getItem('auth_token'),
          },
        })
        .then((response) => {
          axios
            .post('https://rentingsystem.herokuapp.com/buyer/getwishlist', {
              buyer: response.data.buyer[0]._id,
            })
            .then((response) => {
              // console.log(response);
              if (response.data.error) {
                alert.error(response.data.msg);
                setData([]);
              } else {
                setData(response.data.data);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, [alert]);

  return (
    <div className='BuyerWishlist-page'>
      <TitleHeader name={'My Wishlist'} />
      <div className='BuyerWishlist-card'>
        {Products.map((product) => {
          return <GeneralCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default BuyerWishlist;
