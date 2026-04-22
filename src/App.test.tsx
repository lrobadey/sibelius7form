import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { allDiagramLabels } from "./data/figure35";

describe("App", () => {
  it("renders the encoded diagram labels", () => {
    render(<App />);

    const pageText = document.body.textContent?.replace(/\s+/g, "").trim() ?? "";

    allDiagramLabels.forEach((label) => {
      const normalizedLabel = label.replace(/\s+/g, "").trim();
      expect(pageText).toContain(normalizedLabel);
    });
  });

  it("hides a row independently", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Hide" })[0]);

    expect(screen.queryByText("Introduction.")).not.toBeInTheDocument();
    expect(screen.getAllByText("Slow").length).toBeGreaterThan(0);
  });

  it("solos a row and restores prior visibility when unsoloed", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Hide" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Solo" })[2]);

    expect(screen.queryByText("Introduction.")).not.toBeInTheDocument();
    expect(screen.getByText("Telos I")).toBeInTheDocument();
    expect(screen.queryByText("Massive auxiliary cadence!")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Unsolo" }));

    expect(screen.queryByText("Introduction.")).not.toBeInTheDocument();
    expect(screen.getAllByText("Slow").length).toBeGreaterThan(0);
    expect(screen.getByText("Telos I")).toBeInTheDocument();
  });

  it("renders the compact figure header", () => {
    render(<App />);

    expect(screen.getAllByText("Figure 3.5").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Formal Design Counterpoint" })).toBeInTheDocument();
  });
});
