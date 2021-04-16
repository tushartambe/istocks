import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { addToFavorites, isFavorite, removeFromFavorites } from '../../apis/favorites';
const FavoritesButton = (props) => {
  const [isStockFavorite, setIsStockFavorite] = useState(false);

  const addStockToFavorites = () => {
    const favoritesRequest = {
      "symbol": props.symbol,
      "name": props.name
    };

    addToFavorites(favoritesRequest).then(response => {
      notification.success({
        message: 'iStocks',
        description: 'Added to favorites'
      });
      setIsStockFavorite(true);
    }).catch(error => {
      notification.error({
        message: 'iStocks',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }

  const removeStockFromFavorites = () => {
    const favoritesRequest = {
      "symbol": props.symbol,
      "name": props.name
    };

    removeFromFavorites(favoritesRequest).then(response => {
      notification.success({
        message: 'iStocks',
        description: 'Removed to favorites'
      });
      setIsStockFavorite(false);
    }).catch(error => {
      notification.error({
        message: 'iStocks',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }

  useEffect(() => {
    isFavorite(props.symbol).then(response => {
      setIsStockFavorite(response);
    }).catch(error => {
      setIsStockFavorite(false);
    });
  }, [isStockFavorite]);

  return (
    <Button
      style={{ borderStyle: 'none' }}
      shape='circle'
      icon={
        isStockFavorite
          ? <HeartFilled style={{ color: 'red' }} onClick={removeStockFromFavorites} />
          : <HeartOutlined onClick={addStockToFavorites} />
      }
    />
  );
};

export default FavoritesButton;
