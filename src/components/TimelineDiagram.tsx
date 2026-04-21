import type { CSSProperties } from "react";
import { figure35 } from "../data/figure35";
import type {
  AnnotationItem,
  ArrowItem,
  AxisMarker,
  BracketItem,
  CadenceItem,
  DividerItem,
  FormRow,
  Measure,
  MeasureRange,
  SectionItem,
  TimelineItem,
} from "../types";

const VIEWBOX_WIDTH = 1400;
const LEFT_GUTTER = 52;
const RIGHT_GUTTER = 48;
const ROW_GAP = 18;
const AXIS_HEIGHT = 64;
const HEADER_HEIGHT = 18;

const measureSpan = figure35.measureExtent.end - figure35.measureExtent.start;
const chartWidth = VIEWBOX_WIDTH - LEFT_GUTTER - RIGHT_GUTTER;

const fontStyles: Record<string, CSSProperties> = {
  regular: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
  semibold: { fontWeight: 600 },
  bold: { fontWeight: 700 },
  sm: { fontSize: 15 },
  md: { fontSize: 18 },
  lg: { fontSize: 22 },
};

function measureToX(measure: Measure): number {
  const normalized = (measure - figure35.measureExtent.start) / measureSpan;
  return LEFT_GUTTER + normalized * chartWidth;
}

function rangeToWidth(range: MeasureRange): number {
  return measureToX(range.end) - measureToX(range.start);
}

function wrapSvgText(text: string): string[] {
  return text.split("\n");
}

function markerAnchor(align?: AxisMarker["align"]) {
  if (align === "start") {
    return "start";
  }
  if (align === "end") {
    return "end";
  }
  return "middle";
}

function renderDivider(item: DividerItem) {
  return (
    <line
      key={item.id}
      x1={measureToX(item.measure)}
      y1={item.y1}
      x2={measureToX(item.measure)}
      y2={item.y2}
      stroke="currentColor"
      strokeWidth={item.weight === "thick" ? 2.8 : 1.2}
      opacity={item.weight === "thick" ? 0.92 : 0.72}
    />
  );
}

function renderSection(item: SectionItem) {
  const lines = item.subtitle ? wrapSvgText(item.subtitle) : [];
  const textAnchor = item.align === "center" ? "middle" : "start";
  const x = item.align === "center" ? measureToX((item.range.start + item.range.end) / 2) : measureToX(item.range.start) + 10;

  return (
    <g key={item.id}>
      <text
        x={x}
        y={item.titleY}
        textAnchor={textAnchor}
        className="diagram-title"
        style={{
          ...fontStyles[item.titleStyle ?? "regular"],
          ...fontStyles[item.titleWeight ?? "regular"],
        }}
      >
        {item.title}
      </text>
      {lines.length > 0 ? (
        <text
          x={x}
          y={item.subtitleY}
          textAnchor={textAnchor}
          className="diagram-text"
          style={fontStyles[item.subtitleStyle ?? "regular"]}
        >
          {lines.map((line, index) => (
            <tspan key={`${item.id}-${index}`} x={x} dy={index === 0 ? 0 : 20}>
              {line}
            </tspan>
          ))}
        </text>
      ) : null}
    </g>
  );
}

