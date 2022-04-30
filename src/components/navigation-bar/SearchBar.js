import React, {
  useContext,
  useState,
  Fragment,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SearchBar.module.css";
import EventContext from "../../store/event-context";

const SearchBar = () => {
  const navigate = useNavigate();
  const { events, setFilteredEvents, setModalEvent } = useContext(EventContext);
  const [searchResult, setSearchResult] = useState(null);
  const inputRef = useRef();
  const localFilteredEvents = useRef(null);

  useEffect(() => {
    if (searchResult !== null) {
      const activeElementExists =
        document.getElementsByClassName(styles["search-list-element-current"])
          .length !== 0;

      if (activeElementExists === false) {
        const filterStringElement = document.getElementsByClassName(
          styles["filter-string"]
        )[0];

        filterStringElement.classList.add(
          styles["search-list-element-current"]
        );
      }
    }
  }, [searchResult]);

  const keyPressHandler = (event) => {
    if (event.key === "Escape") {
      inputRef.current.blur();
      return;
    }

    const isArrowDown = event.key === "ArrowDown";
    const isArrowUp = event.key === "ArrowUp";
    const isEnter = event.key === "Enter";

    if (isArrowDown || isArrowUp || isEnter) {
      event.preventDefault();

      const searchedEvents = document.getElementsByClassName(
        "search-list-element"
      );

      const filterStringElement = document.getElementsByClassName(
        styles["filter-string"]
      )[0];

      const searchedEventsBoundary = isArrowDown ? searchedEvents.length : -1;
      const currentFocusedEventIndex = Array.from(searchedEvents).findIndex(
        (element) =>
          element.classList.contains(styles["search-list-element-current"])
      );

      let followingFocusedEventIndex = isArrowDown
        ? currentFocusedEventIndex + 1
        : currentFocusedEventIndex - 1;

      if (currentFocusedEventIndex !== -1) {
        if (isEnter === true) {
          inputRef.current.blur();
          setModalEvent(localFilteredEvents.current[currentFocusedEventIndex]);
          return;
        } else {
          searchedEvents[currentFocusedEventIndex].classList.remove(
            styles["search-list-element-current"]
          );
        }
      } else {
        if (isEnter === true) {
          showFilteredEvents();
          return;
        } else {
          filterStringElement.classList.remove(
            styles["search-list-element-current"]
          );
          if (isArrowUp === true) {
            followingFocusedEventIndex = searchedEvents.length - 1;
          }
        }
      }

      if (followingFocusedEventIndex === searchedEventsBoundary) {
        filterStringElement.classList.add(
          styles["search-list-element-current"]
        );
      } else {
        searchedEvents[followingFocusedEventIndex].classList.add(
          styles["search-list-element-current"]
        );
      }
    }
  };

  const showFilteredEvents = () => {
    inputRef.current.blur();
    setFilteredEvents(localFilteredEvents.current);
    navigate("/events");
  };

  const removeUnmatchedFilters = (result) => {
    for (const prop in result) {
      if (result[prop].length === 0) {
        delete result[prop];
      }
    }
  };

  const splitBySubstringMatch = (matchedString, filterString) => {
    const matchIndexStart = matchedString.toLowerCase().indexOf(filterString);
    const matchIndexEnd = matchIndexStart + filterString.length;

    return [
      matchedString.slice(0, matchIndexStart),
      matchedString.slice(matchIndexStart, matchIndexEnd),
      matchedString.slice(matchIndexEnd),
    ];
  };

  const onFilterChange = (event) => {
    const filterCategories = {
      title: [],
      genre: [],
      location: [],
    };

    const filterString = event.target.value.toLowerCase();

    if (filterString.trim() === "") {
      setSearchResult(null);
      localFilteredEvents.current = null;
      return;
    }

    if (events !== null) {
      events.forEach((event) => {
        for (const filterCategory in filterCategories) {
          const eventPropertyValue = event[filterCategory].toLowerCase();

          if (eventPropertyValue.includes(filterString) === true) {
            filterCategories[filterCategory].push(event);

            // we found a match for the filterString in some property of the event object
            // so there is no need to match the filterString against remaining properties
            break;
          }
        }
      });
    }

    removeUnmatchedFilters(filterCategories);

    // no matches were found
    if (Object.keys(filterCategories).length === 0) {
      setSearchResult(null);
      localFilteredEvents.current = null;
      return;
    }

    localFilteredEvents.current = [];
    const searchResultJSX = (
      <Fragment>
        <div className={styles["filter-section"]}>
          <h5>see all matches for</h5>
        </div>
        {/* event.target.value is current string search bar*/}
        <div
          className={`${styles["filter-string"]} ${styles["search-list-element-current"]}`}
          onMouseDown={showFilteredEvents}
        >
          <p>{event.target.value}</p>
        </div>
        {Object.keys(filterCategories).map((key, index) => {
          // !! Side effect  !!
          // creating array that will have the events in the same order
          // as they are in the search bar result
          localFilteredEvents.current.push(...filterCategories[key]);

          return (
            <Fragment key={index}>
              <div className={styles["filter-section"]}>
                <h5>{`${key} matches`}</h5>
              </div>
              <ul>
                {filterCategories[key].map((event, index) => {
                  const [
                    firstNonMatchedPart,
                    matchedPart,
                    secondNonMatchedPart,
                  ] = splitBySubstringMatch(event[key], filterString);

                  return (
                    <li
                      className="search-list-element"
                      key={index}
                      // onClick function would be desirable here
                      // but onBlur in the search input runs first
                      // so then onClick has no effect
                      onMouseDown={() => {
                        setModalEvent(event);
                      }}
                    >
                      <div>
                        {key !== "title" && `${event.title} - `}
                        {firstNonMatchedPart}
                        <strong>{matchedPart}</strong>
                        {secondNonMatchedPart}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </Fragment>
    );
    setSearchResult(searchResultJSX);
  };
  return (
    <div
      className={`${styles["search-bar"]} 
      ${searchResult !== null ? styles["no-bottom-radius"] : ""}`}
    >
      <form>
        <input
          onKeyDown={keyPressHandler}
          ref={inputRef}
          onBlur={() => setSearchResult(null)}
          onFocus={onFilterChange}
          onChange={onFilterChange}
          type="text"
          placeholder="Enter keywords.."
        />
        <button type="button" onClick={showFilteredEvents}>
          <span className={`gg-search ${styles["gg-search"]}`} />
        </button>
      </form>
      {searchResult !== null && (
        <div className={styles["search-result"]}>{searchResult}</div>
      )}
    </div>
  );
};

export default SearchBar;
