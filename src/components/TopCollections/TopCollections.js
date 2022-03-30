import React, { useState } from 'react';
import nfts from '../../data'
import './TopCollections.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TopCollections = () => {
  const [index, setIndex] = useState(0);
  const { title, price, image, address } = nfts[index];
  const checkNumber = (number) => {
    if (number > nfts.length - 1) {
      return 0;
    }
    if (number < 0) {
      return nfts.length - 1;
    }
    return number;
  };
  const nextNFT = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevNFT = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
 
  return (
    <article className='review'>
    <h4 className='job'> Top NFTs Available Inside The Vault:</h4>
      <div className='img-container'>
        <img src={image} alt={title} className='person-img' />

      </div>
      <h4 className='author'>{title}</h4>
      <p className='job'>{price}</p>
      <p className='info'>CA: {address}</p>
      <div className='button-container'>
        <button className='prev-btn' onClick={prevNFT}>
          <FaChevronLeft />
        </button>
        <button className='next-btn' onClick={nextNFT}>
          <FaChevronRight />
        </button>
      </div>
    </article>
  );
};

export default TopCollections;