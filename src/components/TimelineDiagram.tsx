import { useEffect, useRef, useState, type CSSProperties } from "react";
import { figure35 } from "../data/figure35";
import type {
  AnchorSpec,
  ArrowConnector,
  AxisMarker,
  BracketConnector,
  CadenceConnector,
  LaneSpec,
  Measure,
  MeasureRange,
  ProcessLaneSpec,
  SectionLaneSpec,
  SectionSegment,
  SpacingProfile,
  TelosLaneSpec,
  TextBlock,
} from "../types";

const DEFAULT_VIEWBOX_WIDTH = 1160;
const MIN_VIEWBOX_WIDTH = 980;
const DESKTOP_MAX_VIEWBOX_WIDTH = 1320;
const BASE_TITLE_SIZE = 24;
const BASE_TEXT_SIZE = 20;
const BASE_AXIS_LABEL_SIZE = 17;

const fontStyles: Record<string, CSSProperties> = {
  regular: { fontStyle: "normal" },
  italic: { fontStyle: "italic" },
  semibold: { fontWeight: 600 },
  bold: { fontWeight: 700 },
};

interface LayoutConfig {
  viewBoxWidth: number;
  leftGutter: number;
  rightGutter: number;
  rowGap: number;
  axisHeight: number;
  headerHeight: number;
  chartWidth: number;
  titleSize: number;
  textSize: number;
  axisLabelSize: number;
  crowdedTextSize: number;
}

interface MarkerLayout {
  fontSize: number;
  y: number;
}

interface RenderContext {
  layout: LayoutConfig;
  measureToX: (measure: Measure) => number;
  rangeToWidth: (range: MeasureRange) => number;
}

