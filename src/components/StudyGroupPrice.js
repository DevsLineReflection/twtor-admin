import { CButton, CCol } from "@coreui/react";
import React, { useState } from "react";
import { useGetSubscriptionbandQuery } from "src/features/subscriptionband/subscriptionbandApi";

function StudyGroupPrice({studygroup}) {
  const {
    data: Subscriptionband,
    isLoading,
    error,
  } = useGetSubscriptionbandQuery();

  // const [Price, setPrice] = useState('')
  // const [IsPromo, setIsPromo] = useState('')
  // const [PromoPrice, setPromoPrice] = useState('')
  // const [FormDate, setFormDate] = useState('')
  // const [ToDate, setToDate] = useState('')
  // const [FromTime, setFromTime] = useState('')
  // const [ToTime, setToTime] = useState('')
  // let EachBandItem = {

  // }

  const [StudyGroupPrices,setStudyGroupPrices] = ('')

  const StudyGroupPricesField = (item,key) => {
    let findStudyGroupBand = StudyGroupPrices.find(i => i.band_id == item.id );
    return findStudyGroupBand[key];
  }
  const StudyGroupPricesFieldChanges = (item,key,value) => {
    setStudyGroupPrices((prev) => {
      let copy = [...prev];
      let studyGroupBandIndex = copy.findIndex(i => i.band_id === item.id);
      if(studyGroupBandIndex >= 0) {
        copy[studyGroupBandIndex] = {
          ...copy[studyGroupBandIndex],
          key:value
        }        
      } else {
        copy.push({
          band_id:item.id,
          key:value
        })
      }
    })
  }

  const savePrice = () => {
    console.log(StudyGroupPrices)
  }

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
                    name="Price"
                    value={StudyGroupPricesField(item,'Price')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'Price',e.target.value)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    value={StudyGroupPricesField(item,'IsPromo')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'IsPromo',e.target.value)}
                  ></input>
                </td>

                <td>
                  <input
                    type="number"
                    name="PromoPrice"
                    value={StudyGroupPricesField(item,'PromoPrice')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'PromoPrice',e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="FromDate"
                    value={StudyGroupPricesField(item,'FromDate')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'FromDate',e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="date"
                    name="ToDate"
                    value={StudyGroupPricesField(item,'ToDate')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'ToDate',e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="FromTime"
                    value={StudyGroupPricesField(item,'FromTime')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'FromTime',e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    name="ToTime"
                    value={StudyGroupPricesField(item,'ToTime')}
                    onChange={(e) => StudyGroupPricesFieldChanges(item,'ToTime',e.target.value)}
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
                <CButton type="button" color="info" onClick={() => savePrice()}>
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
