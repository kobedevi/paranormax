import MainRouting from './MainRouting';
import Navigation from './Nav/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <main>
        <MainRouting />
      </main>
    </div>
  );
}

export default App;
