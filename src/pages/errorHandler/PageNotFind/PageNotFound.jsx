import React from 'react';
import Style from './pageNotFound.module.css';
import { SearchOutlined } from '@ant-design/icons';
import PageNotFoundImage from '../../../asset/404.jpg';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className={Style.PageNotFound}>
      <div className={Style.container}>
        <div>
          <img
            className={Style.image}
            src={PageNotFoundImage}
            alt=""
            style={{ borderRadius: '10px' }}
          />
          <h1>Page Not Found !</h1>
          <p>Looks like,page doesn't exist</p>
        </div>
        <div>
          {/* <button>Back to dashboard</button> */}
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <GeneralButton
              name={'Back to dashboard'}
              type={'submit'}
              backgroundColor={'var(--Brand-500, #6366F1)'}
              color={'#fff'}
              buttonHandler={() => {
                // alert('hi');
              }}
              isSubmit={true}
            />
          </Link>

          {/* <form typeof="submit">
            <div>
              <input type="search" />

                {/* <GeneralButton
                name={<SearchOutlined />}
                type={"submit"}
                backgroundColor={"#f64e60"}
                color={"#fff"}
              /> */}
          {/* </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
