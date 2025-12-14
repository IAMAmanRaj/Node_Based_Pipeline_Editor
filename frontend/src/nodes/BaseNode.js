import { memo, useState, useEffect, useCallback } from "react";
import { useStore } from "../store";
import { Handle, Position } from "reactflow";
import {
  buildInitialState as initialData,
  resolveHandleId,
  renderField,
} from "../utils/base-node-helpers";

const Base = memo(({ nodeConfig, id, data }) => {
  const {
    title = "Node",
    accentColor,
    badge,
    description,
    fields = [],
    handles = [],
    style,
  } = nodeConfig;

  const updateNodeField = useStore((state) => state.updateNodeField);

  const [values, setValues] = useState(() => initialData(fields, { id, data }));

  useEffect(() => {
    setValues((previousValues) => {
      let hasUpdates = false;
      const nextValues = { ...previousValues };

      fields.forEach((field) => {
        if (!field.key) return;

        const incomingValue = data?.[field.key];
        if (
          incomingValue !== undefined &&
          incomingValue !== previousValues[field.key]
        ) {
          nextValues[field.key] = incomingValue;
          hasUpdates = true;
        }
      });

      return hasUpdates ? nextValues : previousValues;
    });
  }, [data, fields]);

  useEffect(() => {
    fields.forEach((field) => {
      if (!field.key) return;

      if (data?.[field.key] === undefined) {
        const currentValue = values[field.key];
        if (currentValue !== undefined) {
          updateNodeField(id, field.key, currentValue);
        }
      }
    });
  }, [data, fields, id, updateNodeField, values]);

  const handleFieldChange = useCallback(
    (field, nextValue) => {
      if (!field.key) return;

      setValues((previousValues) => ({
        ...previousValues,
        [field.key]: nextValue,
      }));

      updateNodeField(id, field.key, nextValue);
    },
    [id, updateNodeField]
  );

  return (
    <div>
      {handles
        .filter((handle) => handle.position === Position.Left)
        .map((handle) => (
          <Handle
            key={`${handle.type}-${resolveHandleId(handle, id)}-left`}
            type={handle.type}
            position={Position.Left}
            id={resolveHandleId(handle, id)}
            style={handle.style}
          />
        ))}

      <div>
        <span style={{ color: accentColor, fontWeight: "bold" }}>{title}</span>

        {badge && (
          <span
            style={{
              backgroundColor: accentColor,
              color: "white",
              marginLeft: "8px",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.8em",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p
          style={{
            marginTop: "5px",
            marginBottom: "0",
            fontSize: "0.9em",
            color: "#6B7280",
            wordBreak: "break-word",
            padding: "0 10px",
          }}
        >
          {description}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {fields.map((field) => {
          const value = values[field.key];
          const onChange = (nextValue) => handleFieldChange(field, nextValue);
          const { label, helperText } = field;

          return (
            <div key={field.key}>
              {label && <label>{label}</label>}
              {renderField(field, value, onChange)}
              {helperText && <small>{helperText}</small>}
            </div>
          );
        })}
      </div>

      {handles
        .filter((handle) => handle.position === Position.Right)
        .map((handle) => (
          <Handle
            key={`${handle.type}-${resolveHandleId(handle, id)}-right`}
            type={handle.type}
            position={Position.Right}
            id={resolveHandleId(handle, id)}
            style={handle.style}
          />
        ))}
    </div>
  );
});

Base.displayName = "BaseNode";

export const createNode = (config = {}) => {
  return function NodeComponent(props) {
    return <Base {...props} nodeConfig={config} />;
  };
};
