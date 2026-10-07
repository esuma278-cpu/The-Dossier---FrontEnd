import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <h2>THE DOSSIER</h2>

        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>

      <main>
        <h1>THE DOSSIER</h1>

        <p>
          Digital Mystery Investigation Platform
        </p>

        <p>
          Investigate cases, examine suspects, analyze evidence,
          follow timelines, and solve mysteries.
        </p>

        <button className="start-btn">
          Start Investigation
        </button>
      </main>

      <section>
        <h2>Available Cases</h2>

        <div className="cases">
          <div className="case-card">
            <h3>The Midnight Manor</h3>
            <p>
              Investigate a mysterious incident inside an old mansion.
            </p>
            <button>View Case</button>
          </div>

          <div className="case-card">
            <h3>The Vanishing File</h3>
            <p>
              A confidential file has mysteriously disappeared.
            </p>
            <button>View Case</button>
          </div>

          <div className="case-card">
            <h3>The Silent Witness</h3>
            <p>
              Reopen an old case and uncover what really happened.
            </p>
            <button>View Case</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;