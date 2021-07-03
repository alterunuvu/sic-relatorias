import { Provider } from "react-redux";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header";
import Routes from "./app/routes";
import store from "./app/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div>
          <Routes />
        </div>
        <Footer />
      </Provider>
    </>
  );
};

export default App;
