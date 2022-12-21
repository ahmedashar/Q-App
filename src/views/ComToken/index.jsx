import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComFromDb } from "../../config/firebase-config";

const ComToken = () => {
  const [comData, setComData] = useState({});
  const { tokenId, userId } = useParams();
  const getCompData = async () => {
    const company = await getComFromDb(tokenId);
    setComData(company);
  };

  useEffect(() => {
    getCompData();
  }, []);
  return (
    <div>
      <h1>MANAGE TOKENS</h1>

      <h3>{comData.cName}</h3>
      <h4>ID {tokenId}</h4>
      <h4>userID {userId}</h4>
    </div>
  );
};

export default ComToken;
