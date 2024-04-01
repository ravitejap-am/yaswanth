import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../pages/home/Header/Header";
import Footer from "../../pages/home/Footer/Footer";

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    window.location.href = "/"; 
  };

  return (
    <>
      <div>
        <Header handleLogoClick={handleLogoClick} />
      </div>
    <Box style={{ padding: "20px", marginTop: "1.5rem" }}>
      <Box>
        <p style={{ fontWeight: "bold", fontSize: "24px" }}>
          Terms & Conditions for AM-Chat
        </p>
      </Box>

      <Box>
        <Box>
          <h2 style={{ fontSize: "20px" }}>Introduction</h2>
          <p>
            These Terms and Conditions ("Terms") govern your use of the chatbot
            ("Chatbot") developed by <strong>Areteminds</strong> ("we", "us", or
            "our"). By accessing or using the Chatbot, you agree to be bound by
            these Terms. If you disagree with any of these Terms, you may not
            use the Chatbot.
          </p>
        </Box>

        <Box>
          <h2 style={{ fontSize: "20px" }}>Access and Use</h2>
          <p>
            You must be at least 13 years old to use the Chatbot. You are
            responsible for ensuring that all users accessing the Chatbot
            through your account are authorized to do so and comply with these
            Terms.
          </p>
          <p>
            You may not use the Chatbot for any illegal or unauthorized purpose,
            including:
          </p>
          <ul>
            <li>
              Violating any local, state, national, or international law or
              regulation.
            </li>
            <li>
              Infringing on any third-party's intellectual property rights.
            </li>
            <li>
              Transmitting any harmful or offensive content, including viruses,
              malware, or other destructive code.
            </li>
            <li>
              Impersonating any person or entity, or misrepresenting your
              affiliation with any person or entity.
            </li>
            <li>
              Interfering with or disrupting the operation of the Chatbot or any
              servers or networks connected to the Chatbot.
            </li>
            <li>
              Attempting to gain unauthorized access to the Chatbot, any related
              systems or networks, or any part of our infrastructure.
            </li>
          </ul>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>User Content</h4>
          <p>
            You are solely responsible for any content you upload, transmit, or
            share through the Chatbot ("User Content"). You represent and
            warrant that you have all necessary rights, licenses, and consents
            to share your User Content and that your User Content does not
            violate any third-party rights.
          </p>
          <p>
            We do not claim any ownership rights in your User Content, but you
            grant us a non-exclusive, worldwide, royalty-free license to use,
            reproduce, modify, publish, and distribute your User Content in
            connection with the operation and provision of the Chatbot. We may
            remove or disable access to any User Content that we believe, in our
            sole discretion, violates these Terms or is otherwise harmful or
            offensive.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Disclaimers and Warranties</h4>
          <p>
            The Chatbot is provided "as is" and without any warranty of any
            kind, express or implied. We disclaim all warranties, express or
            implied, including, but not limited to, warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
          <p>
            We do not warrant that the Chatbot will be uninterrupted,
            error-free, secure, or reliable. We may modify or discontinue the
            Chatbot at any time without notice.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Limitation of Liability</h4>
          <p>
            To the maximum extent permitted by law, we will not be liable for
            any direct, indirect, incidental, consequential, or punitive damages
            arising from your use of the Chatbot.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Indemnification</h4>
          <p>
            You agree to indemnify and hold us harmless from and against all
            claims, losses, damages, liabilities, costs, and expenses (including
            reasonable attorneys' fees) arising out of or relating to your use
            of the Chatbot or your violation of these Terms.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>
            Governing Law and Dispute Resolution
          </h4>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of Karnataka, without regard to its conflict
            of laws provisions. Any dispute arising out of or relating to these
            Terms shall be resolved by binding arbitration in accordance with
            the rules of the American Arbitration Association. The arbitration
            shall be conducted in the English language and shall be held in
            Bangalore, Karnataka.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Changes to the Terms</h4>
          <p>
            We may modify these Terms at any time by posting the revised Terms
            on the Chatbot. You are responsible for regularly reviewing the
            Terms. Your continued use of the Chatbot after the posting of
            revised Terms constitutes your acceptance of the revised Terms.
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Contact Us</h4>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:sales@areteminds.com"
              rel="external nofollow noopener"
              target="_blank"
            >
              sales@areteminds.com
            </a>
          </p>
        </Box>

        <Box>
          <h4 style={{ fontSize: "18px" }}>Entire Agreement</h4>
          <p>
            These Terms constitute the entire agreement between you and us with
            respect to your use of the Chatbot.
          </p>
        </Box>
      </Box>
    </Box>
    <div>
        <Footer />
      </div>
    </>
  );
}

export default TermsAndConditions;
