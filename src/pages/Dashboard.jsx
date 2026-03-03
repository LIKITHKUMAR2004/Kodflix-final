import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { Row } from '../components/Row';
import { requests } from '../services/tmdb';
import '../styles/App.css';

export default function Dashboard() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Banner />
        <div className="app__rows">
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals + '?with_networks=213'}
            isLargeRow
          />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
      </main>
    </div>
  );
}

