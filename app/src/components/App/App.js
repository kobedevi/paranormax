import MainRouting from './MainRouting';
import Navigation from './Nav/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <main className="flex-shrink-0">
        <MainRouting />
      </main>
      <footer>

      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </div>
  );
}

export default App;
