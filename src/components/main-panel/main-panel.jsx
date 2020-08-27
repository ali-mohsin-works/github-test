import React from "react";
import "./main-panel.styles.scss";
import CardList from "../card-list/card-list.component";
import Header from "../header/header.component";

class MainPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      repos: [],
      labels: [
        {
          title: "High Prioity",
          value: "high",
        },
        {
          title: "Medium Priority",
          value: "medium",
        },
        {
          title: "Low Priority",
          value: "low",
        },
        {
          title: "I am on it",
          value: "on",
        },
      ],
      selectedRepoIssues: [],
      filterdRepoIssues: [],
    };
  }

  componentDidMount() {
    let initial_repos = [];
    fetch("https://api.github.com/orgs/DataChatAI/repos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        initial_repos = data.map((repo) => {
          return repo.name;
        });

        this.setState({
          repos: initial_repos,
        });
      });
  }

  render() {
    const updateRepoIssueState = (issues) => {
      var result = issues.reduce(function (r, a) {
        if (a.assignee !== null) {
          r[a.assignee.login] = r[a.assignee.login] || [];
          r[a.assignee.login].push(a);
        }
        return r;
      }, Object.create(null));

      const filtered_result = Object.values(result);
      this.setState({
        selectedRepoIssues: filtered_result,
        filterdRepoIssues: filtered_result,
      });
    };

    const filterRepoIssueState = (selected_label) => {
      const labelFiltered = [];
      const filtered_result = this.state.selectedRepoIssues;
      if (selected_label === "reset") {
        this.setState({
          filterdRepoIssues: filtered_result,
        });
      } else {
        filtered_result.map((user) => {
          if (Array.isArray(user) && user.length) {
            const labaled_filter = user.filter((issue) => {
              if (
                issue.labels &&
                Array.isArray(issue.labels) &&
                issue.assignee !== null
              ) {
                return (
                  issue.labels.filter((label) => {
                    if (label.name.toLowerCase().includes(selected_label))
                      return true;
                    return false;
                  }).length > 0
                );
              }
              return false;
            });

            if (labaled_filter.length) {
              labelFiltered.push(labaled_filter);
            }
          }
          return false;
        });

        this.setState({
          filterdRepoIssues: labelFiltered,
        });
      }
    };

    return (
      <div>
        <Header
          repos={this.state.repos}
          labels={this.state.labels}
          updateParrentState={updateRepoIssueState}
          filterRepoIssueState={filterRepoIssueState}
        />
        <CardList selectedRepoIssues={this.state.filterdRepoIssues} />
      </div>
    );
  }
}

export default MainPanel;
