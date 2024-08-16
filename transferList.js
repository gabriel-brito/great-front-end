import { useState } from "react";
import "./styles.css";

const LIST_BASE = [
  { text: "HTML", list: "left", checked: false },
  { text: "JavaScript", list: "left", checked: false },
  { text: "CSS", list: "left", checked: false },
  { text: "TypeScript", list: "left", checked: false },
  { text: "React", list: "right", checked: false },
  { text: "Angular", list: "right", checked: false },
  { text: "Vue", list: "right", checked: false },
  { text: "Svelte", list: "right", checked: false },
];

const hasCheckedItems = (list, side) =>
  list.some((item) => item.list === side && item.checked === true);

function ListItem({ listItem, handleCheck }) {
  const id = useId();

  return (
    <li onClick={() => handleCheck(listItem)}>
      <input id={id} type="checkbox" checked={listItem.checked} />{" "}
      <label htmlFor={id}>{listItem.text}</label>
    </li>
  );
}

function List({ listItems, handleCheck }) {
  return (
    <ul className="list">
      {listItems.map((item) => (
        <ListItem handleCheck={handleCheck} key={item.name} listItem={item} />
      ))}
    </ul>
  );
}

function Controls({ transferAll, list, sendItemsTo }) {
  const hasLeftItemsChecked = hasCheckedItems(list, "left");
  const hasRightItemsChecked = hasCheckedItems(list, "right");

  return (
    <div className="controls">
      <button onClick={() => transferAll("left")}>{"<<"}</button>

      <button
        disabled={!hasRightItemsChecked}
        onClick={() => sendItemsTo("left")}
      >
        {"<"}
      </button>

      <button
        disabled={!hasLeftItemsChecked}
        onClick={() => sendItemsTo("right")}
      >
        {">"}
      </button>

      <button onClick={() => transferAll("right")}>{">>"}</button>
    </div>
  );
}

export default function App() {
  const [currentList, setCurrentList] = useState(LIST_BASE);

  const leftList = currentList.filter((item) => item.list === "left");
  const rightList = currentList.filter((item) => item.list === "right");

  const handleCheck = (listItem) => {
    const newList = currentList.slice();
    const itemIndex = newList
      .flatMap((item) => item.text)
      .indexOf(listItem.text);

    if (itemIndex === -1) return;

    const checkedStatus = newList[itemIndex].checked;

    newList[itemIndex].checked = !checkedStatus;

    setCurrentList(newList);
  };

  const transferAll = (newList) => {
    const currentListClone = currentList.slice();
    const transformedList = currentListClone.map((listItem) => {
      return {
        ...listItem,
        list: newList,
      };
    });

    setCurrentList(transformedList);
  };

  const sendItemsTo = (side) => {
    const newList = currentList.slice();

    const updatedList = newList.map((item) => {
      if (item.checked) {
        return {
          ...item,
          list: side,
        };
      }

      return item;
    });

    setCurrentList(updatedList);
  };

  return (
    <div className="wrapper">
      <List listItems={leftList} handleCheck={handleCheck} />

      <Controls
        transferAll={transferAll}
        list={currentList}
        sendItemsTo={sendItemsTo}
      />

      <List listItems={rightList} handleCheck={handleCheck} />
    </div>
  );
}

// body {
//   font-family: sans-serif;
// }

// .wrapper {
//   display: flex;
//   gap: 10px;
//   border: 1px solid lightgrey;
// }

// .list {
//   list-style: none;
//   width: 100%;
//   padding: 0 8px;
// }

// .controls {
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   border-right: 1px solid lightgrey;
//   border-left: 1px solid lightgrey;
//   padding: 8px 16px;
//   height: auto;
// }
