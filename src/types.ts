export type Measure = number;

export interface MeasureRange {
  start: Measure;
  end: Measure;
}

export interface AxisMarker {
  measure: Measure;
  label: string;
  align?: "start" | "middle" | "end";
  lane?: 0 | 1;
}

export interface SpacingSegment {
  start: Measure;
  end: Measure;
  weight: number;
  minWidth?: number;
}

export interface SpacingProfile {
  segments: SpacingSegment[];
}

export type AnchorSpec =
  | { type: "measure"; measure: Measure }
  | { type: "rangeStart"; range: MeasureRange }
  | { type: "rangeCenter"; range: MeasureRange }
  | { type: "rangeEnd"; range: MeasureRange }
  | { type: "segmentInsetStart"; segmentId: string; inset: number }
  | { type: "segmentInsetEnd"; segmentId: string; inset: number }
  | { type: "opticalClusterCenter"; segmentId: string };

export interface TextBlock {
  id: string;
  lines: string[];
  slot: "title" | "subtitle" | "detail" | "baseline" | "label";
  anchor: AnchorSpec;
  align?: "start" | "center" | "end";
  style?: "regular" | "italic";
  weight?: "regular" | "semibold" | "bold";
  size?: "sm" | "md" | "lg" | "xl";
}

export interface DividerConnector {
  id: string;
  type: "divider";
  measure: Measure;
  weight?: "thin" | "thick";
}

export interface ArrowConnector {
  id: string;
  type: "arrow";
  range: MeasureRange;
  slot: "baseline";
  weight?: "thin" | "thick";
  startDot?: boolean;
  startLabel?: string;
  centerLabel?: string;
  endLabel?: string[];
  labelWeight?: "regular" | "semibold" | "bold";
}

export interface BracketConnector {
  id: string;
  type: "bracket";
  range: MeasureRange;
  slot: "baseline";
  label: string;
}

export interface CadenceConnector {
  id: string;
  type: "cadence";
  range: MeasureRange;
  slot: "baseline";
  leftLabel: string;
  rightLabel: string;
  caption: string;
}

export type ConnectorSpec =
  | DividerConnector
  | ArrowConnector
  | BracketConnector
  | CadenceConnector;

export interface LaneBase {
  id: string;
  name: string;
  description: string;
  height: number;
}

export interface SectionSegment {
  id: string;
  range: MeasureRange;
  title: TextBlock;
  blocks?: TextBlock[];
}

export interface SectionLaneSpec extends LaneBase {
  type: "sectionLane";
  segments: SectionSegment[];
  connectors: DividerConnector[];
}

export interface ProcessLaneSpec extends LaneBase {
  type: "processLane";
  connectors: ArrowConnector[];
}

export interface TelosLaneSpec extends LaneBase {
  type: "telosLane";
  textBlocks: TextBlock[];
  connectors: ArrowConnector[];
}

export interface PhaseLaneSpec extends LaneBase {
  type: "phaseLane";
  textBlocks: TextBlock[];
  connectors: BracketConnector[];
}

export interface CadenceLaneSpec extends LaneBase {
  type: "cadenceLane";
  connectors: CadenceConnector[];
}

export type LaneSpec =
  | SectionLaneSpec
  | ProcessLaneSpec
  | TelosLaneSpec
  | PhaseLaneSpec
  | CadenceLaneSpec;

export interface DiagramSpec {
  title: string;
  subtitle: string;
  caption?: string;
  measureExtent: MeasureRange;
  spacingProfile: SpacingProfile;
  measureMarkers: AxisMarker[];
  lanes: LaneSpec[];
}
