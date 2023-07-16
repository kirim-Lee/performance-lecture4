import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setBgColor, showModal } from '../redux/imageModal';
import LazyLoad from 'react-lazyload';
import { getAverageColorOfImage } from '../utils/getAverageColorOfImage';

function PhotoItem({ photo: { urls, alt } }) {
  const dispatch = useDispatch();

  const openModal = e => {
    dispatch(showModal({ src: urls.full, alt }));

    const averageColor = getAverageColorOfImage(e.target);
    dispatch(setBgColor(averageColor));
  };

  return (
    <ImageWrap>
      <LazyLoad offset={1000}>
        <Image
          src={urls.small + '&t=' + new Date().getTime()}
          crossOrigin="anonymous"
          alt={alt}
          onClick={openModal}
        />
      </LazyLoad>
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const Image = styled.img`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

export default PhotoItem;