function renderAnnotation(item: AnnotationItem) {
  const x = measureToX(item.measure);
  const lines = wrapSvgText(item.text);

  return (
    <text
      key={item.id}
      x={x}
      y={item.y}
      textAnchor={
        item.align === "start" ? "start" : item.align === "end" ? "end" : "middle"
      }
      className="diagram-text"
      style={{
        ...fontStyles[item.style ?? "regular"],
        ...fontStyles[item.weight ?? "regular"],
        ...fontStyles[item.size ?? "md"],
      }}
    >
      {lines.map((line, index) => (
        <tspan key={`${item.id}-${index}`} x={x} dy={index === 0 ? 0 : 18}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function renderArrow(item: ArrowItem) {
  const x1 = measureToX(item.range.start);
  const x2 = measureToX(item.range.end);

  return (
    <g key={item.id}>
      <line
        x1={x1}
        y1={item.y}
        x2={x2 - 14}
        y2={item.y}
        stroke="currentColor"
        strokeWidth={item.lineWeight === "thick" ? 3 : 1.5}
      />
      <path
        d={`M ${x2 - 16} ${item.y - 6} L ${x2} ${item.y} L ${x2 - 16} ${item.y + 6}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={item.lineWeight === "thick" ? 3 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {item.startDot ? <circle cx={x1} cy={item.y} r={4} fill="currentColor" /> : null}
      {item.labelStart ? (
        <text x={x1} y={item.y - 14} textAnchor="start" className="diagram-text">
          {item.labelStart}
        </text>
      ) : null}
      {item.labelCenter ? (
        <text
          x={(x1 + x2) / 2}
          y={item.y + 4}
          textAnchor="middle"
          className="diagram-text"
          style={fontStyles.semibold}
        >
          {item.labelCenter}
        </text>
      ) : null}
      {item.labelEnd ? (
        <text
          x={x2 + 8}
          y={item.y + 4}
          textAnchor="start"
          className="diagram-text"
          style={fontStyles.semibold}
        >
          {wrapSvgText(item.labelEnd).map((line, index) => (
            <tspan key={`${item.id}-${index}`} x={x2 + 8} dy={index === 0 ? 0 : 18}>
              {line}
            </tspan>
          ))}
        </text>
      ) : null}
    </g>
  );
}

function renderBracket(item: BracketItem) {
  const x1 = measureToX(item.range.start);
  const x2 = measureToX(item.range.end);

  return (
    <g key={item.id}>
      <path
        d={`M ${x1} ${item.y} L ${x1} ${item.y + 12} L ${x2} ${item.y + 12} L ${x2} ${item.y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
      />
      <text
        x={x1}
        y={item.labelY}
        textAnchor="start"
        className="diagram-text"
        style={{ ...fontStyles.bold, ...fontStyles.lg }}
      >
        {item.label}
      </text>
    </g>
  );
}

function renderCadence(item: CadenceItem) {
  const x1 = measureToX(item.range.start);
  const x2 = measureToX(item.range.end);

  return (
    <g key={item.id}>
      <line x1={x1} y1={item.y} x2={x2 - 16} y2={item.y} stroke="currentColor" strokeWidth={4.4} />
      <path
        d={`M ${x2 - 18} ${item.y - 9} L ${x2} ${item.y} L ${x2 - 18} ${item.y + 9}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={4.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={x1} y={item.y + 8} textAnchor="start" className="diagram-cadence-end">
        {item.leftLabel}
      </text>
      <text x={x2 + 8} y={item.y + 8} textAnchor="start" className="diagram-cadence-end">
        {item.rightLabel}
      </text>
      <text x={x1 + 18} y={item.captionY} textAnchor="start" className="diagram-cadence-caption">
        {item.caption}
      </text>
    </g>
  );
}

function renderItem(item: TimelineItem) {
  switch (item.type) {
    case "divider":
      return renderDivider(item);
    case "section":
      return renderSection(item);
    case "annotation":
      return renderAnnotation(item);
    case "arrow":
      return renderArrow(item);
    case "bracket":
      return renderBracket(item);
    case "cadence":
      return renderCadence(item);
    default:
      return null;
  }
}

interface TimelineDiagramProps {
  rows: FormRow[];
}

export function TimelineDiagram({ rows }: TimelineDiagramProps) {
  const totalHeight =
    HEADER_HEIGHT +
    AXIS_HEIGHT +
    rows.reduce((sum, row) => sum + row.height, 0) +
    Math.max(rows.length - 1, 0) * ROW_GAP +
    20;

  let currentOffset = HEADER_HEIGHT + AXIS_HEIGHT;

  return (
    <div className="timeline-shell">
      <svg
        className="timeline-svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
        role="img"
        aria-labelledby="timeline-title timeline-subtitle"
      >
        <title id="timeline-title">{figure35.title}</title>
        <desc id="timeline-subtitle">{figure35.subtitle}</desc>

        <g transform={`translate(0, ${HEADER_HEIGHT})`}>
          {figure35.axisMarkers.map((marker) => (
            <g key={`${marker.measure}-${marker.label}`}>
              <text
                x={measureToX(marker.measure)}
                y={18}
                textAnchor={markerAnchor(marker.align)}
                className="diagram-axis-label"
              >
                {marker.label}
              </text>
            </g>
          ))}
        </g>

        {rows.map((row) => {
          const offset = currentOffset;
          currentOffset += row.height + ROW_GAP;

          return (
            <g key={row.id} transform={`translate(0, ${offset})`} data-testid={`row-${row.id}`}>
              {row.items.map(renderItem)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function normalizeMeasure(measure: Measure) {
  return Number(((measure - figure35.measureExtent.start) / measureSpan).toFixed(6));
}
