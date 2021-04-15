import React from 'react';
import './style.css';

const AddressCard = (props) => {
    return (
        <div className='AddressCard-main'>
            <div className='AddressCard-name-body'>
                <p className='AddressCard-name'>{props.seller}</p>
            </div>
            <div className='AddressCard-address-body'>
                <p className='AddressCard-address'>{props.address}</p>
            </div>
        </div>
    );
};

AddressCard.defaultProps = {
    seller: 'Parth Santoki',
    address: 'Dhrol Jamanagar Gujarat India 300001',
};

export default AddressCard;
