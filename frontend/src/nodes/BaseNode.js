const Base = ({ nodeConfig, id, data }) => {
  const {
    title = "Node",
    badge,
    description,
    fields = [],
    handles = [],
    style,
  } = nodeConfig;
};

export const createNode = (config = {}) => {
  return function NodeComponent(props) {
    return <Base {...props} nodeConfig={config} />;
  };
};
