// src/components/DrawControl.tsx
"use client";

import { useEffect, useRef } from "react";
import MapLibreDraw from "maplibre-gl-draw";
import type { Map as MlMap } from "maplibre-gl";
import type {
  Feature,
  FeatureCollection,
  Polygon,
  GeoJsonProperties,
} from "geojson";

import "maplibre-gl-draw/dist/mapbox-gl-draw.css"; // REQUIRED

type DrawPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type DrawControls = Partial<{
  polygon: boolean;
  trash: boolean;
  line_string: boolean;
  point: boolean;
  combine_features: boolean;
  uncombine_features: boolean;
}>;

type DrawEvent = {
  features: Feature[];
};

type Props = {
  map: MlMap | null;
  position?: DrawPosition;
  controls?: DrawControls;
  displayControlsDefault?: boolean;

  polys: Array<Feature<Polygon, GeoJsonProperties>>;

  onCreate?: (e: DrawEvent, draw: MapLibreDraw) => void;
  onUpdate?: (e: DrawEvent, draw: MapLibreDraw) => void;
  onDelete?: (e: DrawEvent, draw: MapLibreDraw) => void;

  onSelectionChange?: (e: DrawEvent, draw: MapLibreDraw) => void;
  onModeChange?: (e: unknown, draw: MapLibreDraw) => void;
};

function normalizeStyles(baseStyles: any) {
  if (!Array.isArray(baseStyles)) return null;
  return baseStyles.map((s) => {
    const paint = s.paint || {};
    const dash = paint["line-dasharray"];
    const needsLiteral =
      Array.isArray(dash) && dash.length > 0 && typeof dash[0] === "number";
    return {
      ...s,
      paint: needsLiteral
        ? { ...paint, "line-dasharray": ["literal", dash] }
        : paint,
    };
  });
}

function fallbackStyles() {
  return [
    {
      id: "gl-draw-polygon-fill.cold",
      type: "fill",
      filter: ["all", ["==", "$type", "Polygon"], ["!=", "active", "true"]],
      paint: { "fill-color": "#3bb2d0", "fill-opacity": 0.4 },
    },
    {
      id: "gl-draw-polygon-fill.hot",
      type: "fill",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "true"]],
      paint: { "fill-color": "#fbb03b", "fill-opacity": 0.4 },
    },
    {
      id: "gl-draw-lines.cold",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["!=", "active", "true"]],
      paint: { "line-color": "#3bb2d0", "line-width": 2 },
    },
    {
      id: "gl-draw-lines.hot",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
      paint: { "line-color": "#fbb03b", "line-width": 2 },
    },
    {
      id: "gl-draw-points.cold",
      type: "circle",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["!=", "meta", "midpoint"],
        ["!=", "active", "true"],
      ],
      paint: { "circle-radius": 5, "circle-color": "#3bb2d0" },
    },
    {
      id: "gl-draw-points.hot",
      type: "circle",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["!=", "meta", "midpoint"],
        ["==", "active", "true"],
      ],
      paint: { "circle-radius": 5, "circle-color": "#fbb03b" },
    },
    {
      id: "gl-draw-points.mid",
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
      paint: { "circle-radius": 3, "circle-color": "#fbb03b" },
    },
  ];
}

export default function DrawControl({
  map,
  position = "top-left",
  controls = { polygon: true },
  displayControlsDefault = false,
  onCreate,
  onUpdate,
  onDelete,
  polys,
  onSelectionChange,
  onModeChange,
}: Props): null {
  const drawRef = useRef<MapLibreDraw | null>(null);

  useEffect(() => {
    if (!map) return;

    // Defensive: remove any previous control (StrictMode double-mount)
    if (drawRef.current) {
      try {
        map.removeControl(drawRef.current as any);
      } catch {}
      drawRef.current = null;
    }

    // If MapLibreDraw.styles exists, normalize it; otherwise fallback.
    // (We still use fallbackStyles because it is known-safe on MapLibre.)
    normalizeStyles((MapLibreDraw as any).styles);
    const styles = fallbackStyles();

    const draw = new MapLibreDraw({
      displayControlsDefault,
      controls,
      styles,
    });

    map.addControl(draw as any, position);
    drawRef.current = draw;

    // Seed existing polys
    const fc: FeatureCollection = {
      type: "FeatureCollection",
      features: polys,
    };
    drawRef.current.add(fc as any);

    const handleCreate = (e: any) => onCreate?.(e as any, draw);
    const handleUpdate = (e: any) => onUpdate?.(e as any, draw);
    const handleDelete = (e: any) => onDelete?.(e as any, draw);

    const handleSelection = (e: any) => onSelectionChange?.(e as any, draw);
    const handleMode = (e: any) => onModeChange?.(e as any, draw);

    map.on("draw.selectionchange" as any, handleSelection);
    map.on("draw.modechange" as any, handleMode);

    map.on("draw.create" as any, handleCreate);
    map.on("draw.update" as any, handleUpdate);
    map.on("draw.delete" as any, handleDelete);

    return () => {
      map.off("draw.create" as any, handleCreate);
      map.off("draw.update" as any, handleUpdate);
      map.off("draw.delete" as any, handleDelete);
      map.off("draw.selectionchange" as any, handleSelection);
      map.off("draw.modechange" as any, handleMode);
      try {
        map.removeControl(draw as any);
      } catch {}
      drawRef.current = null;
    };
    // Controls object isn't stable; stringify is fine here
  }, [
    map,
    position,
    displayControlsDefault,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(controls),
    onCreate,
    onUpdate,
    onDelete,
    onSelectionChange,
    onModeChange,
    polys,
  ]);

  return null;
}
