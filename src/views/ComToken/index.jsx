import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTokenToCompany, getComFromDb } from "../../config/firebase-config";
import "./style.css";

const ComToken = () => {
  const [comData, setComData] = useState({});
  const { tokenId, userId } = useParams();
  // for token limit
  const [tokenLimit, setTokenLimit] = useState(0);
  // for token time
  const [tokenTime, setTokenTime] = useState(0);
  // from firestore firebase
  const getCompData = async () => {
    const company = await getComFromDb(tokenId);
    setComData(company);
  };
  // set token into company database in firestore
  const addTokenInfoToDB = async (tTime, tLimit, cId) => {
    const date = new Date().getDate();
    try {
      await addTokenToCompany(comData, tTime, tLimit, cId, date);
      await getCompData();
      alert("successfull");
    } catch (error) {
      alert(`failed: ${error.message}`);
    }
  };

  useEffect(() => {
    getCompData();
  }, []);
  return (
    <div style={{ border: "2px solid white" }} className="container">
      {/* <h4>ID {tokenId}</h4>
      <h4>userID {userId}</h4> */}
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="color">MANAGE TOKENS</h1>
        </div>
      </div>
      {/* company info */}
      <div className="row mt-5" style={{ backgroundColor: "#4ECBC7" }}>
        <div className="col-6">
          <h3 style={{ color: "black" }}>Company Name: {comData.cName}</h3>
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-dark color"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            Update Tokens
          </button>
          <button type="button" className="btn btn-dark color ml-4">
            Reset Tokens
          </button>
        </div>
      </div>
      {/* company Info End */}
      {/* token Info */}
      <div className="row">
        <div className="col-4 py-4">
          <span className="color token_span">Today's Token: </span>
          <span className="token_span">
            {comData.tokenLimit ? comData.tokenLimit : tokenLimit}
          </span>
        </div>
        <div className="col-4 py-4">
          <span className="color token_span">Token Time: </span>
          <span className="token_span">
            {comData.tokenTime ? comData.tokenTime : tokenTime}
          </span>
        </div>
        <div className="col-4 py-4">
          <span className="color token_span">Token Sold: </span>{" "}
          <span className="token_span">0</span>
        </div>
      </div>
      {/* token info end */}
      {/* modal start */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 color" id="exampleModalLabel">
                Set Today's Token
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    style={{ color: "black" }}
                    for="recipient-name"
                    className="col-form-label"
                  >
                    Token Limit
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => {
                      setTokenLimit(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    style={{ color: "black" }}
                    for="message-text"
                    className="col-form-label"
                  >
                    Set Token Time
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="message-text"
                    onChange={(e) => {
                      setTokenTime(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  addTokenInfoToDB(tokenTime, tokenLimit, tokenId);
                  console.log(tokenTime, tokenLimit);
                }}
              >
                Make Tokens
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
    </div>
  );
};

export default ComToken;

// Company Tokens: After creating a company, user should be able to
// Add today’s total tokens for limit (required)
// Can update the estimated time of each token (required).
// Can see tokens bought by users with their information (Picture, name, email)..
// Can update Current Token by clicking done button.
// Can Allow/Disallow tokens for today.
// Everyday the tokens will be reset.
