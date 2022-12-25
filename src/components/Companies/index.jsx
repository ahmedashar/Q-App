import "./style.css";

const Companies = (props) => {
  const {
    cName,
    openTime,
    closeTme,
    tokenDate,
    tokenLimit,
    tokenTime,
    userId,
    id,
    x,
  } = props;
  return (
    <div className="card comp_card">
      <div className="card-header">
        <h3 className="color"> {cName} </h3>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          Open: <span>{openTime}</span> | Close: <span>{closeTme}</span>
        </h5>
        {/* <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p> */}
        {/*  */}

        <button
          className="btn btn-dark color mb-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapseExample${x}`}
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Show Details
        </button>

        <div className="collapse" id={`collapseExample${x}`}>
          <div className="card card-body collapse_detail">
            {tokenLimit != 0 ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Total Tokens: {tokenLimit}</h4>
                  </div>
                  <div className="col-md-6">
                    <h4>Estimated Time: {tokenTime} Minutes</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Current Token: 0</h4>
                  </div>
                  <div className="col-md-6">
                    <h4>Token Sold: 0</h4>
                  </div>
                </div>
                <button className="btn btn-dark color mt-3">Buy Token</button>
              </>
            ) : (
              <p>No Token Available</p>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Companies;
