import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { useGetUserReportQuery } from "src/features/user/userApi";

const WidgetsDropdown = () => {
  const {
    data: userReport,
    isLoading,
    error,
    isFetching,
  } = useGetUserReportQuery();

  const [userData, setUserData] = useState("");

  let dataUserMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const getTotalByMonth = (month) => {
    if (userData) {
      debugger;
      let findItem = userData?.find((item) => item.month == month);

      if (findItem) {
        return findItem.total;
      }
    }
    return 0;
  };

  if (!isLoading && userReport && !userData) {
    setUserData(userReport.report);
    dataUserMonth = [
      getTotalByMonth("January"),
      getTotalByMonth("February"),
      getTotalByMonth("March"),
      getTotalByMonth("April"),
      getTotalByMonth("May"),
      getTotalByMonth("June"),
      getTotalByMonth("July"),
      getTotalByMonth("August"),
      getTotalByMonth("September"),
      getTotalByMonth("October"),
      getTotalByMonth("November"),
      getTotalByMonth("December"),
    ];
  }

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {userReport && userReport.total ? userReport.total : "..."}{" "}
              {/* <span className="fs-6 fw-normal">
                  (-12.4% <CIcon icon={cilArrowBottom} />)
                </span> */}
            </>
          }
          title="Members"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <Link to="/users">
                  <CDropdownItem>User List</CDropdownItem>
                </Link>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                datasets: [
                  {
                    label: "Registered User by Month",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-primary"),
                    data: isLoading
                      ? dataUserMonth
                      : [
                          getTotalByMonth("January"),
                          getTotalByMonth("February"),
                          getTotalByMonth("March"),
                          getTotalByMonth("April"),
                          getTotalByMonth("May"),
                          getTotalByMonth("June"),
                          getTotalByMonth("July"),
                          getTotalByMonth("August"),
                          getTotalByMonth("September"),
                          getTotalByMonth("October"),
                          getTotalByMonth("November"),
                          getTotalByMonth("December"),
                        ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 0,
                    // max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              15{" "}
              {/* <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Study Group"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "transparent",
                    borderColor: "rgba(255,255,255,.55)",
                    pointBackgroundColor: getStyle("--cui-info"),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              50k{" "}
              {/* <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span> */}
            </>
          }
          title="Twtor Karma Points Balance"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: "70px" }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              44K{" "}
              {/* <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span> */}
            </>
          }
          title="Twtor Karma Points Distributed"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [
                      78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                      67, 82,
                    ],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
