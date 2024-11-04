import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Forging Futures in the Bussines Realm.</h1>
      <p>Hos oss skapas en smidig skift från studentkliv till arbetsliv</p>
      <div className="section-heading">
      <h2>Vad erbjuder vi?</h2>
      </div>
      <div className='section-content'>
      <p>EkonOfficium grundades som en lösning på den stora 
        obalansen mellan efterfrågan och utbud mellan dagens 
        ekonomistudenter och jobb. Vi är därmed specialiserade 
        på att hitta den perfekta studentkonsulten för just era behov, 
        vare sig det är redovisning, revision, finans, 
        marknadsföring eller management. 
        Med grundare som själva är ekonomer tror vi på EkonOfficium starkt på att specialister rekryterar specialister.</p>
        </div>
      {/* More static content goes here */}
    </div>
  );
}
export default Home;