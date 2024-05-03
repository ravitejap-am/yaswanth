import React from 'react'
import Styles from './TermAndCondition.module.css'

const TermAndCondition = () => {
    return (
        <div className="TermAndCondition-container">
            <div className={Styles.TermAndConditionHeaderStyle}>
                <p className={Styles.PrivacyPolicyPageTitle}>
                    Terms & Conditions for AM-Chat
                </p>
            </div>

            <div className={Styles.TermAndConditionSecondDiv}>
                {/* <h1 className={Styles.TermAndConditionheading}>Terms & Conditions</h1> */}

                <h2 className={Styles.TermAndConditionSubSubHeading}>
                    Introduction
                </h2>
                <p className={Styles.TermAndConditionContentStyle}>
                    These Terms and Conditions ("Terms") govern your use of the
                    chatbot ("Chatbot") developed by <strong>Areteminds</strong>{' '}
                    ("we", "us", or "our"). By accessing or using the Chatbot,
                    you agree to be bound by these Terms. If you disagree with
                    any of these Terms, you may not use the Chatbot.
                </p>

                {/* <p className={Styles.TermAndConditionContentStyle}>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy has been
          created with the help of the{" "}
          <a
            href="https://www.termsfeed.com/privacy-policy-generator/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy Generator
          </a>
          .
        </p> */}
                <h2 className={Styles.TermAndConditionSubSubHeading}>
                    Access and Use
                </h2>
                <p className={Styles.TermAndConditionContentStyle}>
                    You must be at least 13 years old to use the Chatbot. You
                    are responsible for ensuring that all users accessing the
                    Chatbot through your account are authorized to do so and
                    comply with these Terms.
                    <br />
                </p>
                <p className={Styles.TermAndConditionContentStyle}>
                    You may not use the Chatbot for any illegal or unauthorized
                    purpose, including:
                </p>

                <ul>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Violating</strong> any local, state,
                            national, or international law or regulation.
                        </p>
                    </li>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Infringing</strong> on any third-party's
                            intellectual property rights.
                        </p>
                    </li>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Transmitting</strong> any harmful or
                            offensive content, including viruses, malware, or
                            other destructive code.
                        </p>
                    </li>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Impersonating</strong> any person or entity,
                            or misrepresenting your affiliation with any person
                            or entity.
                        </p>
                    </li>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Interfering</strong> with or disrupting the
                            operation of the Chatbot or any servers or networks
                            connected to the Chatbot.
                        </p>
                    </li>
                    <li>
                        <p className={Styles.TermAndConditionContentStyle}>
                            <strong>Attempting</strong> to gain unauthorized
                            access to the Chatbot, any related systems or
                            networks, or any part of our infrastructure.
                        </p>
                    </li>
                </ul>
                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    User Content
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    You are solely responsible for any content you upload,
                    transmit, or share through the Chatbot ("User Content"). You
                    represent and warrant that you have all necessary rights,
                    licenses, and consents to share your User Content and that
                    your User Content does not violate any third-party rights.
                </p>
                <p className={Styles.TermAndConditionContentStyle}>
                    We do not claim any ownership rights in your User Content,
                    but you grant us a non-exclusive, worldwide, royalty-free
                    license to use, reproduce, modify, publish, and distribute
                    your User Content in connection with the operation and
                    provision of the Chatbot. We may remove or disable access to
                    any User Content that we believe, in our sole discretion,
                    violates these Terms or is otherwise harmful or offensive
                </p>
                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    {' '}
                    Disclaimers and Warranties
                </h4>

                <p className={Styles.TermAndConditionContentStyle}>
                    The Chatbot is provided "as is" and without any warranty of
                    any kind, express or implied. We disclaim all warranties,
                    express or implied, including, but not limited to,
                    warranties of merchantability, fitness for a particular
                    purpose, and non-infringement.
                </p>

                <p className={Styles.TermAndConditionContentStyle}>
                    We do not warrant that the Chatbot will be uninterrupted,
                    error-free, secure, or reliable. We may modify or
                    discontinue the Chatbot at any time without notice.
                </p>
                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    {' '}
                    Limitation of Liability
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    To the maximum extent permitted by law, we will not be
                    liable for any direct, indirect, incidental, consequential,
                    or punitive damages arising from your use of the Chatbot.
                </p>

                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    Indemnification
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    You agree to indemnify and hold us harmless from and against
                    all claims, losses, damages, liabilities, costs, and
                    expenses (including reasonable attorneys' fees) arising out
                    of or relating to your use of the Chatbot or your violation
                    of these Terms.
                </p>

                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    Governing Law and Dispute Resolution
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    These Terms shall be governed by and construed in accordance
                    with the laws of the State of Karnataka, without regard to
                    its conflict of laws provisions. Any dispute arising out of
                    or relating to these Terms shall be resolved by binding
                    arbitration in accordance with the rules of the American
                    Arbitration Association. The arbitration shall be conducted
                    in the English language and shall be held in Bangalore,
                    Karnataka.
                </p>

                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    Changes to the Terms
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    We may modify these Terms at any time by posting the revised
                    Terms on the Chatbot. You are responsible for regularly
                    reviewing the Terms. Your continued use of the Chatbot after
                    the posting of revised Terms constitutes your acceptance of
                    the revised Terms.
                </p>

                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    Contact Us
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    If you have any questions about these Terms, please contact
                    us at
                </p>
                <p className={Styles.TermAndConditionContentStyle}>
                    <a
                        href="mailto:sales@areteminds.com"
                        rel="external nofollow noopener"
                        target="_blank"
                    >
                        sales@areteminds.com
                    </a>
                </p>

                <h4 className={Styles.TermAndConditionSubSubHeading}>
                    Entire Agreement
                </h4>
                <p className={Styles.TermAndConditionContentStyle}>
                    These Terms constitute the entire agreement between you and
                    us with respect to your use of the Chatbot.
                </p>

                <br />
                <br />
            </div>
        </div>
    )
}

export default TermAndCondition
