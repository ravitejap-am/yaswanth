const Homeheader = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '36px',
          color: 'white',
        }}
      >
        AMChat
      </div>

      {/* Tabs */}
      <div
        style={{
          position: 'absolute',
          top: '35px',
          right: '10px',
          fontSize: '18px',
        }}
      >
        <a
          href="/about"
          style={{ margin: '0 20px', color: '#ffffff', textDecoration: 'none' }}
        >
          About
        </a>
        <a
          href="/pricing"
          style={{ margin: '0 20px', color: '#ffffff', textDecoration: 'none' }}
        >
          Pricing
        </a>
        <a
          href="/services"
          style={{ margin: '0 20px', color: '#ffffff', textDecoration: 'none' }}
        >
          Services
        </a>
        <a
          href="/contact"
          style={{ margin: '0 20px', color: '#ffffff', textDecoration: 'none' }}
        >
          Contact Us
        </a>
      </div>
    </>
  );
};

export default Homeheader;
