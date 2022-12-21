import React from "react";
import { useNavigate } from "react-router-dom";
import { authentication } from "../../config/firebase-config";

const RegisterComp = (props) => {
  const { cName, closeTime, openTime, since, id, userId } = props;
  const navigate = useNavigate();
  const goToToken = (id, userId) => {
    navigate(`/home/company/${id}/${userId}`);
  };
  return (
    <div
      className="card"
      style={{
        width: "29rem",
        border: "4px solid #4ECBC7",
        marginLeft: "5px",
        marginBottom: "5px",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{cName}</h5>
        <button
          onClick={() => {
            authentication.currentUser.uid == userId
              ? goToToken(id, userId)
              : alert("Not your Company");
          }}
        >
          Manage Tokens
        </button>
        <p className="card-text">
          <span>Open: {openTime} </span> | <span> Close: {closeTime}</span>
        </p>
        <p style={{ marginBottom: "0px", fontSize: "14px" }}>Since: {since}</p>
      </div>
    </div>
  );
};

export default RegisterComp;
