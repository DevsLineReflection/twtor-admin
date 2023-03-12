import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  //   CDataTable,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";

import axios from "../../lib/axios";

const UserTracking = ({ match }) => {
  debugger;
  const [userSession, setUserSession] = useState({});
  const [userSessionActivity, setUserSessionActivity] = useState([]);

  useEffect(() => {
    // axios
    //   .get("/api/user-session/sessions-details/" + match.params.id)
    //   .then((res) => {
    //     setUserSession(res.data.session);
    //     setUserSessionActivity(res.data.sessionActivity);
    //   });
  }, []);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Web Traffic Details</CCardHeader>
          {/* <CCardBody>
            <CDataTable
              items={userSessionActivity}
              fields={["Url", "RefrrerUrl", "Fbclid", "Visited Time"]}
              hover
              striped
              tableFilter={{ label: "Search", placeholder: "Search here ..." }}
              columnFilter
              pagination
              itemsPerPage={10}
              clickableRows
              scopedSlots={{
                Url: (item) => (
                  <td onClick={() => window.open(item.Url)}>
                    <a href="javascript: void(0)">{item.Url}</a>
                  </td>
                ),
                RefrrerUrl: (item) => (
                  <td onClick={() => window.open(item.RefrrerUrl)}>
                    <a href="javascript: void(0)">{item.RefrrerUrl}</a>
                  </td>
                ),
                "Visited Time": (item) => (
                  <td>
                    <Moment format="DD-MMM-YYYY LT">{item.CreatedTime}</Moment>
                  </td>
                ),
              }}
            />
          </CCardBody> */}
          <CCardBody>
            <div className="row my-2 mx-0">
              <div className="col-sm-12 form-inline p-0 c-datatable-filter">
                <label className="mfe-2">Search</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here ..."
                  // value={GlobalSearch}
                  // onChange={(e) => globalSearch(e.target.value)}
                />
              </div>
            </div>
            <br />
            <table className="table table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th>Url</th>
                  <th>Refrrer Url</th>
                  <th>Fbclid</th>
                  <th>Visited Time</th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      // value={allSearch.TrackingId}
                      // onChange={(e) =>
                      //   indivudalSearch(e.target.value, "TrackingId")
                      // }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      // value={allSearch.SessionId}
                      // onChange={(e) =>
                      //   indivudalSearch(e.target.value, "SessionId")
                      // }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      // value={allSearch.IP}
                      // onChange={(e) => indivudalSearch(e.target.value, "IP")}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      // value={allSearch.VisitedTime}
                      // onChange={(e) =>
                      //   indivudalSearch(e.target.value, "VisitedTime")
                      // }
                      className="form-control"
                    />
                  </td>
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
                    <a href="javascript: void(0)">
                      https://twtor-frontend-nextjs.vercel.app/
                    </a>
                    {/* {val.TrackingId} */}
                  </td>
                  <td>
                    <a href="javascript: void(0)">
                      https://twtor-frontend-nextjs.vercel.app/
                    </a>
                    {/* {val.SessionId} */}
                  </td>

                  <td
                    style={{ fontWeight: "bold" }}
                    // onClick={() => history.push(`/userTrackingsIP/${val.IP}`)}
                  >
                    <a href="javascript: void(0)">
                      {/* 66.249.70.24 */}
                      {/* {val.IP} */}
                    </a>
                  </td>
                  <td>
                    10-Mar-2023 8:39 PM
                    {/* <Moment format="DD-MMM-YYYY LT">{val.CreatedTime}</Moment> */}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <CPagination
              activePage={page === 0 ? 1 : page}
              onActivePageChange={pageChange}
              pages={NumberOfUser}
              doubleArrows={false}
              align="center"
              hidden={data.length <= 0 || NumberOfUser === 1}
            /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserTracking;
