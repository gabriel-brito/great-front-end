import { useState, useId } from "react";

function Visualizer({ leaf }) {
  const ariaId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = leaf.children && leaf.children.length > 0;

  if (!hasChildren) {
    return (
      <div className="visualizer">
        <p>{leaf.name}</p>
      </div>
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sideIcon = `[${isExpanded ? "-" : "+"}]`;

  return (
    <div className="visualizer">
      <button
        aria-expanded={isExpanded}
        aria-controls={ariaId}
        onClick={toggleExpand}
        className="expand-button"
      >
        {leaf.name} {sideIcon}
      </button>

      {isExpanded && (
        <ul role="tree" id={ariaId} className="list">
          {leaf.children.map((child) => (
            <li aria-role="treeitem" key={child.id}>
              <Visualizer leaf={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FileExplorer({ data }) {
  const root = Object.values(data);

  return (
    <div>
      {root.map((leaf) => (
        <Visualizer key={leaf.id} leaf={leaf} />
      ))}
    </div>
  );
}
