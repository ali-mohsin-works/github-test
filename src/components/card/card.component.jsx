import React from "react";
import moment from "moment";
import "./card.styles.scss";

const Card = ({ userIssues }) => (
  <div className="card">
    <span className="name">{userIssues[0].assignee.login}</span>
    {userIssues.length ? (
      userIssues.map((issue, index) => (
        <div className="issue" key={index}>
          <h5 className="issue-title">{issue.title}</h5>

          <p className="bottom-line">
            #
            {issue.number +
              " " +
              issue.state +
              "ed " +
              moment
                .duration(
                  moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD").diff(
                    moment(issue.created_at, "YYYY-MM-DD")
                  )
                )
                .asDays() +
              " days ago by " +
              issue.user.login}
          </p>
          {issue.labels.map((label, index) => (
            <span
              key={index}
              className={`${label.color === "0e8a16" ? "green" : ""} ${
                label.color === "b60205" ? "high" : ""
              } ${label.color === "fbca04" ? "low" : ""} ${
                label.color === "f9d0c4" ? "medium" : ""
              } badge`}
            >
              {label.name}
            </span>
          ))}
        </div>
      ))
    ) : (
      <h3 className="warning-message">
        This user is not assigned to any issue yet.
      </h3>
    )}
    {/* <div className="issue high">Handle Issue With High Priority</div>
    <div className="issue medium">Handle Issue With Medium Priority</div>
    <div className="issue">Handle Issue With No Priority</div>
    <div className="issue low">Handle Issue With Low Priority</div> */}
  </div>
);

export default Card;
