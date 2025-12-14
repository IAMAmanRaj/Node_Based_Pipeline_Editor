import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/theme";
import {
  OUTPUT_ID_OLD_PREFIX,
  OUTPUT_ID_NEW_PREFIX,
} from "../../constants/NodeConstants";

export const OutputNode = create({
  title: "Output",
  badge: "Sink",
  description: "Pass data out of your pipeline",
  accentColor: NODE_ACCENTS.YELLOW,
  fields: [
    {
      key: "outputName",
      label: "Output",
      inputType: "text",
      defaultValue: ({ id, data }) =>
        data?.outputName ||
        id.replace(OUTPUT_ID_OLD_PREFIX, OUTPUT_ID_NEW_PREFIX),
      helperText: "Readable label for this pipeline output.",
    },
    {
      key: "outputType",
      label: "Format",
      inputType: "select",
      defaultValue: ({ data }) => data?.outputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "Image", value: "Image" },
        { label: "JSON", value: "JSON" },
      ],
    },
    {
      key: "isPrimary",
      label: "Mark as primary",
      inputType: "checkbox",
      defaultValue: ({ data }) => Boolean(data?.isPrimary),
      helperText: "Primary outputs surface first in API responses.",
    },
  ],

  handles: [
    {
      type: "target",
      position: Position.Left,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
});
