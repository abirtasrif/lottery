import { useState } from "react";
import { BiReset } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import { IoDice } from "react-icons/io5";
import PopUp from "./PopUp";

const LotteryApp = () => {
  const [names, setNames] = useState([""]);
  const [winnerCount, setWinnerCount] = useState(1);
  const [eventName, setEventName] = useState("");
  const [winners, setWinners] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [warning, setWarning] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const addNameField = () => {
    setNames([...names, ""]);
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const rollWinners = () => {
    if (winnerCount < 1) {
      setWarning("Please enter a valid number of winners!");
      return;
    }
    if (eventName.trim() === "") {
      setWarning("Event name cannot be empty!");
      return;
    }
    const filteredNames = names.filter((name) => name.trim() !== "");
    if (filteredNames.length === 0) {
      setWarning("No participants added!");
      return;
    }

    const totalWinners = Math.min(parseInt(winnerCount), filteredNames.length);
    const shuffled = [...filteredNames].sort(() => 0.5 - Math.random());
    setWinners(shuffled.slice(0, totalWinners));
    setShowPopup(true);
    setWarning("");
    setTimestamp(formatDate(new Date()));
  };

  const resetFields = () => {
    setNames([""]);
    setWinnerCount(1);
    setEventName("");
    setWinners([]);
    setShowPopup(false);
    setWarning("");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-2">
        Lottery App by &nbsp;
        <a href="http://abirtasrif.com" className="text-blue-800">
          Abir
        </a>
      </h1>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Enter Event Name"
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="w-full max-w-md space-y-2 mb-4">
        {names.map((name, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="w-6 text-center font-semibold">{index + 1}.</span>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              placeholder="Enter participant name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          onClick={addNameField}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex flex-row items-center gap-2 mx-auto"
        >
          <IoMdPersonAdd />
          <span>Add another participant</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-blue-600 mt-10">
        Generate Lottery Result
      </h2>
      <h2 className="text-lg italic mb-2 text-blue-600/60">
        Enter number of winner you want in below input field
      </h2>
      <div className="max-w-md mb-4 flex flex-row gap-3">
        <input
          type="number"
          value={winnerCount}
          onChange={(e) =>
            setWinnerCount(e.target.value ? parseInt(e.target.value) : "")
          }
          placeholder="Enter number of winners"
          className="px-3 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={rollWinners}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex flex-row items-center gap-2"
        >
          <IoDice />
          Roll
        </button>
        <button
          onClick={resetFields}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex flex-row items-center gap-2"
        >
          <BiReset />
          Reset
        </button>
      </div>
      {warning && <p className="text-red-500 mt-2">{warning}</p>}

      {showPopup && (
        <PopUp
          eventName={eventName}
          timestamp={timestamp}
          winners={winners}
          closePopup={closePopup}
        />
      )}
    </div>
  );
};

export default LotteryApp;
