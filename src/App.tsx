import { useState } from "react";
import { figure35 } from "./data/figure35";
import { TimelineDiagram } from "./components/TimelineDiagram";

const initialVisibility = Object.fromEntries(
  figure35.lanes.map((row) => [row.id, true]),
) as Record<string, boolean>;

function App() {
  const [visibility, setVisibility] =
    useState<Record<string, boolean>>(initialVisibility);
  const [soloRowId, setSoloRowId] = useState<string | null>(null);

  const visibleRows = soloRowId
    ? figure35.lanes.filter((row) => row.id === soloRowId)
    : figure35.lanes.filter((row) => visibility[row.id]);

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
      <section className="figure-header">
        <p className="eyebrow">{figure35.title}</p>
        <div className="figure-heading">
          <h1>{figure35.subtitle}</h1>
          <p>{figure35.caption}</p>
        </div>
      </section>

      <section className="figure-toolbar" aria-label="Diagram layer controls">
        {figure35.lanes.map((row) => {
          const isSolo = soloRowId === row.id;
          const isVisible = visibility[row.id];

          return (
            <article key={row.id} className="lane-toggle">
              <div className="lane-copy">
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

      <section className="diagram-panel" aria-label="Figure 3.5 diagram">
        <TimelineDiagram rows={visibleRows} />
      </section>
    </main>
  );
}

export default App;
