import { useState } from "react";
import { uploadImage, addCompanyToDb } from "../../config/firebase-config";

const Company = () => {
  let [viewForm, setViewForm] = useState(false);
  let [cName, setCName] = useState("");
  let [since, setSince] = useState("");
  let [fileSelect, setFileSelect] = useState({});
  let [openTime, setOpenTime] = useState("");
  let [closeTime, setCloseTime] = useState("");

  const addCompanytoFirebase = async () => {
    try {
      const imgUrl = await uploadImage(fileSelect);
      await addCompanyToDb(cName, since, openTime, closeTime, imgUrl);
      alert("add Company Successfull");
      setViewForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  if (viewForm == false) {
    return (
      <div>
        <h1>Companies</h1>
        <div>
          <button
            onClick={() => {
              setViewForm(true);
            }}
          >
            Add Your Company
          </button>
        </div>
      </div>
    );
  }
  //   view form of add a company
  if (viewForm) {
    return (
      <div
        style={{
          width: "600px",
          margin: "auto",
          textAlign: "left",
          border: "1px solid grey",
        }}
      >
        <h1>FORM FOR ADDING NEW COMPANY</h1>
        <label>
          Enter Your Company Name:
          <input
            type="text"
            placeholder="xyz clinic"
            value={cName}
            onChange={(e) => {
              setCName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Since:
          <input
            type="date"
            placeholder="12-12-2001"
            value={since}
            onChange={(e) => {
              setSince(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Certificate of Company
          <input
            type="file"
            //   value={fileSelect}
            onChange={(e) => {
              setFileSelect(e.target.files[0]);
            }}
          />
        </label>
        <br />
        Timing: <br />
        Open:
        <input
          type="time"
          value={openTime}
          onChange={(e) => {
            setOpenTime(e.target.value);
          }}
        />
        Close:
        <input
          type="time"
          value={closeTime}
          onChange={(e) => {
            setCloseTime(e.target.value);
          }}
        />
        <br />
        <button onClick={addCompanytoFirebase}>Submit</button>
      </div>
    );
  }
};

export default Company;

// 3. Company: Here comes a Plus button initially to add your company, after adding the companies list will shown here.
//  Plus Button: This will open a Modal with form consisting of
// Name of company
// Since
// Certificates (Max 3 Images)
// Timings
// Address (Should be searched via foursquare API & can be seen on map)
