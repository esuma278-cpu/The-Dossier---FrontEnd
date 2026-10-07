import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="App">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>THE DOSSIER</h2>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      </nav>


      {/* HOME PAGE */}
      {page === "home" && (
        <div className="home">

          <div className="home-left">
            <p className="small-title">DIGITAL MYSTERY INVESTIGATION</p>

            <h1>
              THE
              <br />
              DOSSIER
            </h1>

            <p>
              Investigate mysterious cases, examine suspects,
              analyze evidence and uncover the truth.
            </p>

            <button
              className="main-button"
              onClick={() => setPage("login")}
            >
              Start Investigation
            </button>
          </div>

          <div className="home-right">
            <div className="case-box">
              <p>CASE FILE</p>
              <h2>CONFIDENTIAL</h2>
              <hr />
              <p>ACCESS: RESTRICTED</p>
              <p>STATUS: ACTIVE</p>
              <p>CLASSIFICATION: MYSTERY</p>
            </div>
          </div>

        </div>
      )}


      {/* LOGIN PAGE */}
      {page === "login" && (
        <div className="auth-page">

          <div className="auth-left">
            <h1>WELCOME BACK.</h1>

            <p>
              Enter your investigator credentials
              to access the dossier.
            </p>
          </div>

          <div className="auth-card">

            <h2>LOGIN</h2>

            <form>

              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
              />

              <button
                type="button"
                className="main-button"
                onClick={() => setPage("dashboard")}
              >
                Login
              </button>

            </form>

            <p className="switch-text">
              Don't have an account?
              <button onClick={() => setPage("register")}>
                Register
              </button>
            </p>

          </div>

        </div>
      )}


      {/* REGISTER PAGE */}
      {page === "register" && (
        <div className="auth-page">

          <div className="auth-left">
            <h1>JOIN THE DOSSIER.</h1>

            <p>
              Create your investigator account
              and begin solving mysteries.
            </p>
          </div>

          <div className="auth-card">

            <h2>REGISTER</h2>

            <form>

              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
              />

              <button
                type="button"
                className="main-button"
                onClick={() => setPage("login")}
              >
                Create Account
              </button>

            </form>

            <p className="switch-text">
              Already have an account?
              <button onClick={() => setPage("login")}>
                Login
              </button>
            </p>

          </div>

        </div>
      )}


      {/* DASHBOARD */}
      {page === "dashboard" && (
        <div className="dashboard">

          <div className="dashboard-header">
            <div>
              <p className="small-title">
                INVESTIGATOR DASHBOARD
              </p>

              <h1>Available Cases</h1>
            </div>

            <button onClick={() => setPage("home")}>
              Logout
            </button>
          </div>


          <div className="cases">

            <div className="case-card">
              <p>CASE #001</p>
              <h2>The Midnight Manor</h2>

              <p>
                Investigate a mysterious incident
                inside an old mansion.
              </p>

              <button>View Case</button>
            </div>


            <div className="case-card">
              <p>CASE #002</p>
              <h2>The Vanishing File</h2>

              <p>
                A confidential file has mysteriously
                disappeared.
              </p>

              <button>View Case</button>
            </div>


            <div className="case-card">
              <p>CASE #003</p>
              <h2>The Silent Witness</h2>

              <p>
                Reopen an old case and uncover
                what really happened.
              </p>

              <button>View Case</button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;