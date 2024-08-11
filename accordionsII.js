import { useState } from "react";

export default function Accordion({ sections }) {
  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);

        return (
          <div className="accordion-item" key={value}>
            <button
              className="accordion-item-title"
              type="button"
              aria-controls={`accordion-${title}`}
              onClick={() => {
                const newOpenSections = new Set(openSections);
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}
            >
              {title}
              <span
                aria-hidden={true}
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>

            <div
              id={`accordion-${title}`}
              role="region"
              aria-labelledby={title}
              aria-expanded={isExpanded}
              className="accordion-item-contents"
              hidden={!isExpanded}
            >
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