interface SectionSlotMap {
  title: number;
  subtitle: number;
  detail: number;
  baseline: number;
  label: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function markerKey(marker: AxisMarker) {
  return `${marker.measure}-${marker.label}`;
}

function buildLayoutConfig(observedWidth: number): LayoutConfig {
  const viewBoxWidth = clamp(
    Math.round(observedWidth || DEFAULT_VIEWBOX_WIDTH),
    MIN_VIEWBOX_WIDTH,
    DESKTOP_MAX_VIEWBOX_WIDTH,
  );
  const widthRatio = viewBoxWidth / DEFAULT_VIEWBOX_WIDTH;
  const leftGutter = Math.round(clamp(44 * widthRatio, 40, 56));
  const rightGutter = Math.round(clamp(22 * widthRatio, 18, 32));

  return {
    viewBoxWidth,
    leftGutter,
    rightGutter,
    rowGap: Math.round(clamp(10 * widthRatio, 8, 16)),
    axisHeight: 78,
    headerHeight: 18,
    chartWidth: viewBoxWidth - leftGutter - rightGutter,
    titleSize: clamp(BASE_TITLE_SIZE * widthRatio, 20, 24),
    textSize: clamp(BASE_TEXT_SIZE * widthRatio, 16, 20),
    axisLabelSize: clamp(BASE_AXIS_LABEL_SIZE * widthRatio, 14, 17),
    crowdedTextSize: clamp(16 * widthRatio, 13, 16),
  };
}

function buildMeasureToX(layout: LayoutConfig, spacingProfile: SpacingProfile) {
  const segments = spacingProfile.segments;
  const weightTotal = segments.reduce((sum, segment) => sum + segment.weight, 0);
  const preferredWidths = segments.map(
    (segment) => (segment.weight / weightTotal) * layout.chartWidth,
  );
  const minWidths = segments.map((segment) => segment.minWidth ?? 0);
  const minWidthTotal = minWidths.reduce((sum, width) => sum + width, 0);

  let widths = preferredWidths;
  if (minWidthTotal > layout.chartWidth) {
    const scale = layout.chartWidth / minWidthTotal;
    widths = minWidths.map((width) => width * scale);
  } else {
    const extraWidth = layout.chartWidth - minWidthTotal;
    widths = minWidths.map((width, index) => {
      const share = weightTotal === 0 ? extraWidth / segments.length : extraWidth * (segments[index].weight / weightTotal);
      return width + share;
    });
  }

  const starts = widths.reduce<number[]>((acc, width, index) => {
    if (index === 0) {
      acc.push(layout.leftGutter);
      return acc;
    }

    acc.push(acc[index - 1] + widths[index - 1]);
    return acc;
  }, []);

  return (measure: Measure) => {
    if (measure <= segments[0].start) {
      return layout.leftGutter;
    }
    if (measure >= segments[segments.length - 1].end) {
      return layout.leftGutter + layout.chartWidth;
    }

    const segmentIndex = segments.findIndex(
      (segment) => measure >= segment.start && measure <= segment.end,
    );
    const segment = segments[segmentIndex];
    const progress = (measure - segment.start) / (segment.end - segment.start);

    return starts[segmentIndex] + progress * widths[segmentIndex];
  };
}

function rangeToWidth(
  range: MeasureRange,
  measureToX: (measure: Measure) => number,
) {
  return measureToX(range.end) - measureToX(range.start);
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

function computeMarkerLayouts(
  measureToX: (measure: Measure) => number,
  layout: LayoutConfig,
) {
  const markerLayouts = new Map<string, MarkerLayout>();

  figure35.measureMarkers.forEach((marker) => {
    const crowded = marker.measure >= 476 || marker.label.length > 8;
    const lane = marker.lane ?? 0;

    markerLayouts.set(markerKey(marker), {
      fontSize: crowded ? layout.crowdedTextSize : layout.axisLabelSize,
      y: lane === 0 ? 22 : 44,
    });
  });

  return markerLayouts;
}

function blockBaseSize(block: TextBlock, layout: LayoutConfig) {
  switch (block.size) {
    case "sm":
      return Math.max(layout.textSize - 5, 13);
    case "md":
      return Math.max(layout.textSize - 2, 15);
    case "lg":
      return layout.textSize;
    case "xl":
      return layout.titleSize + 2;
    default:
      return layout.textSize;
  }
}

function sectionSlotMap(lane: SectionLaneSpec) {
  const dense = lane.height < 170;

  return {
    title: dense ? 52 : 56,
    subtitle: dense ? 88 : 92,
    detail: dense ? 128 : 134,
    baseline: 0,
    label: 0,
  };
}

function anchorRange(
  anchor: AnchorSpec,
  segmentMap: Map<string, MeasureRange>,
) {
  switch (anchor.type) {
    case "measure":
      return { start: anchor.measure, end: anchor.measure };
    case "rangeStart":
    case "rangeCenter":
    case "rangeEnd":
      return anchor.range;
    case "segmentInsetStart":
    case "segmentInsetEnd":
    case "opticalClusterCenter":
      return segmentMap.get(anchor.segmentId) ?? { start: 1, end: 1 };
    default:
      return { start: 1, end: 1 };
  }
}

function anchorToX(
  anchor: AnchorSpec,
  ctx: RenderContext,
  segmentMap: Map<string, MeasureRange>,
) {
  switch (anchor.type) {
    case "measure":
      return ctx.measureToX(anchor.measure);
    case "rangeStart":
      return ctx.measureToX(anchor.range.start);
    case "rangeCenter":
      return ctx.measureToX((anchor.range.start + anchor.range.end) / 2);
    case "rangeEnd":
      return ctx.measureToX(anchor.range.end);
    case "segmentInsetStart": {
      const segment = segmentMap.get(anchor.segmentId);
      return segment
        ? ctx.measureToX(segment.start) + anchor.inset
        : ctx.measureToX(figure35.measureExtent.start);
    }
    case "segmentInsetEnd": {
      const segment = segmentMap.get(anchor.segmentId);
      return segment
        ? ctx.measureToX(segment.end) - anchor.inset
        : ctx.measureToX(figure35.measureExtent.end);
    }
    case "opticalClusterCenter": {
      const segment = segmentMap.get(anchor.segmentId);
      return segment
        ? ctx.measureToX((segment.start + segment.end) / 2)
        : ctx.measureToX(figure35.measureExtent.start);
    }
    default:
      return ctx.measureToX(figure35.measureExtent.start);
  }
}

function textAnchor(align?: TextBlock["align"]) {
  if (align === "start") {
    return "start";
  }
  if (align === "end") {
    return "end";
  }
  return "middle";
}

function renderTextBlock(
  block: TextBlock,
  slotY: number,
  ctx: RenderContext,
  segmentMap: Map<string, MeasureRange>,
  className: string,
) {
  const x = anchorToX(block.anchor, ctx, segmentMap);
  const spanWidth = ctx.rangeToWidth(anchorRange(block.anchor, segmentMap));
  const crowded = spanWidth < 80 || anchorRange(block.anchor, segmentMap).start >= 476;
  const baseSize = blockBaseSize(block, ctx.layout);
  let fontSize = crowded ? Math.min(baseSize, ctx.layout.crowdedTextSize + 1) : baseSize;

  if (spanWidth < 180) {
    fontSize = Math.min(fontSize, ctx.layout.textSize - 1);
  }
  if (spanWidth < 120) {
    fontSize = Math.min(fontSize, ctx.layout.crowdedTextSize);
  }
  if (block.slot === "title" && spanWidth < 220) {
    fontSize = Math.min(fontSize, ctx.layout.titleSize - 2);
  }

  const lineHeight = fontSize <= 15 ? 16 : fontSize + 2;

  return (
    <text
      key={block.id}
      x={x}
      y={slotY}
      textAnchor={textAnchor(block.align)}
      className={className}
      style={{
        ...fontStyles[block.style ?? "regular"],
        ...fontStyles[block.weight ?? "regular"],
        fontSize,
      }}
    >
      {block.lines.map((line, index) => (
        <tspan key={`${block.id}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function renderSectionDivider(measure: Measure, weight: "thin" | "thick" | undefined, ctx: RenderContext) {
  return (
    <line
      key={`divider-${measure}`}
      x1={ctx.measureToX(measure)}
      y1={22}
      x2={ctx.measureToX(measure)}
      y2={156}
      stroke="currentColor"
      strokeWidth={weight === "thick" ? 2.7 : 1.1}
      opacity={weight === "thick" ? 0.94 : 0.72}
    />
  );
}

function renderArrow(
  connector: ArrowConnector,
  baselineY: number,
  ctx: RenderContext,
) {
  const x1 = ctx.measureToX(connector.range.start);
  const x2 = ctx.measureToX(connector.range.end);
  const labelFontSize =
    connector.range.start >= 476 ? ctx.layout.crowdedTextSize : ctx.layout.textSize;
  const endLineHeight = labelFontSize <= 15 ? 15 : labelFontSize + 1;

  return (
    <g key={connector.id}>
      <line
        x1={x1}
        y1={baselineY}
        x2={x2 - 14}
        y2={baselineY}
        stroke="currentColor"
        strokeWidth={connector.weight === "thick" ? 3 : 1.4}
      />
      <path
        d={`M ${x2 - 16} ${baselineY - 6} L ${x2} ${baselineY} L ${x2 - 16} ${baselineY + 6}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={connector.weight === "thick" ? 3 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {connector.startDot ? <circle cx={x1} cy={baselineY} r={4} fill="currentColor" /> : null}
      {connector.startLabel ? (
        <text
          x={x1}
          y={baselineY - 14}
          textAnchor="start"
          className="diagram-text"
          style={{ fontSize: labelFontSize }}
        >
          {connector.startLabel}
        </text>
      ) : null}
      {connector.centerLabel ? (
        <text
          x={(x1 + x2) / 2}
          y={baselineY + 4}
          textAnchor="middle"
          className="diagram-text"
          style={{
            ...fontStyles[connector.labelWeight ?? "semibold"],
            fontSize: labelFontSize,
          }}
        >
          {connector.centerLabel}
        </text>
      ) : null}
      {connector.endLabel ? (
        <text
          x={x2 + 8}
          y={baselineY + 3}
          textAnchor="start"
          className="diagram-text"
          style={{
            ...fontStyles[connector.labelWeight ?? "regular"],
            fontSize: labelFontSize,
          }}
        >
          {connector.endLabel.map((line, index) => (
            <tspan key={`${connector.id}-${index}`} x={x2 + 8} dy={index === 0 ? 0 : endLineHeight}>
              {line}
            </tspan>
          ))}
        </text>
      ) : null}
    </g>
  );
}

function renderBracket(
  connector: BracketConnector,
  baselineY: number,
  labelY: number,
  ctx: RenderContext,
) {
  const x1 = ctx.measureToX(connector.range.start);
  const x2 = ctx.measureToX(connector.range.end);
  const crowded = connector.range.start >= 476;

  return (
    <g key={connector.id}>
      <path
        d={`M ${x1} ${baselineY} L ${x1} ${baselineY + 12} L ${x2} ${baselineY + 12} L ${x2} ${baselineY}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.1}
      />
      <text
        x={x1}
        y={labelY}
        textAnchor="start"
        className="diagram-text"
        style={{
          ...fontStyles.bold,
          fontSize: crowded ? ctx.layout.crowdedTextSize + 2 : ctx.layout.titleSize - 1,
        }}
      >
        {connector.label}
      </text>
    </g>
  );
}

function renderCadence(
  connector: CadenceConnector,
  baselineY: number,
  captionY: number,
  ctx: RenderContext,
) {
  const x1 = ctx.measureToX(connector.range.start);
  const x2 = ctx.measureToX(connector.range.end);

  return (
    <g key={connector.id}>
      <line
        x1={x1}
        y1={baselineY}
        x2={x2 - 16}
        y2={baselineY}
        stroke="currentColor"
        strokeWidth={4.4}
      />
      <path
        d={`M ${x2 - 18} ${baselineY - 9} L ${x2} ${baselineY} L ${x2 - 18} ${baselineY + 9}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={4.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={x1}
        y={baselineY + 8}
        textAnchor="start"
        className="diagram-cadence-end"
        style={{ fontSize: ctx.layout.titleSize + 7 }}
      >
        {connector.leftLabel}
      </text>
      <text
        x={x2 + 8}
        y={baselineY + 8}
        textAnchor="start"
        className="diagram-cadence-end"
        style={{ fontSize: ctx.layout.titleSize + 7 }}
      >
        {connector.rightLabel}
      </text>
      <text
        x={x1 + 20}
        y={captionY}
        textAnchor="start"
        className="diagram-cadence-caption"
        style={{ fontSize: ctx.layout.titleSize }}
      >
        {connector.caption}
      </text>
    </g>
  );
}

function renderSectionLane(lane: SectionLaneSpec, ctx: RenderContext) {
  const slots = sectionSlotMap(lane);
  const segmentMap = new Map<string, MeasureRange>(
    lane.segments.map((segment) => [segment.id, segment.range]),
  );

  return (
    <g key={lane.id}>
      {lane.connectors.map((connector) =>
        renderSectionDivider(connector.measure, connector.weight, ctx),
      )}
      {lane.segments.flatMap((segment: SectionSegment) => [
        renderTextBlock(segment.title, slots[segment.title.slot], ctx, segmentMap, "diagram-title"),
        ...(segment.blocks ?? []).map((block) =>
          renderTextBlock(block, slots[block.slot], ctx, segmentMap, "diagram-text"),
        ),
      ])}
    </g>
  );
}

function renderProcessLane(lane: ProcessLaneSpec, ctx: RenderContext) {
  const baselineY = 40;

  return (
    <g key={lane.id}>
      {lane.connectors.map((connector) => renderArrow(connector, baselineY, ctx))}
    </g>
  );
}

function renderTelosLane(lane: TelosLaneSpec, ctx: RenderContext) {
  const segmentMap = new Map<string, MeasureRange>();

  return (
    <g key={lane.id}>
      {lane.textBlocks.map((block) => renderTextBlock(block, 18, ctx, segmentMap, "diagram-text"))}
      {lane.connectors.map((connector) => renderArrow(connector, 46, ctx))}
    </g>
  );
}

function renderPhaseLane(
  lane: Extract<LaneSpec, { type: "phaseLane" }>,
  ctx: RenderContext,
) {
  const segmentMap = new Map<string, MeasureRange>();

  return (
    <g key={lane.id}>
      {lane.connectors.map((connector) => renderBracket(connector, 20, 72, ctx))}
      {lane.textBlocks.map((block) => renderTextBlock(block, 58, ctx, segmentMap, "diagram-text"))}
    </g>
  );
}

function renderCadenceLane(
  lane: Extract<LaneSpec, { type: "cadenceLane" }>,
  ctx: RenderContext,
) {
  return (
    <g key={lane.id}>
      {lane.connectors.map((connector) => renderCadence(connector, 30, 72, ctx))}
    </g>
  );
}

function renderLane(lane: LaneSpec, ctx: RenderContext) {
  switch (lane.type) {
    case "sectionLane":
      return renderSectionLane(lane, ctx);
    case "processLane":
      return renderProcessLane(lane, ctx);
    case "telosLane":
      return renderTelosLane(lane, ctx);
    case "phaseLane":
      return renderPhaseLane(lane, ctx);
    case "cadenceLane":
      return renderCadenceLane(lane, ctx);
    default:
      return null;
  }
}

interface TimelineDiagramProps {
  rows: LaneSpec[];
}

export function TimelineDiagram({ rows }: TimelineDiagramProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [observedWidth, setObservedWidth] = useState(DEFAULT_VIEWBOX_WIDTH);
  const layout = buildLayoutConfig(observedWidth);
  const measureToX = buildMeasureToX(layout, figure35.spacingProfile);
  const ctx: RenderContext = {
    layout,
    measureToX,
    rangeToWidth: (range) => rangeToWidth(range, measureToX),
  };
  const markerLayouts = computeMarkerLayouts(measureToX, layout);
  const totalHeight =
    layout.headerHeight +
    layout.axisHeight +
    rows.reduce((sum, row) => sum + row.height, 0) +
    Math.max(rows.length - 1, 0) * layout.rowGap +
    24;

  useEffect(() => {
    const element = shellRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setObservedWidth(element.getBoundingClientRect().width);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  let currentOffset = layout.headerHeight + layout.axisHeight;

  return (
    <div ref={shellRef} className="timeline-shell">
      <svg
        className="timeline-svg"
        viewBox={`0 0 ${layout.viewBoxWidth} ${totalHeight}`}
        role="img"
        aria-labelledby="timeline-title timeline-subtitle"
      >
        <title id="timeline-title">{figure35.title}</title>
        <desc id="timeline-subtitle">{figure35.subtitle}</desc>

        <g transform={`translate(0, ${layout.headerHeight})`}>
          {figure35.measureMarkers.map((marker) => (
            <text
              key={markerKey(marker)}
              x={ctx.measureToX(marker.measure)}
              y={markerLayouts.get(markerKey(marker))?.y ?? 22}
              textAnchor={markerAnchor(marker.align)}
              className="diagram-axis-label"
              style={{
                fontSize: markerLayouts.get(markerKey(marker))?.fontSize ?? layout.axisLabelSize,
              }}
            >
              {marker.label}
            </text>
          ))}
        </g>

        {rows.map((row) => {
          const offset = currentOffset;
          currentOffset += row.height + layout.rowGap;

          return (
            <g key={row.id} transform={`translate(0, ${offset})`} data-testid={`row-${row.id}`}>
              {renderLane(row, ctx)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function normalizeMeasure(measure: Measure) {
  return Number(
    (
      (measure - figure35.measureExtent.start) /
      (figure35.measureExtent.end - figure35.measureExtent.start)
    ).toFixed(6),
  );
}
