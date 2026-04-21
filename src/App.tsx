import { useState } from "react";
import { figure35 } from "./data/figure35";
import { TimelineDiagram } from "./components/TimelineDiagram";

const initialVisibility = Object.fromEntries(
  figure35.rows.map((row) => [row.id, true]),
) as Record<string, boolean>;

function App() {
  const [visibility, setVisibility] =
    useState<Record<string, boolean>>(initialVisibility);
  const [soloRowId, setSoloRowId] = useState<string | null>(null);

  const visibleRows = soloRowId
    ? figure35.rows.filter((row) => row.id === soloRowId)
    : figure35.rows.filter((row) => visibility[row.id]);

  function toggleRow(rowId: string) {
    setVisibility((current) => {
      const nextValue = !current[rowId];
      if (!nextValue && soloRowId === rowId) {
        setSoloRowId(null);
      }

      return {
        ...current,
        [rowId]: nextValue,
      };
    });
  }

  function toggleSolo(rowId: string) {
    setVisibility((current) => ({
      ...current,
      [rowId]: true,
    }));
    setSoloRowId((current) => (current === rowId ? null : rowId));
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{figure35.title}</p>
          <h1>{figure35.subtitle}</h1>
          <p className="quote">{figure35.quote}</p>
        </div>
      </section>

      <section className="controls" aria-label="Diagram layer controls">
        {figure35.rows.map((row) => {
          const isSolo = soloRowId === row.id;
          const isVisible = visibility[row.id];

          return (
            <article key={row.id} className="layer-control">
              <div className="layer-copy">
                <h2>{row.name}</h2>
                <p>{row.description}</p>
              </div>
              <div className="layer-actions">
                <button
                  type="button"
                  className={`control-button ${isVisible ? "active" : ""}`}
                  aria-pressed={isVisible}
                  onClick={() => toggleRow(row.id)}
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  className={`control-button ${isSolo ? "active accent" : ""}`}
                  aria-pressed={isSolo}
                  onClick={() => toggleSolo(row.id)}
                >
                  {isSolo ? "Unsolo" : "Solo"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="diagram-panel">
        <TimelineDiagram rows={visibleRows} />
      </section>
    </main>
  );
}

export default App;
