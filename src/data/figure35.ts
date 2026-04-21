import type { FormDiagram, TimelineItem } from "../types";

const formalItems: TimelineItem[] = [
  { type: "divider", id: "intro-ii", measure: 60, y1: 28, y2: 150, weight: "thin" },
  { type: "divider", id: "dev-start", measure: 208, y1: 28, y2: 150, weight: "thick" },
  { type: "divider", id: "recap-start", measure: 476, y1: 28, y2: 150, weight: "thick" },
  { type: "divider", id: "coda-start", measure: 521, y1: 28, y2: 150, weight: "thick" },
  { type: "divider", id: "conclusion-end", measure: 525, y1: 28, y2: 150, weight: "thick" },
  {
    type: "section",
    id: "introduction",
    range: { start: 1, end: 60 },
    title: "Introduction.",
    subtitle: "Part I        Part II",
    titleY: 54,
    subtitleY: 78,
    align: "start",
    titleWeight: "bold",
  },
  {
    type: "section",
    id: "exposition",
    range: { start: 60, end: 208 },
    title: "Exposition.",
    subtitle: "1st Group.    2nd Group.    Closing - Group.",
    titleY: 54,
    subtitleY: 78,
    align: "start",
    titleWeight: "bold",
  },
  {
    type: "annotation",
    id: "aino-expo",
    measure: 79,
    y: 116,
    text: "“Aino”",
    align: "center",
    style: "italic",
    size: "lg",
  },
  {
    type: "section",
    id: "development",
    range: { start: 208, end: 476 },
    title: "Development.",
    subtitle: "“Aino”",
    titleY: 54,
    subtitleY: 116,
    align: "start",
    titleWeight: "bold",
  },
  {
    type: "annotation",
    id: "scherzo-trio",
    measure: 334,
    y: 92,
    text: "(Scherzo | Trio | “false” reprise “real” reprise)",
    align: "center",
    size: "md",
  },
  {
    type: "annotation",
    id: "retransition",
    measure: 430,
    y: 92,
    text: "transition ⇔ Retransition.",
    align: "center",
    size: "md",
  },
  {
    type: "section",
    id: "recapitulation",
    range: { start: 476, end: 521 },
    title: "Recapitulation.",
    subtitle: "1st Group.    “Catastrophe!” /",
    titleY: 54,
    subtitleY: 78,
    align: "start",
    titleWeight: "bold",
  },
  {
    type: "annotation",
    id: "aino-recap",
    measure: 484,
    y: 116,
    text: "“Aino”",
    align: "start",
    style: "italic",
    size: "lg",
  },
  {
    type: "annotation",
    id: "aino-trapped",
    measure: 497,
    y: 116,
    text: "Aino-trapped!",
    align: "start",
    style: "italic",
  },
  {
    type: "section",
    id: "design-coda",
    range: { start: 510, end: 521 },
    title: "“Design Coda”",
    subtitle: "Valse Triste-\nallusion",
    titleY: 52,
    subtitleY: 90,
    align: "center",
    titleWeight: "bold",
  },
  {
    type: "section",
    id: "conclusion",
    range: { start: 521, end: 525 },
    title: "Conclusion.",
    titleY: 92,
    align: "center",
  },
];

const tempoItems: TimelineItem[] = [
  {
    type: "arrow",
    id: "slow-1",
    range: { start: 1, end: 93 },
    y: 32,
    labelStart: "Slow",
    lineWeight: "thin",
  },
  {
    type: "arrow",
    id: "fast-1",
    range: { start: 93, end: 208 },
    y: 32,
    labelStart: "Fast",
    lineWeight: "thin",
  },
  {
    type: "arrow",
    id: "slow-2",
    range: { start: 208, end: 285 },
    y: 32,
    labelStart: "Slow",
    lineWeight: "thin",
  },
  {
    type: "arrow",
    id: "fast-2",
    range: { start: 285, end: 476 },
    y: 32,
    labelStart: "Fast",
    lineWeight: "thin",
  },
  {
    type: "arrow",
    id: "slow-3",
    range: { start: 476, end: 503 },
    y: 32,
    labelStart: "Slow",
    lineWeight: "thin",
  },
];

