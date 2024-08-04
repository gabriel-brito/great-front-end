import "./styles.css";

export default function App() {
  return (
    <>
      <header style={{ height: "60px", width: "100%", textAlign: "center" }}>
        Header
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          height: "calc(100vh - 160px)",
          width: "100%",
        }}
      >
        <nav
          style={{
            width: "100px",
          }}
        >
          Navigation
        </nav>

        <main style={{ width: "100%" }}>Main</main>

        <aside
          style={{
            width: "100px",
          }}
        >
          Sidebar
        </aside>
      </div>

      <footer style={{ height: "100px", width: "100%", textAlign: "center" }}>
        Footer
      </footer>
    </>
  );
}
