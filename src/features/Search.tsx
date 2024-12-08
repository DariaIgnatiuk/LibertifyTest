import axios from "axios";
import { useMemo, useEffect, useState, useRef } from "react";
import { starWarsCharacterEmpty } from "../types.ts";
import debounce from "lodash.debounce";
const Search = () => {
  const [character, setCharacter] = useState(starWarsCharacterEmpty);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const apiSearch = async (value:string): Promise<void> => {
    // search for character in API in the search query is londer than 1 character
    if (value.length > 1) {
      try {
        const result = await axios.get(
          `https://swapi.dev/api/people/?search=${value}`
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

  const onNameChange = useMemo(
    () =>
      debounce(() => {
        handleChange();
      }, 3000),
    []
   );

   useEffect(() => {
    return () => {
      onNameChange.cancel();
    };
   }, [onNameChange]);

  //handle input change and update search query
  const handleChange = () => {
    const value = inputRef.current?.value as string;
      apiSearch(value);

  };

  return (
    <>
      <br />
      {/* <input placeholder="Search..." onChange={handleChange} ref={inputRef} /> */}
      <input placeholder="Search..." onChange={onNameChange} ref={inputRef} />
      {!message ? (
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
