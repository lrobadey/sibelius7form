import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { figure35 } from "../data/figure35";
import { normalizeMeasure, TimelineDiagram } from "./TimelineDiagram";

describe("TimelineDiagram", () => {
  it("keeps major axis markers in left-to-right order", () => {
    const markerMeasures = figure35.measureMarkers.map((marker) => marker.measure);

    expect(markerMeasures).toEqual([...markerMeasures].sort((a, b) => a - b));
    expect(normalizeMeasure(1)).toBe(0);
    expect(normalizeMeasure(525)).toBe(1);
  });

  it("renders a shared measure structure when one row is soloed", () => {
    render(<TimelineDiagram rows={[figure35.lanes[1]]} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("521. - 525.")).toBeInTheDocument();
    expect(screen.getByTestId("row-tempo-process")).toBeInTheDocument();
  });

  it("preserves exact figure labels for development details", () => {
    render(<TimelineDiagram rows={[figure35.lanes[0]]} />);
    const text = document.body.textContent ?? "";

    expect(screen.getByText("Development.")).toBeInTheDocument();
    expect(screen.getByText("(Scherzo | Trio | “false” | “real” )")).toBeInTheDocument();
    expect(text).toContain("transition ⇔");
    expect(text).toContain("Retransition.");
    expect(text).toContain("reprise   reprise");
  });
});
