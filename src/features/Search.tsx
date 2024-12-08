import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { starWarsCharacterEmpty } from "../types.ts";
const Search = () => {
  const [character, setCharacter] = useState(starWarsCharacterEmpty);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const apiSearch = async (): Promise<void> => {
    // search for character in API in the search query is londer than 1 character
    if (inputValue.length > 1) {
      try {
        const result = await axios.get(
          `https://swapi.dev/api/people/?search=${inputValue}`
        );
        // if the seach was not successfulm show the error message
        if (result.data.count === 0) {
          setMessage("Sorry, we couldn't find anything matching your seach");
        }
        // if the search was successful, save the character's info and clear the error message
        else {
          setMessage("");
          setCharacter(result.data.results[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // handle input change and update search query
  const handleChange = () => {
      setInputValue(inputRef.current?.value as string);

  };

  // search for the character with timeout 5 sec if inputValue changes
  useEffect(() => {
    setTimeout(() => {
      apiSearch();
    }, 5000);
  }, [inputValue]);

  return (
    <>
      <br />
      <input placeholder="Search..." onChange={handleChange} ref={inputRef} />
      {!message && inputValue ? (
        <>
          <h2>{character.name}</h2>
          <p>
            {character.gender}, {character.birth_year}
          </p>
        </>
      ) : (
        <></>
      )}
      {console.log(character)}
      <p id="error"> {message} </p>
    </>
  );
};

export default Search;
