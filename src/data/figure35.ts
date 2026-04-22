import type { DiagramSpec, LaneSpec, SectionSegment, TextBlock } from "../types";

export const figure35: DiagramSpec = {
  title: "Figure 3.5",
  subtitle: "Formal Design Counterpoint",
  caption:
    "A publication-style rendering of the analytical timeline for Sibelius 7, using the original figure as the source of truth.",
  measureExtent: { start: 1, end: 525 },
  spacingProfile: {
    segments: [
      { start: 1, end: 60, weight: 0.09, minWidth: 84 },
      { start: 60, end: 208, weight: 0.2, minWidth: 176 },
      { start: 208, end: 476, weight: 0.3, minWidth: 270 },
      { start: 476, end: 503, weight: 0.13, minWidth: 102 },
      { start: 503, end: 510, weight: 0.08, minWidth: 64 },
      { start: 510, end: 518, weight: 0.09, minWidth: 74 },
      { start: 518, end: 525, weight: 0.12, minWidth: 96 },
    ],
  },
  measureMarkers: [
    { measure: 1, label: "1.", align: "start", lane: 0 },
    { measure: 22, label: "22.", lane: 1 },
    { measure: 60, label: "60.", lane: 0 },
    { measure: 93, label: "93.", lane: 0 },
    { measure: 149, label: "149/156.", lane: 0 },
    { measure: 208, label: "208.", lane: 0 },
    { measure: 221, label: "221.", lane: 1 },
    { measure: 285, label: "285.", lane: 0 },
    { measure: 322, label: "322.", lane: 0 },
    { measure: 343, label: "343.", lane: 1 },
    { measure: 375, label: "375.", lane: 0 },
    { measure: 409, label: "409.", lane: 0 },
    { measure: 449, label: "449.", lane: 0 },
    { measure: 476, label: "476.", lane: 0 },
    { measure: 503, label: "503.", lane: 0 },
    { measure: 510, label: "510.", lane: 1 },
    { measure: 518, label: "518.", lane: 0 },
    { measure: 523, label: "521. - 525.", align: "end", lane: 1 },
  ],
  lanes: [
    {
      id: "formal-sections",
      type: "sectionLane",
      name: "Formal sections",
      description: "Primary section spans and internal analytical labels.",
      height: 186,
      connectors: [
        { id: "intro-ii", type: "divider", measure: 60, weight: "thin" },
        { id: "dev-start", type: "divider", measure: 208, weight: "thick" },
        { id: "recap-start", type: "divider", measure: 476, weight: "thick" },
        { id: "coda-start", type: "divider", measure: 521, weight: "thick" },
        { id: "conclusion-end", type: "divider", measure: 525, weight: "thick" },
      ],
      segments: [
        {
          id: "introduction",
          range: { start: 1, end: 60 },
          title: {
            id: "introduction-title",
            lines: ["Introduction."],
            slot: "title",
            anchor: { type: "segmentInsetStart", segmentId: "introduction", inset: 0 },
            align: "start",
            weight: "bold",
            size: "lg",
          },
          blocks: [
            {
              id: "introduction-part-1",
              lines: ["Part I"],
              slot: "subtitle",
              anchor: { type: "segmentInsetStart", segmentId: "introduction", inset: 0 },
              align: "start",
              size: "md",
            },
            {
              id: "introduction-part-2",
              lines: ["Part II"],
              slot: "subtitle",
              anchor: { type: "segmentInsetEnd", segmentId: "introduction", inset: 2 },
              align: "end",
              size: "md",
            },
          ],
        },
        {
          id: "exposition",
          range: { start: 60, end: 208 },
          title: {
            id: "exposition-title",
            lines: ["Exposition."],
            slot: "title",
            anchor: { type: "segmentInsetStart", segmentId: "exposition", inset: 0 },
            align: "start",
            weight: "bold",
            size: "lg",
          },
          blocks: [
            {
              id: "exposition-group-1",
              lines: ["1st Group."],
              slot: "subtitle",
              anchor: { type: "measure", measure: 76 },
              align: "center",
              size: "md",
            },
            {
              id: "exposition-group-2",
              lines: ["2nd Group."],
              slot: "subtitle",
              anchor: { type: "measure", measure: 133 },
              align: "center",
              size: "md",
            },
            {
              id: "exposition-closing",
              lines: ["Closing -", "Group."],
              slot: "subtitle",
              anchor: { type: "measure", measure: 176 },
              align: "center",
              size: "sm",
            },
            {
              id: "exposition-aino",
              lines: ["“Aino”"],
              slot: "detail",
              anchor: { type: "measure", measure: 88 },
              align: "center",
              style: "italic",
              size: "lg",
            },
          ],
        },
        {
          id: "development",
          range: { start: 208, end: 476 },
          title: {
            id: "development-title",
            lines: ["Development."],
            slot: "title",
            anchor: { type: "segmentInsetStart", segmentId: "development", inset: 0 },
            align: "start",
            weight: "bold",
            size: "lg",
          },
          blocks: [
            {
              id: "development-aino",
              lines: ["“Aino”"],
              slot: "detail",
              anchor: { type: "rangeCenter", range: { start: 208, end: 285 } },
              align: "center",
              style: "italic",
              size: "xl",
            },
            {
              id: "development-reprises",
              lines: ["(Scherzo | Trio | “false” | “real” )", "reprise   reprise"],
              slot: "subtitle",
              anchor: { type: "rangeCenter", range: { start: 285, end: 385 } },
              align: "center",
              size: "sm",
            },
            {
              id: "development-transition",
              lines: ["transition ⇔", "Retransition."],
              slot: "subtitle",
              anchor: { type: "rangeCenter", range: { start: 396, end: 448 } },
              align: "center",
              size: "sm",
            },
          ],
        },
        {
          id: "recapitulation",
          range: { start: 476, end: 521 },
          title: {
            id: "recapitulation-title",
            lines: ["Recapitulation."],
            slot: "title",
            anchor: { type: "segmentInsetStart", segmentId: "recapitulation", inset: 0 },
            align: "start",
            weight: "bold",
            size: "md",
          },
          blocks: [
            {
              id: "recapitulation-group-1",
              lines: ["1st Group."],
              slot: "subtitle",
              anchor: { type: "measure", measure: 481 },
              align: "center",
              size: "sm",
            },
            {
              id: "recapitulation-catastrophe",
              lines: ["“Catastrophe!” /"],
              slot: "subtitle",
              anchor: { type: "measure", measure: 497 },
              align: "center",
              style: "italic",
              size: "sm",
            },
            {
              id: "recapitulation-aino",
              lines: ["“Aino”"],
              slot: "detail",
              anchor: { type: "measure", measure: 487 },
              align: "center",
              style: "italic",
              size: "lg",
            },
            {
              id: "recapitulation-aino-trapped",
              lines: ["Aino-trapped!"],
              slot: "detail",
              anchor: { type: "measure", measure: 509 },
              align: "center",
              style: "italic",
              size: "sm",
            },
          ],
        },
        {
          id: "design-coda",
          range: { start: 510, end: 521 },
          title: {
            id: "design-coda-title",
            lines: ["“Design Coda”"],
            slot: "title",
            anchor: { type: "opticalClusterCenter", segmentId: "design-coda" },
            align: "center",
            weight: "bold",
            size: "md",
          },
          blocks: [
            {
              id: "design-coda-allusion",
              lines: ["Valse Triste-", "allusion"],
              slot: "subtitle",
              anchor: { type: "measure", measure: 515 },
              align: "center",
              style: "italic",
              size: "sm",
            },
          ],
        },
        {
          id: "conclusion",
          range: { start: 521, end: 525 },
          title: {
            id: "conclusion-title",
            lines: ["Conclusion."],
            slot: "subtitle",
            anchor: { type: "segmentInsetStart", segmentId: "conclusion", inset: 6 },
            align: "start",
            size: "sm",
          },
        },
      ],
    },
    {
      id: "tempo-process",
      type: "processLane",
      name: "Tempo / process",
      description: "Slow and fast process transitions across the movement.",
      height: 76,
      connectors: [
        {
          id: "slow-1",
          type: "arrow",
          range: { start: 1, end: 93 },
          slot: "baseline",
          weight: "thin",
          startLabel: "Slow",
        },
        {
          id: "fast-1",
          type: "arrow",
          range: { start: 93, end: 208 },
          slot: "baseline",
          weight: "thin",
          startLabel: "Fast",
        },
        {
          id: "slow-2",
          type: "arrow",
          range: { start: 208, end: 285 },
          slot: "baseline",
          weight: "thin",
          startLabel: "Slow",
        },
        {
          id: "fast-2",
          type: "arrow",
          range: { start: 285, end: 476 },
          slot: "baseline",
          weight: "thin",
          startLabel: "Fast",
        },
        {
          id: "slow-3",
          type: "arrow",
          range: { start: 476, end: 503 },
          slot: "baseline",
          weight: "thin",
          startLabel: "Slow",
        },
      ],
    },
    {
      id: "rotations-telos",
      type: "telosLane",
      name: "Rotations / telos",
      description: "Rotational labels and telos trajectories.",
      height: 94,
      textBlocks: [
        {
          id: "rref",
          lines: ["Rref"],
          slot: "label",
          anchor: { type: "measure", measure: 1 },
          align: "start",
          size: "sm",
        },
        {
          id: "r2",
          lines: ["R2"],
          slot: "label",
          anchor: { type: "measure", measure: 22 },
          align: "center",
          size: "sm",
        },
        {
          id: "r3",
          lines: ["R3"],
          slot: "label",
          anchor: { type: "measure", measure: 60 },
          align: "center",
          size: "sm",
        },
        {
          id: "r4",
          lines: ["R4"],
          slot: "label",
          anchor: { type: "measure", measure: 93 },
          align: "center",
          size: "sm",
        },
        {
          id: "r5",
          lines: ["R5"],
          slot: "label",
          anchor: { type: "measure", measure: 208 },
          align: "center",
          size: "sm",
        },
        {
          id: "r6",
          lines: ["R6"],
          slot: "label",
          anchor: { type: "measure", measure: 449 },
          align: "center",
          size: "sm",
        },
      ],
      connectors: [
        {
          id: "telos-1",
          type: "arrow",
          range: { start: 1, end: 60 },
          slot: "baseline",
          weight: "thick",
          startDot: true,
          centerLabel: "Telos I",
          labelWeight: "regular",
        },
        {
          id: "telos-2",
          type: "arrow",
          range: { start: 93, end: 221 },
          slot: "baseline",
          weight: "thick",
          startDot: true,
          centerLabel: "Telos II",
          labelWeight: "regular",
        },
        {
          id: "telos-3",
          type: "arrow",
          range: { start: 285, end: 476 },
          slot: "baseline",
          weight: "thick",
          startDot: true,
          centerLabel: "Telos III",
          labelWeight: "regular",
        },
        {
          id: "structural-telos",
          type: "arrow",
          range: { start: 503, end: 518 },
          slot: "baseline",
          weight: "thick",
          startDot: true,
          endLabel: ["Structural Telos!", "(m.522ff.)"],
          labelWeight: "semibold",
        },
      ],
    },
    {
      id: "phases",
      type: "phaseLane",
      name: "Phases",
      description: "Large-scale phase framing beneath the telos line.",
      height: 92,
      textBlocks: [
        {
          id: "phase-3",
          lines: ["Phase 3"],
          slot: "label",
          anchor: { type: "rangeCenter", range: { start: 230, end: 390 } },
          align: "center",
          weight: "bold",
          size: "lg",
        },
      ],
      connectors: [
        {
          id: "phase-1",
          type: "bracket",
          range: { start: 1, end: 60 },
          slot: "baseline",
          label: "Phase 1",
        },
        {
          id: "phase-2",
          type: "bracket",
          range: { start: 60, end: 208 },
          slot: "baseline",
          label: "Phase 2",
        },
        {
          id: "phase-4",
          type: "bracket",
          range: { start: 476, end: 525 },
          slot: "baseline",
          label: "Phase 4",
        },
      ],
    },
    {
      id: "cadence-line",
      type: "cadenceLane",
      name: "Cadence line",
      description: "Teleological cadence from V to I.",
      height: 96,
      connectors: [
        {
          id: "massive-auxiliary-cadence",
          type: "cadence",
          range: { start: 1, end: 525 },
          slot: "baseline",
          leftLabel: "V",
          rightLabel: "I",
          caption: "Massive auxiliary cadence!",
        },
      ],
    },
  ],
};

function collectTextBlocks(lane: LaneSpec): TextBlock[] {
  switch (lane.type) {
    case "sectionLane":
      return lane.segments.flatMap((segment: SectionSegment) => [
        segment.title,
        ...(segment.blocks ?? []),
      ]);
    case "telosLane":
    case "phaseLane":
      return lane.textBlocks;
    default:
      return [];
  }
}

export const allDiagramLabels = [
  ...figure35.measureMarkers.map((marker) => marker.label),
  ...figure35.lanes.flatMap((lane) => [
    ...collectTextBlocks(lane).flatMap((block) => block.lines),
    ...lane.connectors.flatMap((connector) => {
      if (connector.type === "arrow") {
        return [
          connector.startLabel,
          connector.centerLabel,
          ...(connector.endLabel ?? []),
        ].filter((value): value is string => Boolean(value));
      }

      if (connector.type === "bracket") {
        return [connector.label];
      }

      if (connector.type === "cadence") {
        return [connector.leftLabel, connector.rightLabel, connector.caption];
      }

      return [];
    }),
  ]),
];
