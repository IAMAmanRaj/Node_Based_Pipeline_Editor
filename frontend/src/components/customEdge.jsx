import { BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,} from 'reactflow';
 
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { deleteElements } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
  return (
    <>
           <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button  className="nodrag nopan" style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }} onClick={() => deleteElements({ edges: [{ id }] })}>delete</button>
      </EdgeLabelRenderer>
    </>
  );
}

export const edgeTypes = {
  'custom-edge': CustomEdge,
};