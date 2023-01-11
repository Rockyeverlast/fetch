import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [post, setPost] = useState("");
  // const [refreshData, setRefreshData] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["capital", "name"]);

  const handleSearch = (event) => {
    let value = (e) => {
      e.target.value.toLowerCase();
    };

    let result = [];
    result = items.filter((data) => {
      return data.name.search(value) != -1;
    });

    setItems(result);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("https://restcountries.com/v2/name/united");
        const data = await res.json();
        console.log(data);
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
    console.log(q);
  }, [q]);

  function search() {
    return items.filter((item) => {
      // console.log(item);
      return searchParam.some((newItem) => {
        return console.log(item[newItem]);
      });
    });
  }

  search();

  return (
    <div className="App">
      <label htmlFor="search-form">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search for..."
          value={q}
          // anytime the user types in the search box
          onChange={(e) => handleSearch(setQ(e.target.value))}
        />
        <span className="sr-only">Search countries here</span>
      </label>
      <div>
        {items.map((item) => {
          return (
            <div key={item.alpha2Code}>
              <div>
                <img
                  src={item.flag}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
              </div>
              <div className="card-content">
                <h2 className="card-name">{item.name}</h2>
                <ol className="card-list">
                  <li>
                    population: <span>{item.population}</span>
                  </li>
                  <li>
                    Region: <span>{item.region}</span>
                  </li>
                  <li>
                    Capital: <span>{item.capital}</span>
                  </li>
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
