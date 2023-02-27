import React, { Component } from "react";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emoji: null,
      search: "",
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://emoji-api.com/emojis?access_key=6b9e0cc36ddf5b2f9b74658366d368976dc6773d"
      );
      const data = await response.json();
      this.setState({ emoji: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { emoji, search } = this.state;

    return (
      <div className="App">
        <input
          type="text"
          placeholder="Search Emoji"
          style={{
            border: "none",
            borderBottom: "2px solid orange",
          }}
          onChange={this.handleSearch}
        />
        {emoji ? (
          <table>
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Emoji Name</th>
              </tr>
            </thead>
            <tbody>
              {emoji
                .filter((emojis) => {
                  return search.toLowerCase() === ""
                    ? emojis
                    : emojis.unicodeName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((emojis) => (
                  <tr key={emojis.unicodeName}>
                    <td>{emojis.character}</td>
                    <td>{emojis.unicodeName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Loading emojis...</p>
        )}
      </div>
    );
  }
}

export default App;
