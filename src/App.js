import opsLogo from './assets/logo_ops.png';
import './App.css';
import { MeddraSearch } from './pages/MeddraSearch';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <div>
          <img src={opsLogo} alt="OPS Logo" style={{ width: '300px', height: 'auto', position: 'fixed', display: 'flex', alignContent: 'flex-end', paddingLeft: '65rem' }} />
        </div>
        <h1 className="text-2xl font-bold">Buscador MedDRA</h1>
        <p className="text-gray-700">Busque un término MedDRA</p>
        <MeddraSearch />
      </main>
    </div>
  );
}

export default App;
