import { useState } from "react";

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordtion = () => setIsOpen((prev) => !prev);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div onClick={toggleAccordtion}>
        {title} <span aria-hidden={true} className="accordion-icon" />
      </div>

      {isOpen && <div style={{ marginTop: "8px" }}>{children}</div>}
    </div>
  );
}

export default function Accordion() {
  return (
    <div>
      <AccordionItem title="HTML">
        The HyperText Markup Language or HTML is the standard markup language
        for documents designed to be displayed in a web browser.
      </AccordionItem>

      <AccordionItem title="CSS">
        Cascading Style Sheets is a style sheet language used for describing the
        presentation of a document written in a markup language such as HTML or
        XML.
      </AccordionItem>

      <AccordionItem title="Javascript">
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS.
      </AccordionItem>
    </div>
  );
}
