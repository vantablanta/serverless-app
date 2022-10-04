import Footer from "./components/Footer";
import Navigation from "./components/Nav";
import Talks from "./components/Talks";
import { withAuthenticator } from '@aws-amplify/ui-react'

function App({ signOut }) {
  return (
    <>
      <Navigation />
      <button className="mt-3 ms-2 me-2 btn signout float-end" onClick={signOut}>Sign out</button>
      <Talks />
      <Footer />

    </>
  );
}

export default withAuthenticator(App, {
  socialProviders: ['apple', 'google'],
});
