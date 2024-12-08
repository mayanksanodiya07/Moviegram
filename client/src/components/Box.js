import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-[420px] bg-color-background-500 relative rounded-xl overflow-scroll">
      <button className="absolute top-2 right-2 h-6 w-6 border-0 rounded-full text-sm bg-color-background-900 text-color-text font-bold cursor-pointer flex items-center justify-center" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
