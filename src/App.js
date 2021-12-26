import './App.css';
import Row from './Main/Row';
import Banner from './Main/Banner';
import Nav from './Main/Nav';
import Footer from './Main/Footer';
import allrows from './AllRows';

function App() {
  return (
    <div className='app'>
      <Nav />
      <Banner />
      {allrows.map((item) => {
        return (
          <Row title={item.title} fettchurl={item.url} isLargeRow={item.isLarge} />
        )
      })}
      <Footer />
    </div>
  );
}

export default App;
