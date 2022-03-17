import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Navbar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#285238'
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Header />
          <Navbar />
          <Outlet />
          <Footer />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
