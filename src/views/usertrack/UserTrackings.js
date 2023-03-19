import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  //   CDataTable,
  CPagination,
  CRow,
  CButton,
} from "@coreui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../lib/axios";

const UserTrackings = () => {
  let navigate = useNavigate();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const ipLocationNameEmail = useLocation().search;
  const ipLocationname = new URLSearchParams(ipLocationNameEmail).get("IP");
  const ipLocationemail = new URLSearchParams(ipLocationNameEmail).get("Email");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [GlobalSearch, setGlobalSearch] = useState("");
  const [StartLimit, setStartLimit] = useState(0);
  const [NumberOfUser, setNumberOfUser] = useState(0);
  const [FromTransactionDate, setFromTransactionDate] = useState("");
  const [ToTransactionDate, setToTransactionDate] = useState("");

  const [total, setTotal] = useState(0);

  const [allSearch, setAllSearch] = useState({
    TrackingId: "",
    SessionId: "",
    IP: ipLocationname ? ipLocationname : "",
    OS: "",
    Device: "",
    Browser: "",
    SubscriberName: "",
    Email: ipLocationemail ? ipLocationemail : "",
    AnonomyusEmail: "",
    VisitedTime: "",
    Country: "",
    FromTransactionDate: FromTransactionDate,
    ToTransactionDate: ToTransactionDate,
  });

  const getBadge = (status) => {
    switch (status) {
      case 1:
        return "success";
      case 0:
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };
  const pageChange = (newPage) => {
    // if (ipLocationname && ipLocationemail) {
    //   currentPage !== newPage && (
    //     <Navigate
    //       to={`/userTrackings?page=${newPage}&&IP=${ipLocationname}&&Email=${ipLocationemail}`}
    //     />
    //   );
    // } else if (ipLocationname) {
    //   currentPage !== newPage && (
    //     <Navigate to={`/userTrackings?page=${newPage}&&IP=${ipLocationname}`} />
    //   );
    // } else if (ipLocationemail) {
    //   currentPage !== newPage && (
    //     <Navigate
    //       to={`/userTrackings?page=${newPage}&&Email=${ipLocationemail}`}
    //     />
    //   );
    // } else {
    //   currentPage !== newPage && (
    //     <Navigate to={`/userTrackings?page=${newPage}`} />
    //   );
    // }
    // if (newPage >= 1) {
    //   setStartLimit((newPage - 1) * 10);
    // }
  };
  useEffect(() => {
    console.log(ipLocationname);
    axios
      .post("/api/user-session/all-search-sessions", allSearch)
      .then((res) => {
        setTotal(res.data.Total);
        let totalNumbers = Math.ceil(res.data.Total / 10);
        setNumberOfUser(totalNumbers);
        console.log(res.data);
      });

    axios
      .post("/api/user-session/search-sessions/" + StartLimit, allSearch)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    if (FromTransactionDate && ToTransactionDate) {
      var d1 = Date.parse(ToTransactionDate);
      var d2 = Date.parse(FromTransactionDate);
      if (d1 < d2) {
        alert("To Date Must Be Greater Than From Date!");
        // setToTransactionDate("");
        setFromTransactionDate("");
      } else {
        indivudalSearch(FromTransactionDate, "FromTransactionDate");
        indivudalSearch(ToTransactionDate, "ToTransactionDate");
      }
    }
  }, [FromTransactionDate, ToTransactionDate]);

  useEffect(() => {
    document
      .getElementsByClassName("c-datatable-filter")[0]
      .getElementsByTagName("input")[0]
      .classList.add("col-md-12");
    let permRole = localStorage.getItem("role");
    if (permRole) {
      if (permRole !== "1") {
        let permRights = localStorage.getItem("right").split(",");
        // if (!permRights.find((r) => r === "/userTrackings")) {
        //   <Navigate to={`/dashboard`} />;
        // }
      }
    } else {
      // <Navigate to={`/dashboard`} />;
    }

    if (GlobalSearch !== "") {
      let searchData = {
        TrackingId: GlobalSearch,
        SessionId: GlobalSearch,
        IP: GlobalSearch,
        OS: GlobalSearch,
        Device: GlobalSearch,
        Browser: GlobalSearch,
        SubscriberName: GlobalSearch,
        Email: GlobalSearch,
        AnonomyusEmail: GlobalSearch,
        VisitedTime: GlobalSearch,
        Country: GlobalSearch,
        searchType: "Global",
      };
      axios
        .post("/api/user-session/search-sessions/" + StartLimit, searchData)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    } else {
      axios
        .post("/api/user-session/search-sessions/" + StartLimit, allSearch)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    }

    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const globalSearch = (keyword) => {
    setGlobalSearch(keyword);
    let searchData = {
      TrackingId: keyword,
      SessionId: keyword,
      IP: keyword,
      OS: keyword,
      Device: keyword,
      Browser: keyword,
      SubscriberName: keyword,
      Email: keyword,
      AnonomyusEmail: keyword,
      VisitedTime: keyword,
      Country: keyword,
      searchType: "Global",
    };

    axios
      .post("/api/user-session/all-search-sessions", searchData)
      .then((res) => {
        setTotal(res.data.Total);

        let totalNumbers = Math.ceil(res.data.Total / 10);
        setNumberOfUser(totalNumbers);

        console.log(res.data);
      });

    axios
      .post("/api/user-session/search-sessions/" + StartLimit, searchData)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  };

  const indivudalSearch = (keyword, key) => {
    setGlobalSearch("");
    setAllSearch((prev) => {
      let newVal = { ...prev, [key]: keyword };
      axios
        .post("/api/user-session/all-search-sessions", newVal)
        .then((res) => {
          setTotal(res.data.Total);

          let totalNumbers = Math.ceil(res.data.Total / 10);
          setNumberOfUser(totalNumbers);

          console.log(res.data);
        });

      axios
        .post("/api/user-session/search-sessions/" + StartLimit, newVal)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });

      return newVal;
    });
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Web Traffic</CCardHeader>
          <CCardBody>
            <div className="row my-2 mx-0">
              <div className="col-sm-4 form-inline p-0 c-datatable-filter">
                <label className="mfe-2">Search</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here ..."
                  value={GlobalSearch}
                  onChange={(e) => globalSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-3 form-inline p-0 c-datatable-filter">
                <label className="mfe-2" style={{ marginLeft: "130px" }}>
                  From
                </label>
                <input
                  type="date"
                  value={FromTransactionDate}
                  onChange={(e) => setFromTransactionDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-sm-3 form-inline p-0 c-datatable-filter">
                <label className="mfe-2">To</label>
                <input
                  type="date"
                  value={ToTransactionDate}
                  onChange={(e) => setToTransactionDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-sm-2 form-inline p-0 c-datatable-filter">
                <h5>Total: 1{/* {total} */}</h5>
              </div>
            </div>
            <br />
            <table className="table table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th>TrackingId</th>
                  <th>SessionId</th>
                  <th>IP</th>
                  <th>Visited Time</th>
                  <th>Country</th>
                  <th>OS</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Subscriber Name</th>
                  <th>Email</th>
                  <th>Support Ticket Email</th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      value={allSearch.TrackingId}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "TrackingId")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.SessionId}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "SessionId")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.IP}
                      onChange={(e) => indivudalSearch(e.target.value, "IP")}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={allSearch.VisitedTime}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "VisitedTime")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.Country}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "Country")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.OS}
                      onChange={(e) => indivudalSearch(e.target.value, "OS")}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.Device}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "Device")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.Browser}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "Browser")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.SubscriberName}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "SubscriberName")
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.Email}
                      onChange={(e) => indivudalSearch(e.target.value, "Email")}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={allSearch.AnonomyusEmail}
                      onChange={(e) =>
                        indivudalSearch(e.target.value, "AnonomyusEmail")
                      }
                      className="form-control"
                    />
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {/* {data.map((val, key) => (
                  <tr key={key}>
                    <td>{val.TrackingId}</td>
                    <td>{val.SessionId}</td>

                    <td
                      style={{ fontWeight: "bold" }}
                      onClick={() => history.push(`/userTrackingsIP/${val.IP}`)}
                    >
                      <a href="javascript: void(0)">
                        
                        {val.IP}
                      </a>
                    </td>
                    <td>
                      <Moment format="DD-MMM-YYYY LT">{val.CreatedTime}</Moment>
                    </td>
                    <td>{val.Country}</td>
                    <td>{val.OS}</td>
                    <td>{val.Device}</td>
                    <td>{val.Browser}</td>
                    <td>{val.SubscriberName}</td>
                    <td>{val.Email}</td>
                    <td>{val.AnonomyusEmail}</td>
                    <td>
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() =>
                          history.push(`/userTrackings/${val.TrackingId}`)
                        }
                      >
                        Details
                      </CButton>
                    </td>
                  </tr>
                ))} */}
                <tr key="0">
                  <td>
                    9180
                    {/* {val.TrackingId} */}
                  </td>
                  <td>
                    505a2153-d070-425c-8f06-07d6ba548ee3
                    {/* {val.SessionId} */}
                  </td>

                  <td
                    style={{ fontWeight: "bold" }}
                    // onClick={() => history.push(`/userTrackingsIP/${val.IP}`)}
                  >
                    <a href="javascript: void(0)">
                      66.249.70.24
                      {/* {val.IP} */}
                    </a>
                  </td>
                  <td>
                    10-Mar-2023 8:39 PM
                    {/* <Moment format="DD-MMM-YYYY LT">{val.CreatedTime}</Moment> */}
                  </td>
                  <td>
                    United States
                    {/* {val.Country} */}
                  </td>
                  <td>
                    Android
                    {/* {val.OS} */}
                  </td>
                  <td>
                    smartphone
                    {/* {val.Device} */}
                  </td>
                  <td>
                    Chrome Mobile
                    {/* {val.Browser} */}
                  </td>
                  <td>{/* {val.SubscriberName} */}</td>
                  <td>{/* {val.Email} */}</td>
                  <td>{/* {val.AnonomyusEmail} */}</td>
                  <td>
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={
                        () => {
                          navigate(`/usertrackings/1`);
                          // <Navigate to={`/userTrackings/1`} />;
                        }
                        // history.push(`/userTrackings/${val.TrackingId}`)
                      }
                    >
                      Details
                    </CButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <CPagination
              activePage={page === 0 ? 1 : page}
              onActivePageChange={pageChange}
              pages={NumberOfUser}
              doubleArrows={false}
              align="center"
              hidden={data.length <= 0 || NumberOfUser === 1}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserTrackings;
