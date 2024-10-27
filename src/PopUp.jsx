/* eslint-disable react/prop-types */
const PopUp = ({ eventName, timestamp, winners, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg mb-4">
          Winner&apos;s for event:&nbsp;
          <span className="font-bold">{eventName || "Lottery Event"}</span>
        </h2>
        <p className="text-gray-500 mb-4">Generated on: {timestamp}</p>
        <ul className="space-y-1">
          {winners.map((winner, index) => (
            <li key={index} className="px-3 py-2 bg-gray-200 rounded">
              {index + 1}. {winner}
            </li>
          ))}
        </ul>
        <button
          onClick={closePopup}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
