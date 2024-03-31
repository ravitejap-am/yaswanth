// Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './header.module.css';
import Logo from '../../../asset/images/logo.png';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import { Layout, Menu, Grid, Drawer } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import './header.css';
import { Typography } from '@mui/material';

const Header = (props) => {
  const [scroll, setScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const { Header } = Layout;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const location = useLocation();
  const { handleLogoClick } = props

  useEffect(() => {
    if (location.state && location.state.fromRegisterPage) {
      scrollToElement('Contact_Up');
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = [
    {
      key: 'Home_page',
      label: 'Home',
      onClick: () => scrollToElement('Home_page'),
    },
    {
      key: 'ai_page',
      label: 'Solutions',
      onClick: () => scrollToElement('ai_page'),
    },
    {
      key: 'How_it_works',
      label: 'How it Works',
      onClick: () => scrollToElement('How_it_works'),
    },
    {
      key: 'Plan_Page',
      label: 'Plans',
      onClick: () => scrollToElement('Plan_Page'),
    },
    {
      key: 'Contact_Up',
      label: 'Contact Us',
      onClick: () => scrollToElement('Contact_Up'),
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const selectedKey = location.state?.fromRegisterPage
    ? 'Contact_Up'
    : 'Home_page';

  return (
    <Layout>
      <Header className={Styles.mainHeader}>
        <div className={Styles.appLogo} onClick={handleLogoClick} style={{cursor: 'pointer' }}>
          <img src={Logo} alt="" width={120} />
        </div>
        {screens.sm || screens.md || screens.lg ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
            items={items}
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              fontFamily: 'Montserrat, Arial, sans-serif',
            }}
          >
            {items?.map((item) => (
              <Menu.Item key={item?.key} onClick={item.onClick}>
                {item?.label}
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <>
            <AppstoreOutlined
              onClick={showDrawer}
              style={{ color: 'white', fontSize: '30px' }}
            />
            <Drawer
              title={
                <Typography
                  variant="body2"
                  style={{ color: 'white', fontWeight: '500' }}
                >
                  Menu
                </Typography>
              }
              placement="left"
              closable={true}
              onClose={onClose}
              open={visible}
              mask
              style={{
                background:
                  'linear-gradient(114deg,#0f172a 51.52%,#152346 73.32%,#1a2e5e 92.75%)',
              }}
            >
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['Home_page']}
                style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
              >
                {items.map((item) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Drawer>
          </>
        )}
        {screens.sm || screens.md || screens.lg ? (
          <div className={Styles.navigationButton}>
            <div
              className="btn-color"
              style={{ height: '40px', width: '90px' }}
            >
              <Link to={'/signIn'} style={{ textDecoration: 'none' }}>
                <GeneralButton
                  name={'Sign In'}
                  type={'submit'}
                  color={'#F8FAFC'}
                />
              </Link>
            </div>
            <div
              className="btn-color-signup"
              style={{ height: '40px', width: '90px' }}
            >
              <Link to={'/registerUser'} style={{ textDecoration: 'none' }}>
                <GeneralButton
                  name={'Sign Up'}
                  type={'submit'}
                  color={'#F8FAFC'}
                />
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}
      </Header>
    </Layout>
  );
};

export default Header;
