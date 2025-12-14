// toolbar.js

import { DraggableNode } from "./draggableNode";
import { NODE_TYPES, NODE_LABELS } from "../../constants/NodeIds";

const { INPUT, LLM, OUTPUT, TEXT } = NODE_TYPES;
const { INPUT: INPUT_LABEL, LLM: LLM_LABEL, OUTPUT: OUTPUT_LABEL, TEXT: TEXT_LABEL } = NODE_LABELS;


export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type={INPUT} label={INPUT_LABEL} />
        <DraggableNode type={LLM} label={LLM_LABEL} />
        <DraggableNode type={OUTPUT} label={OUTPUT_LABEL} />
        <DraggableNode type={TEXT} label={TEXT_LABEL} />
      </div>
    </div>
  );
};
