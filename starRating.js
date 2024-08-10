import { useState, useRef } from "react";

function EmptyStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="star-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function FilledStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="star-icon star-icon-filled"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function Widget({ filled = 0, maximum = 5 }) {
  const stars = new Array(maximum).fill();
  const [starsPreview, setStarsPreview] = useState(null);
  const filledStarsRef = useRef(filled);
  const filledStars = filledStarsRef.current;

  const onMouseOver = (index) => {
    setStarsPreview(index + 1);
  };

  const onMouseLeave = () => {
    setStarsPreview(null);
  };

  const onClick = (index) => {
    filledStarsRef.current = index + 1;
  };

  return (
    <div>
      {stars.map((_, index) => {
        const isFilledStar =
          (starsPreview && index + 1 <= starsPreview) ||
          (index < filledStars && !starsPreview);

        return (
          <button
            aria-label={`${isFilledStar ? "Filled" : "Empty"} star`}
            onClick={() => onClick(index)}
            onMouseEnter={() => onMouseOver(index)}
            onMouseLeave={onMouseLeave}
            key={`star-${index}`}
          >
            {isFilledStar ? <FilledStar /> : <EmptyStar />}
          </button>
        );
      })}
    </div>
  );
}

export default function StarRating() {
  return <Widget filled={1} maximum={7} />;
}
