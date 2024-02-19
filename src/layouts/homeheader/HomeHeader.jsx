const Homeheader = () => {
  return (
    <>
      <div style={{ backgroundColor: "#35286a" }}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: "36px",
            color: "white",
            backgroundColor: "#35286a",
          }}
        >
          AMChat
        </div>

        {/* Tabs */}
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: "10px",
            fontSize: "18px",
            backgroundColor: "#35286a",
          }}
        >
          <a
            href="/about"
            style={{
              margin: "0 20px",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            About
          </a>
          <a
            href="/pricing"
            style={{
              margin: "0 20px",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Pricing
          </a>
          <a
            href="/services"
            style={{
              margin: "0 20px",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Services
          </a>
          <a
            href="/contact"
            style={{
              margin: "0 20px",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default Homeheader;
