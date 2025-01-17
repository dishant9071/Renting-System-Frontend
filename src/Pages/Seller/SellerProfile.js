import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import TitleHeader from '../../Components/Header/TitleHeader';
import { Link } from 'react-router-dom';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import layersPlus from '@iconify-icons/mdi/layers-plus';
import walletIcon from '@iconify-icons/mdi/wallet';
import lockOutline from '@iconify-icons/mdi/lock-outline';

const SellerProfile = () => {
  const [Seller, setData] = useState([]);
  const [password, setPassword] = useState('');
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    const fetch = () => {
      axios
        .get('https://rentingsystem.herokuapp.com/seller/detail', {
          headers: {
            'auth-token': localStorage.getItem('auth_token'),
          },
        })
        .then((response) => {
          console.log(response.data.seller[0]);
          setData(response.data.seller[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, []);

  const handleOnClick = () => {
    axios
        .post('https://rentingsystem.herokuapp.com/buyer/forgot', {
          password : password,
        })
        .then(function (response) {
            const data = response.data;
            if (data.error) {
                alert.error(data.msg);
            } else {
                alert.success(data.msg);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  return (
    <div className='SellerProfile-page'>
      <TitleHeader name={'My Profile'} />
      <div className='SellerProfile-main'>
        <div className='SellerProfile-div'>
          <Icon icon={cardAccountDetails} className='SellerProfile-image' />
          <div className='SellerProfile-title'>Personal Information</div>
        </div>
        <div className='SellerProfile-sub'>
          <div className='SellerProfile-namediv'>
            <div className='SellerProfile-hello'> Hello, </div>
            <div className='SellerProfile-name'>
              {' '}
              {Seller.firstname + ' ' + Seller.lastname}
            </div>
          </div>
          <div className='SellerProfile-details'>
            <div className='SellerProfile-addressdiv1'>
              <div className='SellerProfile-dis'>Address</div>
              <div>{Seller.address}</div>
            </div>
            <div className='SellerProfile-addressdiv2'>
              <div className='SellerProfile-dis'>E-mail</div>
              <div>{Seller.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='SellerProfile-othermain'>
        <Link to='./myproducts'>
          <div className='SellerProfile-otherdiv'>
            <Icon icon={walletIcon} className='SellerProfile-image' />
            <div className='SellerProfile-title'>My Product</div>
          </div>
        </Link>
      </div>
      <div className='SellerProfile-othermain'>
        <Link to='./active'>
          <div className='SellerProfile-otherdiv'>
            <Icon icon={shoppingIcon} className='SellerProfile-image' />
            <div className='SellerProfile-title'>Active Product</div>
          </div>
        </Link>
      </div>
      <div className='SellerProfile-othermain'>
        <Link to='./addproduct'>
          <div className='SellerProfile-otherdiv'>
            <Icon icon={layersPlus} className='SellerProfile-image' />
            <div className='SellerProfile-title'>Add New Product</div>
          </div>
        </Link>
      </div>
      <div className='SellerProfile-changepassword redi'>
        <div className='changepassword-input-body'>
          <Icon icon={lockOutline} className='changepassword-image' />
          <div className='changepassword-title'> Update Password</div>
        </div>
        <div className='changepassword-buttonbody'>
          <div className='change-input'>
            <input
              type={'password'}
              placeholder={'Enter a new Password'}
              className='changepassword-input'
              handleInput={handlePassword}
            />
          </div>
          <div className='changepassword-button'>
            <div className='changepassword-btn' onClick={handleOnClick}>Update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

SellerProfile.defaultProps = {
  name: 'Mihir',
  address: 'New york , USA',
  mobilenumber: 1234567890,
  email: 'mihir@gmail.com',
};

export default SellerProfile;
