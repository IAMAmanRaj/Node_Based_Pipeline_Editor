import { BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,} from 'reactflow';
import { useState } from 'react';
import { useStore } from '../store/store';
 
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, ...props }) {
    const { deleteElements } = useReactFlow();
    const theme = useStore((state) => state.theme);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const isDark = theme === 'black';
    
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
    const { markerEnd} = props;

    const handleDelete = () => {
        deleteElements({ edges: [{ id }] });
        setShowConfirm(false);
    };

  return (
    <>
          <BaseEdge
              id={id}
      path={edgePath}
    
      markerEnd={markerEnd}
      
    />
      <EdgeLabelRenderer>
        <div 
          
          className="nodrag nopan" 
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          {!showConfirm ? (
            <button
              className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] hover:animate-pulse backdrop-blur-sm text-red-500 active:scale-95 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setShowConfirm(true)}
              aria-label="Delete connection"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 14 14" 
                fill="none" 
                className={`transition-transform duration-200 ${isHovered ? 'scale-110 rotate-90' : ''}`}
              >
                <path 
                  d="M1 1L13 13M1 13L13 1" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <div className={`${
              isDark 
                ? 'bg-[#121212]/98 border-red-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(239,68,68,0.15)]' 
                : 'bg-white/98 border-red-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.2),0_0_20px_rgba(239,68,68,0.25)]'
            } border rounded-lg backdrop-blur-xl animate-slideDown flex gap-2 p-1.5`}>
              <button 
                className={`px-3 py-1.5 rounded transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0d0d0d] border-white/10 text-white hover:bg-white/12 hover:border-white/20'
                    : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400'
                } border text-xs openSansMedium transition-all duration-200 active:scale-95`}
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button 
                className={`px-3 py-1.5 rounded ${isDark ? 'bg-gradient-to-br from-pink-800 to-pink-900 border border-red-500/50 hover:from-pink-600 hover:to-pink-700' : ' bg-gradient-to-br from-red-500 to-red-600 border border-red-500/50 hover:from-red-600 hover:to-red-700'} text-white text-xs openSansMedium shadow-[0_2px_8px_rgba(239,68,68,0.3)] transition-all duration-300  hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98`}
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const edgeTypes = {
  'custom-edge': CustomEdge,
};