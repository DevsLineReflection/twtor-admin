import { CButton, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  useCreatestudygrouppriceMutation,
  useGetstudygrouppriceQuery,
} from "src/features/studygroupprice/studygrouppriceApi";
import { useGetSubscriptionbandQuery } from "src/features/subscriptionband/subscriptionbandApi";

function StudyGroupPrice({ studygroup }) {
  const {
    data: Subscriptionband,
    isLoading,
    error,
  } = useGetSubscriptionbandQuery();
  const {
    data: getstudygroupprice,
    isLoading: studygrouppriceLoading,
    error: studygrouppriceError,
  } = useGetstudygrouppriceQuery(studygroup);

  const [
    createstudygroupprice,
    { data, isLoading: createstudygrouppriceLoaidng, error: createError },
  ] = useCreatestudygrouppriceMutation();

  // const [Price, setPrice] = useState('')
  // const [IsPromo, setIsPromo] = useState('')
  // const [PromoPrice, setPromoPrice] = useState('')
  // const [FormDate, setFormDate] = useState('')
  // const [ToDate, setToDate] = useState('')
  // const [FromTime, setFromTime] = useState('')
  // const [ToTime, setToTime] = useState('')
  // let EachBandItem = {

  // }

  const [StudyGroupPrices, setStudyGroupPrices] = useState([]);

  useEffect(() => {
    if (getstudygroupprice && getstudygroupprice.length > 0) {
      let prices = [];
      getstudygroupprice.forEach((element) => {
        prices.push(element);
      });
      debugger;
      setStudyGroupPrices(prices);
    }
  }, [getstudygroupprice]);

  const StudyGroupPricesField = (item, key) => {
    let findStudyGroupBand = StudyGroupPrices.find((i) => i.band_id == item.id);

    if (findStudyGroupBand) {
      return findStudyGroupBand[key];
    } else {
      return "";
    }
  };
  const StudyGroupPricesFieldChanges = (item, e) => {
    setStudyGroupPrices((prev) => {
      let val = e.target.value;
      let name = e.target.name;
      let copy = [...prev];
      let studyGroupBandIndex = copy.findIndex((i) => i.band_id === item.id);
      debugger;
      if (studyGroupBandIndex >= 0) {
        if (name == "ispromotional") {
          copy[studyGroupBandIndex] = {
            ...copy[studyGroupBandIndex],
            [name]: e.target.checked,
          };
        } else {
          copy[studyGroupBandIndex] = {
            ...copy[studyGroupBandIndex],
            [name]: val,
          };
        }
      }
      return copy;
    });
  };

  const savePrice = () => {
    createstudygroupprice({ StudyGroupPrices });
  };

  return (
    <>
      {studygrouppriceLoading ? (
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
            {StudyGroupPrices?.map((item) => (
              <tr>
                <td>
                  {
                    Subscriptionband.find((i) => item.band_id == i.id)
                      ?.band_name
                  }
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "price"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
                    required
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    name="ispromotional"
                    checked={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "ispromotional"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
                  ></input>
                </td>

                <td>
                  <input
                    type="number"
                    name="promotionalprice"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "promotionalprice"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="formdate"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "formdate"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="todate"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "todate"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="formtime"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "formtime"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),

                        e
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="totime"
                    value={StudyGroupPricesField(
                      Subscriptionband.find((i) => item.band_id == i.id),
                      "totime"
                    )}
                    onChange={(e) =>
                      StudyGroupPricesFieldChanges(
                        Subscriptionband.find((i) => item.band_id == i.id),
                        e
                      )
                    }
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
                <CButton
                  type="button"
                  color="info"
                  onClick={() => savePrice()}
                  disabled={createstudygrouppriceLoaidng}
                >
                  {createstudygrouppriceLoaidng ? "Saving..." : "Save"}
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
