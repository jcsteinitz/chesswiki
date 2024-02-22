import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  // Update search bar
  const handleChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  // Check if enter is pressed
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      searchFor(searchInput);
    }
  };

  // Check and search for name, display errors
  async function searchFor(name: string) {
    const pattern = /^[a-zA-Z0-9-_]+$/;
    if (pattern.test(name)) {
      try {
        fetch(`https://api.chess.com/pub/player/${name}`).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setPopupMessage("");
              navigate("/user", { state: data });
            });
          } else if (response.status === 404) {
            setPopupMessage("Username not found");
          } else {
            setPopupMessage("Something went wrong");
          }
          setSearchInput("");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setPopupMessage("Invalid username");
      setSearchInput("");
    }
  }

  return (
    <>
      <input
        id="search_bar"
        className="pos-center"
        autoComplete="off"
        type="text"
        placeholder="Enter a username..."
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {popupMessage !== "" && <div id="popup_message">{popupMessage}</div>}
    </>
  );
}

export default SearchBar;
