import './App.scss';
import AreaContextProvider from './contexts/AreaContext';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Result from './components/Result/Result';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="mainContainer">
      <AreaContextProvider>
        <Header/>
        <SearchBar/>
        <Result/>
        <Footer/>
      </AreaContextProvider>
    </div>
  );
}

export default App;
