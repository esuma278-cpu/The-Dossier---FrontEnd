import React, { useState } from "react";
import "./App.css";
import API_BASE_URL from "./api";

// Temporary sample cases.
// We will replace these with cases fetched from MySQL.
const cases = [
  {
    id: 1,
    title: "The Midnight Manor",
    category: "Murder Mystery",
    difficulty: "Hard",
    status: "Open",
    description:
      "A wealthy businessman is found dead inside his locked study. Five people were inside the mansion that night.",
    suspects: [
      {
        name: "Adrian Black",
        occupation: "Businessman",
        status: "Person of Interest",
      },
      {
        name: "Elena Black",
        occupation: "Author",
        status: "Suspect",
      },
      {
        name: "Marcus Reed",
        occupation: "Business Partner",
        status: "Suspect",
      },
    ],
    evidence: [
      "Broken pocket watch",
      "Unidentified fingerprint",
      "Torn letter",
      "Glass of red wine",
    ],
    timeline: [
      "9:00 PM — Guests arrive",
      "10:15 PM — Dinner begins",
      "11:00 PM — Victim enters study",
      "11:45 PM — Power outage",
      "12:10 AM — Body discovered",
    ],
  },
  {
    id: 2,
    title: "The Vanishing File",
    category: "Investigation",
    difficulty: "Medium",
    status: "Open",
    description:
      "A confidential research file disappears from a supposedly secure laboratory.",
    suspects: [
      {
        name: "Dr. Sarah Morgan",
        occupation: "Researcher",
        status: "Person of Interest",
      },
      {
        name: "Daniel Cole",
        occupation: "Security Officer",
        status: "Suspect",
      },
    ],
    evidence: [
      "Security footage",
      "Access card",
      "USB drive",
      "Handwritten note",
    ],
    timeline: [
      "8:00 AM — Laboratory opens",
      "9:30 AM — Research team arrives",
      "11:15 AM — Security system accessed",
      "12:00 PM — File reported missing",
    ],
  },
  {
    id: 3,
    title: "The Silent Witness",
    category: "Cold Case",
    difficulty: "Expert",
    status: "Open",
    description:
      "A decades-old case is reopened after a mysterious piece of evidence surfaces.",
    suspects: [
      {
        name: "Jonathan Hayes",
        occupation: "Former Detective",
        status: "Person of Interest",
      },
      {
        name: "Clara Evans",
        occupation: "Journalist",
        status: "Witness",
      },
    ],
    evidence: [
      "Old photograph",
      "Newspaper clipping",
      "Unknown DNA sample",
    ],
    timeline: [
      "1989 — Original investigation",
      "1990 — Case closed",
      "2026 — New evidence discovered",
    ],
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [selectedCase, setSelectedCase] = useState(null);
  const [user, setUser] = useState(null);
  const [theory, setTheory] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- LOGIN ----------------

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.username.value.trim();
    const password = form.password.value;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Login failed. Check your username and password."
        );
        return;
      }

      setUser({
        username: data.username || username,
        role: data.role || "INVESTIGATOR",
      });

      setPage("dashboard");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Could not connect to the backend. Make sure Spring Boot is running and the API URL is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- REGISTRATION ----------------

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role: "INVESTIGATOR",
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(
          errorMessage ||
            `Registration failed (${response.status})`
        );
      }

      alert(
        "Registration successful! You can now login."
      );

      form.reset();
      setAuthMode("login");
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.message.includes("Failed to fetch") ||
        error instanceof TypeError
      ) {
        alert(
          "Could not connect to the backend. Check that Spring Boot is running and CORS is configured."
        );
      } else {
        alert(
          error.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGOUT ----------------

  const logout = () => {
    setUser(null);
    setPage("home");
    setSelectedCase(null);
    setTheory("");
  };

  // ---------------- OPEN CASE ----------------

  const openCase = (caseItem) => {
    setSelectedCase(caseItem);
    setTheory("");
    setPage("case");
  };

  // ---------------- HOME ----------------

  if (page === "home") {
    return (
      <div className="dossier-app">
        <nav className="navbar">
          <div className="logo">
            THE <span>DOSSIER</span>
          </div>

          <button
            className="nav-button"
            onClick={() => {
              setAuthMode("login");
              setPage("auth");
            }}
          >
            Investigator Login
          </button>
        </nav>

        <main className="hero">
          <div className="hero-content">
            <p className="eyebrow">
              DIGITAL MYSTERY INVESTIGATION PLATFORM
            </p>

            <h1>
              EVERY CLUE
              <br />
              <span>MATTERS.</span>
            </h1>

            <p className="hero-text">
              Enter a world of fictional mysteries. Examine
              evidence, investigate suspects, reconstruct
              timelines, and uncover the truth.
            </p>

            <button
              className="primary-button"
              onClick={() => {
                setAuthMode("register");
                setPage("auth");
              }}
            >
              Begin Investigation →
            </button>
          </div>

          <div className="case-file">
            <div className="stamp">CONFIDENTIAL</div>

            <p>CASE FILE</p>

            <h2>THE DOSSIER</h2>

            <div className="file-line"></div>

            <p className="file-small">
              STATUS: ACTIVE
            </p>

            <p className="file-small">
              ACCESS: RESTRICTED
            </p>

            <p className="file-small">
              CLASSIFICATION: MYSTERY
            </p>
          </div>
        </main>

        <section className="features">
          <div>
            <span>01</span>
            <h3>EXAMINE</h3>
            <p>
              Study suspects, evidence and hidden clues.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>CONNECT</h3>
            <p>
              Follow timelines and piece together the story.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>SOLVE</h3>
            <p>
              Submit your theory and uncover the truth.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // ---------------- AUTH ----------------

  if (page === "auth") {
    return (
      <div className="dossier-app auth-page">
        <div className="auth-card">
          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back
          </button>

          <p className="eyebrow">THE DOSSIER</p>

          <h1>
            {authMode === "login"
              ? "WELCOME BACK."
              : "JOIN THE DOSSIER."}
          </h1>

          <p className="auth-subtitle">
            {authMode === "login"
              ? "Enter your investigator credentials."
              : "Create your investigator profile."}
          </p>

          <form
            onSubmit={
              authMode === "login"
                ? handleLogin
                : handleRegister
            }
          >
            <label>USERNAME</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              autoComplete="username"
              required
            />

            {authMode === "register" && (
              <>
                <label>EMAIL</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  required
                />
              </>
            )}

            <label>PASSWORD</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete={
                authMode === "login"
                  ? "current-password"
                  : "new-password"
              }
              required
            />

            <button
              className="primary-button full-width"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "PLEASE WAIT..."
                : authMode === "login"
                ? "ACCESS DOSSIER"
                : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="auth-switch">
            {authMode === "login" ? (
              <>
                New investigator?

                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already registered?

                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------

  if (page === "dashboard") {
    return (
      <div className="dossier-app dashboard">
        <nav className="navbar">
          <div className="logo">
            THE <span>DOSSIER</span>
          </div>

          <div className="nav-user">
            <span>{user?.username}</span>

            <button
              className="nav-button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <p className="eyebrow">
                INVESTIGATOR DASHBOARD
              </p>

              <h1>Choose your case.</h1>
            </div>

            <div className="role-badge">
              {user?.role || "INVESTIGATOR"}
            </div>
          </div>

          <div className="case-grid">
            {cases.map((caseItem) => (
              <div
                className="case-card"
                key={caseItem.id}
              >
                <div className="case-card-top">
                  <span>
                    CASE #
                    {String(caseItem.id).padStart(3, "0")}
                  </span>

                  <span>{caseItem.status}</span>
                </div>

                <h2>{caseItem.title}</h2>

                <p>{caseItem.description}</p>

                <div className="case-meta">
                  <span>{caseItem.category}</span>
                  <span>{caseItem.difficulty}</span>
                </div>

                <button
                  className="secondary-button"
                  onClick={() => openCase(caseItem)}
                >
                  OPEN CASE →
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ---------------- CASE DETAILS ----------------

  if (page === "case" && selectedCase) {
    return (
      <div className="dossier-app dashboard">
        <nav className="navbar">
          <div className="logo">
            THE <span>DOSSIER</span>
          </div>

          <button
            className="nav-button"
            onClick={() => setPage("dashboard")}
          >
            ← Cases
          </button>
        </nav>

        <main className="case-details">
          <div className="case-header">
            <p className="eyebrow">
              CASE #
              {String(selectedCase.id).padStart(3, "0")}
            </p>

            <h1>{selectedCase.title}</h1>

            <p>{selectedCase.description}</p>
          </div>

          <section className="investigation-section">
            <div className="section-block">
              <h2>01 — SUSPECTS</h2>

              {selectedCase.suspects.map(
                (suspect, index) => (
                  <div className="suspect" key={index}>
                    <div>
                      <strong>{suspect.name}</strong>
                      <p>{suspect.occupation}</p>
                    </div>

                    <span>{suspect.status}</span>
                  </div>
                )
              )}
            </div>

            <div className="section-block">
              <h2>02 — EVIDENCE</h2>

              <div className="evidence-list">
                {selectedCase.evidence.map(
                  (item, index) => (
                    <div className="evidence" key={index}>
                      <span>
                        #
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="section-block">
              <h2>03 — TIMELINE</h2>

              <div className="timeline">
                {selectedCase.timeline.map(
                  (event, index) => (
                    <div
                      className="timeline-item"
                      key={index}
                    >
                      <span></span>
                      <p>{event}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="theory-section">
              <p className="eyebrow">
                FINAL INVESTIGATION
              </p>

              <h2>What's your theory?</h2>

              <textarea
                value={theory}
                onChange={(e) =>
                  setTheory(e.target.value)
                }
                placeholder="Connect the clues. Explain what you think happened..."
              />

              <button
                className="primary-button"
                onClick={() => {
                  if (!theory.trim()) {
                    alert(
                      "Write your theory before submitting."
                    );
                    return;
                  }

                  alert(
                    "Theory submission is not connected to the backend yet."
                  );
                }}
              >
                SUBMIT THEORY →
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return null;
}

export default App;