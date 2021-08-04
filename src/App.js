import './App.scss';
import AreaContextProvider from './contexts/AreaContext';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Result from './components/Result/Result';

function App() {
  return (
    <div>
      <AreaContextProvider>
        <Header/>
        <SearchBar/>
        <Result/>
      </AreaContextProvider>
    </div>
  );
}

export default App;
