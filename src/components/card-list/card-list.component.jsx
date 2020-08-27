import React from "react";
import "./card-list.styles.scss";
import Card from "../card/card.component";

const CardList = ({ selectedRepoIssues }) => (
  <div className="card-list-container">
    <div className="card-list">
      {selectedRepoIssues.length ? (
        selectedRepoIssues.map((userIssues,index) => (
          <Card key={index} userIssues={userIssues} />
        ))
      ) : (
        <h3 className="warning-message">Repo don't have any issues, please select some other repo with issues!</h3>
      )}
    </div>
  </div>
);

export default CardList;
