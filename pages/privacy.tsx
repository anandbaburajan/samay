import Head from "next/head";
import { Container, Jumbotron } from "react-bootstrap";
import Layout from "../src/components/Layout";

const Privacy = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Samay — privacy policy</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          name="description"
          content="Here's how Samay - a free and open source group scheduling tool, respects your privacy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samay.app" />
        <meta
          property="og:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="og:description"
          content="Here's how Samay - a free and open source group scheduling tool, respects your privacy."
        />
        <meta property="og:image" content="https://samay.app/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://samay.app" />
        <meta
          property="twitter:title"
          content="Samay — find a time which works for everyone"
        />
        <meta
          property="twitter:description"
          content="Here's how Samay - a free and open source group scheduling tool, respects your privacy."
        />
        <meta property="twitter:image" content="https://samay.app/banner.png" />
      </Head>
      <Layout>
        <div className="global-page-section">
          <Container className="global-container">
            <Jumbotron className="privacy-jumbo">
              <h1>Privacy Policy</h1>
              <p>Last updated: Apr 2, 2024</p>
              <hr />
              <br />
              <p>
                Hello! Welcome to Samay. Here's how we protect your data and
                respect your privacy.
              </p>
              <h3>Our role in your privacy </h3>
              <p>
                If you are creating a poll on Samay or voting on a poll, or just
                visiting our website, this policy applies to you.
              </p>
              <h3>Your responsibilities</h3>
              <p>
                <ul>
                  <li>Read this Privacy Policy.</li>
                  <li>Do not impersonate anyone else on polls.</li>
                  <li>
                    By submitting your availability information for an event,
                    you confirm that you have the right to authorise us to
                    process it on your behalf in accordance with this Privacy
                    Policy.
                  </li>
                </ul>
              </p>
              <h3>What data we collect</h3>
              <p>
                Information about events and your availability for those events
                which you enter in a poll.
              </p>
              <h3>How and why we use your data</h3>
              <p>
                Data protection law means that we can only use your data for
                certain reasons and where we have a legal basis to do so. We use
                the data solely to ensure the functionality of Samay — which is
                to help you quickly find the best time for meetings.
              </p>
              <h3>Your rights</h3>
              <p>
                <ul>
                  <li>
                    You have the right to not provide us with event or personal
                    availability information. If you choose to do this, you can
                    continue browse this website's pages, but you won't be able
                    to create polls or vote on polls.
                  </li>
                  <li>
                    You have the right to turn off cookies in your browser by
                    changing its settings. You can block cookies by activating a
                    setting on your browser allowing you to refuse cookies. You
                    can also delete cookies through your browser settings. If
                    you turn off cookies, you can continue to use the website
                    and browse its pages, but Samay's user experience would
                    deteriorate.
                  </li>
                  <li>
                    You have the right to access information we hold about you.
                    We will provide you with the information within one month of
                    your request, unless doing so would adversely affect the
                    rights and freedoms of other (e.g. another person's personal
                    or event details). We'll tell you if we can't meet your
                    request for that reason.
                  </li>
                  <li>
                    You have the right to make us correct any inaccurate
                    personal data about you.
                  </li>
                  <li>
                    You have the right to be 'forgotten' by us. You can do this
                    by deleting the polls you created.
                  </li>
                  <li>
                    You have the right to lodge a complaint regarding our use of
                    your data. But please tell us first, so we have a chance to
                    address your concerns.
                  </li>
                </ul>
              </p>
              <h3>Where do we store the data?</h3>
              <p>
                We use MongoDB's Atlas cloud database service to store all the
                events and your availability information.
              </p>
              <h3>How long do we store your data?</h3>
              <p>
                We will keep your polls indefinitely. You have the option to
                delete your polls from the recent polls page.
              </p>
              <h3>Cookies</h3>
              <p>
                We use cookies. Unless you adjust your browser settings to
                refuse cookies, we will issue cookies when you interact with
                Samay. These are 'persistent' cookies which do not delete
                themselves and help us recognise you when you return so we can
                help you manage your polls without asking you to create an
                account.
              </p>
              <h3>How can I block cookies?</h3>
              <p>
                You can block cookies by activating a setting on your browser
                allowing you to refuse the setting of cookies. You can also
                delete cookies through your browser settings. If you use your
                browser settings to disable, reject, or block cookies (including
                essential cookies), certain parts of our website's user
                experience would deteriorate.
              </p>
              <h3>Children's privacy</h3>
              <p>
                We do not address anyone under the age of 13. Personally
                identifiable information is not knowingly collected from
                children under 13. If discovered that a child under 13 has
                provided us with personal information, such information will be
                immediately deleted from the servers. If you are a parent or
                guardian and you are aware that your child has provided us with
                personal information, please contact us using the details below
                so that this information can be removed.
              </p>
              <h3>Changes to this privacy policy</h3>
              <p>
                This privacy policy may be updated from time to time. Thus, you
                are advised to review this page periodically for any changes.
              </p>
              <h3>Contact us</h3>
              <p>
                If you have any questions or suggestions about this Privacy
                Policy, do not hesitate to contact us at{" "}
                <a href="mailto:hi@anandbaburajan.com">
                  anandbaburajan@gmail.com
                </a>
                .
              </p>
              <br />
              <p>
                This privacy notice is based on an open-sourced design from{" "}
                <a href="https://juro.com/">Juro</a> and{" "}
                <a href="https://stefaniapassera.com/">Stefania Passera</a> -
                get your own{" "}
                <a href="https://info.juro.com/privacy-policy-template">
                  free privacy policy template
                </a>
                .
              </p>
            </Jumbotron>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
