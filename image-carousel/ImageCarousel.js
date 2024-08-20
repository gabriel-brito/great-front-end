import { useState } from "react";

// Tasks
// Show only one image at time - Done;
// Create arrows and add funcionality - Done;
//   - Go forward - Done;
//   - Go Backwards - Done;
//   - If it's the end, loop through it - Done;
// Create navigation dots - Done;

export default function ImageCarousel({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const dots = Array.from({ length: images.length }, (_, index) => index);
  const currentImage = images[imageIndex];

  const handleCarouselChange = (nextIndex) => {
    if (nextIndex > images.length - 1) {
      setImageIndex(0);
      return;
    }

    if (nextIndex < 0) {
      setImageIndex(images.length - 1);
      return;
    }

    setImageIndex(nextIndex);
  };

  return (
    <div className="wrapper">
      <div className="image-wrapper">
        <img alt={currentImage.alt} src={currentImage.src} width="100%" />

        <div className="arrows-wrapper">
          <button
            onClick={() => handleCarouselChange(imageIndex - 1)}
            aria-label="Previous Image"
          >
            &lsaquo;
          </button>

          <button
            onClick={() => handleCarouselChange(imageIndex + 1)}
            aria-label="Next Image"
          >
            &rsaquo;
          </button>
        </div>
      </div>

      <div className="dots-wrapper">
        {dots.map((dotIndex) => {
          const isActive = imageIndex === dotIndex;
          const styles = isActive ? { backgroundColor: "white" } : {};

          return (
            <button
              key={dotIndex}
              aria-label={`navigate to image number: ${dotIndex + 1}`}
              style={styles}
              onClick={() => setImageIndex(dotIndex)}
            />
          );
        })}
      </div>
    </div>
  );
}
