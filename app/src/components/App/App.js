import MainRouting from './MainRouting';
import Navigation from './Nav/Navigation';
import "../../index.css"

function App() {
  return (
    <div className="App">
      <Navigation/>
      <main class="flex-shrink-0">
        <MainRouting />
      </main>
      <footer>

      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" defer></script>
      <script src="https://cdn.startbootstrap.com/sb-forms-latest.js" defer></script>
    </div>
  );
}

export default App;
