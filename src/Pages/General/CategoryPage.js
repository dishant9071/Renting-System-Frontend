import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../Components/Header/SearchHeader';
import ProductCard from '../../Components/Cardview/ProductCard';
import './style.css';
import { useLocation } from 'react-router-dom';
const CategoryPage = (props) => {
    let location = useLocation();

    const [Products, setData] = useState([]);
    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentingsystem.herokuapp.com/product/')
                .then((response) => {
                    setData(response.data.product);
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
                    return (
                        product.category === location.state && (
                            <ProductCard key={product._id} product={product} />
                        )
                    );
                })}
            </div>
        </div>
    );
};

CategoryPage.defaultProps = {
    category: 'House',
};

export default CategoryPage;
