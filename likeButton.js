import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

import "./styles.css";

const BASE_API_URL = "https://www.greatfrontend.com/api/questions/like-button";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const action = isLiked ? "unlike" : "like";

  const sendLike = async () => {
    setIsLoading(true);

    await fetch(BASE_API_URL, {
      method: "POST",
      body: JSON.stringify({ action }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message === "Success!") {
          setIsLiked(!isLiked);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button
        onClick={sendLike}
        disabled={isLoading}
        className={["button", isLiked && "liked"].filter(Boolean).join(" ")}
      >
        {isLoading ? <SpinnerIcon /> : <HeartIcon />}
        Like
      </button>
    </div>
  );
}

// body {
//   font-family: sans-serif;
// }

// .button {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   background-color: transparent;
//   padding: 8px 10px;
//   border-radius: 20px;
//   font-weight: 700;
//   color: #888;
//   border: 2px solid #888;
//   outline: none;
//   cursor: pointer;
// }

// .button:hover {
//   border-color: #f00;
//   color: #f00;
// }

// .button:hover svg {
//   fill: #f00;
// }

// .button.liked {
//   color: #FFF;
//   background-color: #f00;
//   border-color: #f00;
// }

// .button.liked:hover {
//   color: #f00;
//   background-color: #fff;
// }

// .button:hover svg {
//   fill: #f00;
// }
