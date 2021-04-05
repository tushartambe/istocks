import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { checkToken } from '../apis/authentication';

const withAuth = (ComponentToProtect) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const checkIsSessionValid = () => {
      checkToken().then(response => {
        setLoading(false);
      }).catch(error => {

        if (error.status === 401) {
          notification.error({
            message: 'iStocks',
            description: 'Session Invalid. Please login again.'
          });
        } else {
          notification.error({
            message: 'iStocks',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
        setLoading(false);
        setRedirect(true);
      });
    }

    useEffect(() => {
      checkIsSessionValid();
    }, []);

    return loading ? null : redirect ? <Redirect to="/login" /> : <ComponentToProtect {...props} key={props.match.params.symbol} keyProp={props.match.params.symbol} />;
  }
};

export default withAuth;