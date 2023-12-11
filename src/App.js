import React from "react"
// import logo from './logo.svg';
import WeatherEventsTable from './components/WeatherAndEventsTable';
import './App.css';
//test deploy default branch

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <WeatherEventsTable
          style={{
            display: "block",
            overflow: 'auto'
          }}
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Learn React */}
        </a>
      </header>
    </div>
  );
}

export default App;
