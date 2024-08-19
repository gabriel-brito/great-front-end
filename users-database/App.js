import { useState, useId, useContext, createContext } from "react";
import "./styles.css";

const ListContext = createContext(null);

// UI Tasks
// Wrap everything around a Form - Done;
// Create the Controls UI (buttons) - Done;
// Create the search input - Done;
// Create the list - Done;
// Create the name input - Done;

// Functionality Tasks
// Create a new user - Done;
// Select a user - Done;
// Cancel Function - Done;
// Delete an existing user - Done;
// Update an existing user - Done;
// Search User - Done;

const generateId = (() => {
  let id = 0;
  return () => `${id++}`;
})();

function Controls() {
  const {
    isCreateAvailable,
    handleCreate,
    selectedUser,
    handleCancel,
    handleDelete,
    handleUpdate,
  } = useListProvider();

  return (
    <div className="form-footer">
      <button
        disabled={!isCreateAvailable}
        onClick={handleCreate}
        value="create"
      >
        Create
      </button>
      <button
        onClick={() => handleUpdate(selectedUser)}
        disabled={!selectedUser}
      >
        Update
      </button>
      <button
        onClick={() => handleDelete(selectedUser)}
        disabled={!selectedUser}
      >
        Delete
      </button>
      <button onClick={handleCancel} disabled={!selectedUser}>
        Cancel
      </button>
    </div>
  );
}

function SearchInput() {
  const id = useId();
  const { setSearchTerm, searchTerm } = useListProvider();

  return (
    <div className="form-row">
      <label htmlFor={id} hidden>
        Search User
      </label>

      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
        name="search"
        id={id}
        type="search"
        placeholder="Search"
      />
    </div>
  );
}

function FormContent() {
  const {
    currentList,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleSelectedUser,
  } = useListProvider();
  const firstNameId = useId();
  const lastNameId = useId();

  return (
    <div className="form-content">
      <div className="users-wrapper">
        <select
          size={5}
          onChange={(event) => {
            console.log(event.target.value);
            const selectedId = event.target.value;
            const user = currentList.find((_user) => _user.id === selectedId);

            handleSelectedUser(user);
          }}
          className="user-list"
        >
          {currentList.map((option) => (
            <option key={option.id} value={`${option.id}`}>
              {option.firstName} {option.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-inputs">
        <div className="form-row">
          <label htmlFor={firstNameId}>First Name:</label>
          <input
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            type="text"
            name="firstName"
            id={firstNameId}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor={lastNameId}>Last Name:</label>
          <input
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            type="text"
            name="lastName"
            id={lastNameId}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ListStateProvider>
      <SearchInput />

      <FormContent />

      <Controls />
    </ListStateProvider>
  );
}

function ListStateProvider({ children }) {
  const [currentList, setCurrentList] = useState([
    { id: generateId(), firstName: "Hans", lastName: "Emil" },
    { id: generateId(), firstName: "Max", lastName: "Mustermann" },
    { id: generateId(), firstName: "Roman", lastName: "Tisch" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = currentList.filter((_user) =>
    JSON.stringify(_user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCreateAvailable = firstName && lastName && !selectedUser;

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setSelectedUser(null);
  };

  const handleCreate = () => {
    const newList = currentList.slice();

    newList.push({
      id: generateId(),
      firstName,
      lastName,
    });

    resetForm();
    setCurrentList(newList);
  };

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    resetForm();
  };

  const handleDelete = (user) => {
    const currList = currentList.slice();
    const newList = currList.filter((_user) => _user.id !== user.id);

    setCurrentList(newList);
    resetForm();
  };

  const handleUpdate = (user) => {
    const currList = currentList.slice();
    const userIndex = currList.findIndex((_user) => _user.id === user.id);

    currList[userIndex].firstName = firstName;
    currList[userIndex].lastName = lastName;

    setCurrentList(currList);
  };

  const value = {
    firstName,
    lastName,
    setFirstName,
    setLastName,
    isCreateAvailable,
    handleCreate,
    currentList: filteredList,
    selectedUser,
    handleSelectedUser,
    handleCancel,
    handleDelete,
    handleUpdate,
    searchTerm,
    setSearchTerm,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

const useListProvider = () => {
  const state = useContext(ListContext);

  return state;
};
