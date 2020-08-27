import React from "react";
import "./header.styles.scss";

class Header extends React.Component {
  render() {
    const { repos, labels } = this.props;

    const selectedRepo = (e) => {
      const selected_repo = e.target.value;
      if (selected_repo !== "") {
        fetch(
          "https://api.github.com/repos/DataChatAI/" + selected_repo + "/issues"
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.props.updateParrentState(data);
          });
      } else {
        alert("Please select a repo");
      }
    };

    const selectedLabel = (e) => {
      const selected_label = e.target.value;

      if (selected_label !== "") {
        this.props.filterRepoIssueState(selected_label);
      } else {
        alert("Please select a label");
      }
    };
    return (
      <div className="header-container">
        <div className="header-items">
          <div className="item">
            <p>Daily Check-in Dashboard</p>
          </div>
          <div className="item">
            <select
              name="repo_selector"
              id="repo_selector"
              className="input-field"
              onChange={selectedRepo}
            >
              <option value="">select a repo</option>
              {repos.map((repo, index) => (
                <option key={index} value={repo}>
                  {repo}
                </option>
              ))}
            </select>
            <select
              name="label_selector"
              id="label_selector"
              className="input-field"
              onChange={selectedLabel}
            >
              <option value="reset">Reset Filter</option>
              {labels.map((label, index) => (
                <option key={index} value={label.value}>
                  {label.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
