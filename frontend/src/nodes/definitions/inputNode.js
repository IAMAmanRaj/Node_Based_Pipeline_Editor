import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/theme";
import {
  INPUT_ID_OLD_PREFIX,
  INPUT_ID_NEW_PREFIX,
} from "../../constants/NodeIDs";

export const InputNode = create({
  title: "Input",
  badge: "Source",
  description: "Pass values of various data types into your pipeline",
  accentColor: NODE_ACCENTS.PRIMARY_BLUE,
  fields: [
    {
      key: "inputName",
      label: "Name",
      inputType: "text",
      defaultValue: ({ id, data }) =>
        data?.inputName || id.replace(INPUT_ID_OLD_PREFIX, INPUT_ID_NEW_PREFIX),
      helperText: "Unique identifier surfaced to downstream nodes.",
    },
    {
      key: "inputType",
      label: "Type",
      inputType: "select",
      defaultValue: ({ data }) => data?.inputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "File", value: "File" },
        { label: "Number", value: "Number" },
      ],
    },
  ],
  handles: [
    {
      type: "source",
      position: Position.Right,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
});
