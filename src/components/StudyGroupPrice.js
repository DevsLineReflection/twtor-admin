import { CButton, CCol } from "@coreui/react";
import React from "react";
import { useGetSubscriptionbandQuery } from "src/features/subscriptionband/subscriptionbandApi";

function StudyGroupPrice() {
  const {
    data: Subscriptionband,
    isLoading,
    error,
  } = useGetSubscriptionbandQuery();

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="table table-striped table-hover table-responsive text-right">
          <thead>
            <tr>
              <th width="15%">Band</th>
              <th>Price</th>
              <th>Active Promo</th>
              <th>Promo Price</th>
              <th>FromDate</th>

              <th>ToDate</th>
              <th>FromTime</th>
              <th>ToTime</th>
              {/* <th width="10%">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {Subscriptionband?.map((item) => (
              <tr>
                <td>{item.band_name}</td>
                <td>
                  <input
                    type="number"
                    name="I90Price"
                    // value={I90Price}
                    // onChange={(e) => setI90Price(e.target.value)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    // checked={I90promotion}
                    // onClick={(e) => setI90Promotion(e.target.checked)}
                  ></input>
                </td>

                <td>
                  <input
                    type="number"
                    name="I90PromotionalPrice"
                    // value={I90PromotionalPrice}
                    // onChange={(e) =>
                    //   setI90PromotionalPrice(e.target.value)
                    // }
                    // disabled={!I90promotion}
                    // required={I90promotion}
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="FromDate"
                    // value={I90PromotionalFromDate}
                    // onChange={(e) =>
                    //   setI90PromotionalFromDate(e.target.value)
                    // }
                    // disabled={!I90promotion}
                    // required={I90promotion}
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="ToDate"
                    // value={I90PromotionalToDate}
                    // onChange={(e) =>
                    //   setI90PromotionalToDate(e.target.value)
                    // }
                    // min={I90PromotionalFromDate}
                    // disabled={!I90promotion}
                    // required={I90promotion}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="fromTime"
                    // value={I90PromotionalFromTime}
                    // onChange={(e) =>
                    //   setI90PromotionalFromTime(e.target.value)
                    // }
                    // disabled={!I90promotion}
                    // required={I90promotion}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="ToTime"
                    // value={I90PromotionalToTime}
                    // onChange={(e) =>
                    //   setI90PromotionalToTime(e.target.value)
                    // }
                    // // min={I90PromotionalFromTime}
                    // min={
                    //   I90PromotionalFromDate === I90PromotionalToDate
                    //     ? I90PromotionalFromTime
                    //     : ""
                    // }
                    // disabled={!I90promotion}
                    // required={I90promotion}
                  />
                </td>
                {/* <td>
            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </td> */}
              </tr>
            ))}
            <tr>
              <td colspan={8} className="text-center">
                <CButton type="submit" color="info">
                  Save
                </CButton>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default StudyGroupPrice;
