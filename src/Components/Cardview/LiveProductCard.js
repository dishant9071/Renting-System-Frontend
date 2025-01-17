import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cardview = (props) => {
    const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});
    useEffect(() => {
        const fetch = () => {
            axios
                .get(
                    'https://rentingsystem.herokuapp.com/product/' +
                        props.order.productid
                )
                .then((response) => {
                    setProduct(response.data.product);
                    axios
                        .get(
                            'https://rentingsystem.herokuapp.com/seller/getname/' +
                                response.data.product.seller
                        )
                        .then((response) => {
                            setSeller(response.data.data[0]);
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
    }, [props.order]);
    return (
        <div className='LiveProductCard'>
            <Link to={{ pathname: '/buyer/product', state: product }}>
                <div className='LiveProductCard-main'>
                    <div className='LiveProductCard-imagediv'>
                        <img
                            src={product.imagepath || logo}
                            className='LiveProductCard-image'
                            alt={'logo'}
                        />
                    </div>
                    <div className='LiveProductCard-info'>
                        <div className='LiveProductCard-title'>
                            {product.title}
                        </div>
                        <div className='LiveProductCard-sub'>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Price
                                </div>
                                <div className='LiveProductCard-value'>
                                    {product.price} {product.formatofprice}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Category
                                </div>
                                <div className='LiveProductCard-value'>
                                    {product.category}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Seller
                                </div>
                                <div className='LiveProductCard-value'>
                                    {seller.firstname + ' ' + seller.lastname}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    {props.flag
                                        ? 'Purchase Date'
                                        : 'Return Date'}
                                </div>
                                <div className='LiveProductCard-value'>
                                    {' '}
                                    {props.flag
                                        ? props.order.purchasedate.split('T')[0]
                                        : props.order.returndate.split('T')[0]}
                                    {}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    {props.flag
                                        ? 'Purchase Time'
                                        : 'Return Time'}
                                </div>
                                <div className='LiveProductCard-value'>
                                    {' '}
                                    {props.flag
                                        ? props.order.purchasedate
                                              .split('T')[1]
                                              .split('.')[0]
                                        : props.order.returndate
                                              .split('T')[1]
                                              .split('.')[0]}
                                    {}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Cardview;
