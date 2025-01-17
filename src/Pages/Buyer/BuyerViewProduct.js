import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import TitleHeader from '../../Components/Header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../Components/Button/Button';
import heartIcon from '@iconify-icons/mdi/heart';
import cartIcon from '@iconify-icons/mdi/cart';
import mapMarkerPlus from '@iconify-icons/mdi/map-marker-plus';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

const BuyerViewProduct = (props) => {
  let location = useLocation();
  const alert = useAlert();
  let history = useHistory();

  const passvar = location.state;
  // console.log(passvar);
  const Addtowishlist = () => {
    axios
      .get('https://rentingsystem.herokuapp.com/buyer/detail', {
        headers: {
          auth_token: localStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        axios.post('https://rentingsystem.herokuapp.com/buyer/updateWishlist', {
          buyer: response.data.buyer[0]._id,
          product_id: location.state._id,
        });
        const data = response.data;
        if (data.error) {
          alert.error('Error');
        } else {
          alert.success('Added to wishlist');
          history.push('./wishlist');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Press Request Page for Get SELLER ADDRESS
  const AddRequest = () => {
    axios
      .get('https://rentingsystem.herokuapp.com/buyer/detail', {
        headers: {
          auth_token: localStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        axios
          .post('https://rentingsystem.herokuapp.com/buyer/request', {
            buyer: response.data.buyer[0]._id,
            seller: location.state.seller,
          })
          .then((response) => {
            const data = response.data;
            console.log(response);
            if (data.error) {
              alert.error(data.msg);
            } else {
              alert.success(data.msg);
            }
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // GET SELLER NAME FROM SELLER ID
  const [Seller, setData] = useState([]);
  useEffect(() => {
    const fetch = () => {
      axios
        .get(
          'https://rentingsystem.herokuapp.com/seller/getname/' +
            location.state.seller
        )
        .then((response) => {
          setData(response.data.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, [location]);
  return (
    <div className='BuyerViewProduct-main'>
      <TitleHeader name={'View Product'} />
      <div className='BuyerViewProduct-body'>
        <div className='BuyerViewProduct-imagediv'>
          <div className='BuyerViewProduct-imagesub'>
            <img
              src={location.state.imagepath || logo}
              className='BuyerViewProduct-image'
              alt={'logo'}
            />
            <div className='BuyerViewProduct-buttons'>
              <div className='BuyerViewProduct-button'>
                <Button
                  icon={heartIcon}
                  name={'Wishlist'}
                  handleClick={Addtowishlist}
                />
              </div>
              <div className='BuyerViewProduct-button'>
                <Link to={{ pathname: './checkout', state: passvar }}>
                  <Button icon={cartIcon} name={'Rent Now'} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='BuyerViewProduct-sub'>
          <div className='BuyerViewProduct-title'>{location.state.title}</div>
          <hr />
          <div className='BuyerViewProduct-pricediv'>
            <div className='BuyerViewProduct-pricedivsub'>Price </div>
            <div className='BuyerViewProduct-formatprice'>
              <span className='BuyerViewProduct-price'>
                {location.state.price}{' '}
              </span>{' '}
              <span> {location.state.formatofprice}</span>
            </div>
          </div>
          <hr />
          <div className='BuyerViewProduct-category'>
            <div className='BuyerViewProduct-category-text'>{'Category'}</div>
            <div className='BuyerViewProduct-category-type'>
              {location.state.category}
            </div>
          </div>
          <hr />
          <div className='BuyerViewProduct-seller-details'>
            <div className='BuyerViewProduct-seller'>{'Seller'}</div>
            <div className='BuyerViewProduct-sellername'>
              {Seller.firstname + ' ' + Seller.lastname}
            </div>
            <div className='BuyerViewProduct-seller-button'>
              <Button
                icon={mapMarkerPlus}
                name={'Request'}
                handleClick={AddRequest}
              />
            </div>
          </div>
          <hr />
          <div className='BuyerViewProduct-description'>
            <div className='BuyerViewProduct-description-title'>
              {'Description'}
            </div>
            <div className='BuyerViewProduct-description-content'>
              {location.state.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BuyerViewProduct.defaultProps = {
  title: 'Sony Camera',
  price: 50000,
  formatofPrice: '/month',
  category: 'Camera',
  seller: 'Deep',
  description: 'Best camera in segment.',
};

export default BuyerViewProduct;
