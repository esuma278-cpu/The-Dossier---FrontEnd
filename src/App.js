import React, { useState } from "react";
import "./App.css";
import API_BASE_URL from "./api";

// Temporary sample cases
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

const profiles = [
  {
    role: "INVESTIGATOR",
    name: "Investigator",
    description: "Follow leads, examine evidence, and build your theory.",
    access: "Available to join",
  },
  {
    role: "CASE_CREATOR",
    name: "Case Creator",
    description: "Shape compelling case files, suspects, and evidence.",
    access: "Available to join",
  },
  {
    role: "ADMINISTRATOR",
    name: "Administrator",
    description: "Oversee the archive and manage access.",
    access: "Privately provisioned",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [selectedRole, setSelectedRole] = useState("INVESTIGATOR");
  const [selectedCase, setSelectedCase] = useState(null);
  const [user, setUser] = useState(null);
  const [theory, setTheory] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${API_BASE_URL}/api/users/login`;

      console.log("Login endpoint:", endpoint);
      console.log("Login username:", username);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseText = await response.text();

      console.log("Login HTTP status:", response.status);
      console.log("Login response:", responseText);

      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { message: responseText };
      }

      if (!response.ok) {
        alert(
          data.message ||
            `Login failed with HTTP ${response.status}. Check the browser console.`
        );
        return;
      }

      setUser({
        username: data.username || username,
        role: data.role || "INVESTIGATOR",
      });

      setPage("dashboard");
    } catch (error) {
      console.error("Login request failed:", error);

      alert(
        "Could not connect to the backend. Check that Spring Boot is running at " +
          API_BASE_URL
      );
    } finally {
      setLoading(false);
    }
  };

  // REGISTRATION
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.elements.username.value.trim();
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const role = form.elements.role.value;

    if (!username || !email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role,
          }),
        }
      );

      const responseText = await response.text();

      console.log("Registration HTTP status:", response.status);
      console.log("Registration response:", responseText);

      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { message: responseText };
      }

      if (!response.ok) {
        alert(
          data.message ||
            `Registration failed with HTTP ${response.status}.`
        );
        return;
      }

      alert("Registration successful! You can now log in.");

      form.reset();
      setAuthMode("login");
    } catch (error) {
      console.error("Registration request failed:", error);

      alert(
        "Could not connect to the backend. Check that Spring Boot is running and CORS is configured."
      );
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setPage("home");
    setSelectedCase(null);
    setTheory("");
  };

  // OPEN CASE
  const openCase = (caseItem) => {
    setSelectedCase(caseItem);
    setTheory("");
    setPage("case");
  };

  const openRegistration = (role = "INVESTIGATOR") => {
    setSelectedRole(role);
    setAuthMode("register");
    setPage("auth");
  };

  const activeProfile =
    profiles.find((profile) => profile.role === user?.role) || profiles[0];

  // HOME
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
            Access Portal
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
              onClick={() => openRegistration()}
            >
              Begin Investigation →
            </button>
          </div>

          <div className="case-file">
            <div className="stamp">CONFIDENTIAL</div>

            <p>CASE FILE</p>
            <h2>THE DOSSIER</h2>

            <div className="file-line" />

            <p className="file-small">STATUS: ACTIVE</p>
            <p className="file-small">ACCESS: RESTRICTED</p>
            <p className="file-small">
              CLASSIFICATION: MYSTERY
            </p>
          </div>
        </main>

        <section className="profiles">
          <div className="profiles-heading">
            <p className="eyebrow">YOUR PLACE IN THE ARCHIVE</p>
            <h2>Choose your clearance.</h2>
            <p>Every investigation starts with the right perspective.</p>
          </div>

          <div className="profile-grid">
            {profiles.map((profile, index) => (
              <article
                className={`profile-card${
                  profile.role === "ADMINISTRATOR" ? " profile-card-locked" : ""
                }`}
                key={profile.role}
              >
                <span className="profile-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="profile-access">{profile.access}</span>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                {profile.role === "ADMINISTRATOR" ? (
                  <button
                    className="profile-link"
                    onClick={() => {
                      setAuthMode("login");
                      setPage("auth");
                    }}
                  >
                    Administrator sign in →
                  </button>
                ) : (
                  <button
                    className="profile-link"
                    onClick={() => openRegistration(profile.role)}
                  >
                    Create {profile.name.toLowerCase()} profile →
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="features">
          <div>
            <span>01</span>
            <h3>EXAMINE</h3>
            <p>Study suspects, evidence and hidden clues.</p>
          </div>

          <div>
            <span>02</span>
            <h3>CONNECT</h3>
            <p>Follow timelines and piece together the story.</p>
          </div>

          <div>
            <span>03</span>
            <h3>SOLVE</h3>
            <p>Submit your theory and uncover the truth.</p>
          </div>
        </section>
      </div>
    );
  }

  // LOGIN / REGISTRATION
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
              : "Choose a profile to begin your work in the archive."}
          </p>

          <form
            onSubmit={
              authMode === "login"
                ? handleLogin
                : handleRegister
            }
          >
            <label htmlFor="username">USERNAME</label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              autoComplete="username"
              required
            />

            {authMode === "register" && (
              <>
                <label htmlFor="email">EMAIL</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  required
                />

                <fieldset className="profile-options">
                  <legend>SELECT YOUR PROFILE</legend>
                  {profiles
                    .filter((profile) => profile.role !== "ADMINISTRATOR")
                    .map((profile) => (
                      <label
                        className={`profile-option${
                          selectedRole === profile.role
                            ? " profile-option-selected"
                            : ""
                        }`}
                        key={profile.role}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={profile.role}
                          checked={selectedRole === profile.role}
                          onChange={() => setSelectedRole(profile.role)}
                        />
                        <span className="profile-option-copy">
                          <strong>{profile.name}</strong>
                          <span>{profile.description}</span>
                        </span>
                      </label>
                    ))}
                  <p className="admin-note">
                    Administrator access is provisioned privately.
                  </p>
                </fieldset>
              </>
            )}

            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
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

  // DASHBOARD
  if (page === "dashboard") {
    return (
      <div className="dossier-app dashboard">
        <nav className="navbar">
          <div className="logo">
            THE <span>DOSSIER</span>
          </div>

          <div className="nav-user">
            <span>{user?.username}</span>

            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <p className="eyebrow">
                {activeProfile.name.toUpperCase()} WORKSPACE
              </p>

              <h1>Choose your case.</h1>
              <p className="dashboard-subtitle">
                {activeProfile.description}
              </p>
            </div>

            <div className="role-badge">
              {activeProfile.name}
            </div>
          </div>

          <div className="case-grid">
            {cases.map((caseItem) => (
              <div className="case-card" key={caseItem.id}>
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

  // CASE DETAILS
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

              {selectedCase.suspects.map((suspect, index) => (
                <div className="suspect" key={index}>
                  <div>
                    <strong>{suspect.name}</strong>
                    <p>{suspect.occupation}</p>
                  </div>

                  <span>{suspect.status}</span>
                </div>
              ))}
            </div>

            <div className="section-block">
              <h2>02 — EVIDENCE</h2>

              <div className="evidence-list">
                {selectedCase.evidence.map((item, index) => (
                  <div className="evidence" key={index}>
                    <span>
                      #{String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-block">
              <h2>03 — TIMELINE</h2>

              <div className="timeline">
                {selectedCase.timeline.map((event, index) => (
                  <div className="timeline-item" key={index}>
                    <span />
                    <p>{event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="theory-section">
              <p className="eyebrow">FINAL INVESTIGATION</p>
              <h2>What's your theory?</h2>

              <textarea
                value={theory}
                onChange={(e) => setTheory(e.target.value)}
                placeholder="Connect the clues. Explain what you think happened..."
              />

              <button
                className="primary-button"
                onClick={() => {
                  if (!theory.trim()) {
                    alert("Write your theory before submitting.");
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