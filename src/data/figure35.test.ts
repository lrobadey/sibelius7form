import { describe, expect, it } from "vitest";
import { figure35 } from "./figure35";

describe("figure35 diagram spec", () => {
  it("keeps all lane spans within the shared measure extent", () => {
    const { start, end } = figure35.measureExtent;

    figure35.lanes.forEach((lane) => {
      if (lane.type === "sectionLane") {
        lane.segments.forEach((segment) => {
          expect(segment.range.start).toBeGreaterThanOrEqual(start);
          expect(segment.range.end).toBeLessThanOrEqual(end);
        });
      }

      lane.connectors.forEach((connector) => {
        if ("range" in connector) {
          expect(connector.range.start).toBeGreaterThanOrEqual(start);
          expect(connector.range.end).toBeLessThanOrEqual(end);
        }
      });
    });
  });

  it("stores exact source labels without raw y coordinates", () => {
    const serialized = JSON.stringify(figure35);

    expect(serialized).toContain("“Design Coda”");
    expect(serialized).toContain("“Catastrophe!” /");
    expect(serialized).toContain("Massive auxiliary cadence!");
    expect(serialized).not.toContain("\"y\":");
    expect(serialized).not.toContain("titleY");
    expect(serialized).not.toContain("subtitleY");
  });

  it("defines a first-class spacing profile for the shared optical scale", () => {
    expect(figure35.spacingProfile.segments.length).toBeGreaterThan(3);
    expect(figure35.spacingProfile.segments[0]).toEqual(
      expect.objectContaining({ start: 1, end: 60 }),
    );
    expect(
      figure35.spacingProfile.segments.every(
        (segment, index, segments) =>
          index === 0 || segment.start === segments[index - 1].end,
      ),
    ).toBe(true);
  });
});