const rotationItems: TimelineItem[] = [
  {
    type: "annotation",
    id: "rref",
    measure: 1,
    y: 18,
    text: "Rref",
    align: "start",
    size: "sm",
  },
  {
    type: "annotation",
    id: "r2",
    measure: 28,
    y: 18,
    text: "R2",
    align: "center",
    size: "sm",
  },
  {
    type: "annotation",
    id: "r3",
    measure: 49,
    y: 18,
    text: "R3",
    align: "center",
    size: "sm",
  },
  {
    type: "arrow",
    id: "telos-1",
    range: { start: 1, end: 60 },
    y: 42,
    startDot: true,
    labelCenter: "Telos I",
    lineWeight: "thick",
  },
  {
    type: "annotation",
    id: "r4",
    measure: 93,
    y: 18,
    text: "R4",
    align: "center",
    size: "sm",
  },
  {
    type: "annotation",
    id: "r5",
    measure: 214,
    y: 18,
    text: "R5",
    align: "center",
    size: "sm",
  },
  {
    type: "arrow",
    id: "telos-2",
    range: { start: 93, end: 221 },
    y: 42,
    startDot: true,
    labelCenter: "Telos II",
    lineWeight: "thick",
  },
  {
    type: "annotation",
    id: "r6",
    measure: 441,
    y: 18,
    text: "R6",
    align: "center",
    size: "sm",
  },
  {
    type: "arrow",
    id: "telos-3",
    range: { start: 285, end: 476 },
    y: 42,
    startDot: true,
    labelCenter: "Telos III",
    lineWeight: "thick",
  },
  {
    type: "arrow",
    id: "structural-telos",
    range: { start: 503, end: 518 },
    y: 42,
    startDot: true,
    labelEnd: "Structural Telos!\n(m.522ff.)",
    lineWeight: "thick",
  },
];

const phaseItems: TimelineItem[] = [
  {
    type: "bracket",
    id: "phase-1",
    range: { start: 1, end: 88 },
    y: 20,
    label: "Phase 1",
    labelY: 58,
  },
  {
    type: "bracket",
    id: "phase-2",
    range: { start: 70, end: 230 },
    y: 34,
    label: "Phase 2",
    labelY: 74,
  },
  {
    type: "annotation",
    id: "phase-3",
    measure: 314,
    y: 58,
    text: "Phase 3",
    align: "center",
    weight: "bold",
    size: "lg",
  },
  {
    type: "bracket",
    id: "phase-4",
    range: { start: 476, end: 525 },
    y: 34,
    label: "Phase 4",
    labelY: 74,
  },
];

const cadenceItems: TimelineItem[] = [
  {
    type: "cadence",
    id: "massive-auxiliary-cadence",
    range: { start: 1, end: 525 },
    y: 30,
    leftLabel: "V",
    rightLabel: "I",
    caption: "Massive auxiliary cadence!",
    captionY: 66,
  },
];

export const figure35: FormDiagram = {
  title: "Figure 3.5",
  subtitle: "Formal Design Counterpoint:",
  quote:
    "Figure 3.5 illustrates the interaction of all four of these concepts: sonata form, modified super-sonata/fusion form, rotational form and teleological genesis.",
  measureExtent: { start: 1, end: 525 },
  axisMarkers: [
    { measure: 1, label: "1.", align: "start" },
    { measure: 22, label: "22." },
    { measure: 60, label: "60." },
    { measure: 93, label: "93." },
    { measure: 149, label: "149/156." },
    { measure: 208, label: "208." },
    { measure: 221, label: "221." },
    { measure: 285, label: "285." },
    { measure: 322, label: "322." },
    { measure: 343, label: "343." },
    { measure: 375, label: "375." },
    { measure: 409, label: "409." },
    { measure: 449, label: "449." },
    { measure: 476, label: "476." },
    { measure: 503, label: "503." },
    { measure: 510, label: "510." },
    { measure: 518, label: "518." },
    { measure: 523, label: "521. - 525.", align: "end" },
  ],
  rows: [
    {
      id: "formal-sections",
      name: "Formal sections",
      description: "Primary section spans and named analytical events.",
      height: 158,
      items: formalItems,
    },
    {
      id: "tempo-process",
      name: "Tempo / process",
      description: "Slow and fast process transitions across the movement.",
      height: 68,
      items: tempoItems,
    },
    {
      id: "rotations-telos",
      name: "Rotations / telos",
      description: "Rotational labels and telos trajectories.",
      height: 88,
      items: rotationItems,
    },
    {
      id: "phases",
      name: "Phases",
      description: "Large-scale phase framing beneath the telos line.",
      height: 96,
      items: phaseItems,
    },
    {
      id: "cadence-line",
      name: "Cadence line",
      description: "Teleological cadence from V to I.",
      height: 92,
      items: cadenceItems,
    },
  ],
};

export const allDiagramLabels = [
  ...figure35.axisMarkers.map((marker) => marker.label),
  ...figure35.rows.flatMap((row) =>
    row.items.flatMap((item) => {
      if (item.type === "section") {
        return item.subtitle ? [item.title, item.subtitle] : [item.title];
      }
      if (item.type === "annotation") {
        return [item.text];
      }
      if (item.type === "arrow") {
        return [item.labelStart, item.labelCenter, item.labelEnd].filter(
          (value): value is string => Boolean(value),
        );
      }
      if (item.type === "bracket") {
        return [item.label];
      }
      if (item.type === "cadence") {
        return [item.leftLabel, item.rightLabel, item.caption];
      }
      return [];
    }),
  ),
];
