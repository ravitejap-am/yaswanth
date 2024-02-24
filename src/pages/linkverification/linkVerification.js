import React, { useState, useEffect } from 'react';
import './linkVerification.module.css';
import axios from 'axios';
import { VERIFY_API } from '../../constants/Constant';
import Footer from '../../pages/home/Footer/Footer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const VerificationLink = () => {
  const { id } = useParams();
  const inputString = id;
  const startIndex = inputString.indexOf('&f=') + 3;
  const parameterValue = inputString.substring(startIndex);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isLogin, setIsLogin] = useState(parameterValue == 'au' ? false : true);
  const [urlId, setId] = useState(
    parameterValue == 'au' ? id.split('&')[0] : id
  );
  const apiCalling = async () => {
    try {
      const url = `${VERIFY_API}`;
      const response = await axios.get(url, {
        params: {
          id: urlId,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error('Failed to fetch documents');
        setIsProcessing(false);
      }

      console.log(response?.data?.data);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      setIsProcessing(false);
    }
  };

  const getBodyOfJsx = (isProcessing, isLogin, urlId) => {
    return (
      <>
        {isProcessing ? (
          <p>Your account is verifying...</p>
        ) : isLogin ? (
          <p>
            Your email is verified to login{' '}
            <Link to={'/signin'}>Click Here</Link>
          </p>
        ) : (
          <p>
            Your email is verified successfully to set Password{' '}
            <Link to={`/resetPassword/${urlId}`}>Click Here</Link>
          </p>
        )}
      </>
    );
  };

  useEffect(() => {
    apiCalling();
  }, []);

  console.log(id);
  return (
    <>
      <div className="recoverpassword-header"></div>
      <div className="main">
        <div className="container">
          {' '}
          <div className="row">
            <div className="col">
              <div className="row mainContent">
                <div className="box-round">
                  <div className="text-top">
                    {getBodyOfJsx(isProcessing, isLogin, urlId)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default VerificationLink;
