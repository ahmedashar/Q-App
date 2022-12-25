import { useEffect, useState } from "react";
import Companies from "../../components/Companies";
import { getAllCompaniesFromDb } from "../../config/firebase-config";
import "./style.css";

const User = () => {
  const [companies, setCompanies] = useState([]);
  const getAllCompFromDB = async () => {
    const companies = await getAllCompaniesFromDb();
    setCompanies(companies);
    console.log("return: " + companies);
  };
  useEffect(() => {
    getAllCompFromDB();
  }, []);
  let x = 0;
  return (
    <div className="container">
      <h1>Buy Tokens</h1>
      <div className="row">
        <div className="col-4 user_section">
          <h3 className="p-1 color">Your Tokens</h3>
        </div>

        <div className="col-8">
          {companies.map((item) => {
            x++;
            const {
              cName,
              openTime,
              closeTime,
              tokenDate,
              tokenLimit,
              tokenTime,
              userId,
              id,
            } = item;
            return (
              <Companies
                cName={cName}
                openTime={openTime}
                closeTme={closeTime}
                tokenTime={tokenTime}
                tokenLimit={tokenLimit}
                tokenDate={tokenDate}
                userId={userId}
                id={id}
                x={x}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default User;
