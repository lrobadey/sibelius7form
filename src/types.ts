export type Measure = number;

export interface MeasureRange {
  start: Measure;
  end: Measure;
}

export interface AxisMarker {
  measure: Measure;
  label: string;
  align?: "start" | "middle" | "end";
}

interface BaseItem {
  id: string;
}

export interface DividerItem extends BaseItem {
  type: "divider";
  measure: Measure;
  y1: number;
  y2: number;
  weight?: "thin" | "thick";
}

export interface SectionItem extends BaseItem {
  type: "section";
  range: MeasureRange;
  title: string;
  subtitle?: string;
  titleY: number;
  subtitleY?: number;
  align?: "start" | "center";
  titleStyle?: "regular" | "italic";
  subtitleStyle?: "regular" | "italic";
  titleWeight?: "regular" | "semibold" | "bold";
}

export interface AnnotationItem extends BaseItem {
  type: "annotation";
  measure: Measure;
  y: number;
  text: string;
  align?: "start" | "center" | "end";
  style?: "regular" | "italic";
  weight?: "regular" | "semibold" | "bold";
  size?: "sm" | "md" | "lg";
}

export interface ArrowItem extends BaseItem {
  type: "arrow";
  range: MeasureRange;
  y: number;
  lineWeight?: "thin" | "thick";
  startDot?: boolean;
  labelStart?: string;
  labelCenter?: string;
  labelEnd?: string;
}

export interface BracketItem extends BaseItem {
  type: "bracket";
  range: MeasureRange;
  y: number;
  label: string;
  labelY: number;
}

export interface CadenceItem extends BaseItem {
  type: "cadence";
  range: MeasureRange;
  y: number;
  leftLabel: string;
  rightLabel: string;
  caption: string;
  captionY: number;
}

export type TimelineItem =
  | DividerItem
  | SectionItem
  | AnnotationItem
  | ArrowItem
  | BracketItem
  | CadenceItem;

export interface FormRow {
  id: string;
  name: string;
  description: string;
  height: number;
  items: TimelineItem[];
}

export interface FormDiagram {
  title: string;
  subtitle: string;
  quote: string;
  measureExtent: MeasureRange;
  axisMarkers: AxisMarker[];
  rows: FormRow[];
}
