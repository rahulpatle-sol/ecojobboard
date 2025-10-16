import { useState } from 'react';
import Navbar from './components/NavBar';
import HeroGradient from './components/HeroPage';
import JobSearch from './components/Jobsearch';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToogle';
import Login from './components/Login';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (


     <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}>


      <Navbar/>
<HeroGradient/>

<About/>
<Services/>
<Footer/>
   
    </div>
  


  );
}

export default App;
