import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { figure35 } from "../data/figure35";
import { normalizeMeasure, TimelineDiagram } from "./TimelineDiagram";

describe("TimelineDiagram", () => {
  it("keeps major axis markers in left-to-right order", () => {
    const markerMeasures = figure35.axisMarkers.map((marker) => marker.measure);

    expect(markerMeasures).toEqual([...markerMeasures].sort((a, b) => a - b));
    expect(normalizeMeasure(1)).toBe(0);
    expect(normalizeMeasure(525)).toBe(1);
  });

  it("renders a shared measure structure when one row is soloed", () => {
    render(<TimelineDiagram rows={[figure35.rows[1]]} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("521. - 525.")).toBeInTheDocument();
    expect(screen.getByTestId("row-tempo-process")).toBeInTheDocument();
  });
});
