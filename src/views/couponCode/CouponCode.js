import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CButton,
  CLabel,
  CSelect,
  CInputCheckbox,
  CFormCheck,
} from "@coreui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import jBox from "jbox";
import "jbox/dist/jBox.all.css";
import http from "../../config";
import { v4 as uuidv4 } from "uuid";

const CouponCode = ({ match }) => {
  const history = useHistory();

  const [subsId, setSubsId] = useState("");
  const [settingsN400Key, setSettingsN400Key] = useState("N400FormPrice");

  const [discountOnPercentage, setDiscountOnPercentage] = useState("");
  const [discountOnPriceLimit, setDiscountOnPriceLimit] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [CouponType, setCouponType] = useState("");
  const [Applies, setApplies] = useState(false);
  const [Applies2, setApplies2] = useState(false);
  const [Applies3, setApplies3] = useState(false);
  const [Applies4, setApplies4] = useState(false);
  const [Applies5, setApplies5] = useState(false);
  const [Applies6, setApplies6] = useState(false);
  const [Applies7, setApplies7] = useState(false);
  const [Applies8, setApplies8] = useState(false);
  const [Applies9, setApplies9] = useState(false);
  const [Applies10, setApplies10] = useState(false);
  const [Applies11, setApplies11] = useState(false);

  const [Applies539, setApplies539] = useState(false);
  const [Applies600, setApplies600] = useState(false);
  const [Applies565, setApplies565] = useState(false);
  const [Applies824, setApplies824] = useState(false);
  const [Applies129f, setApplies129f] = useState(false);
  const [Applies765ws, setApplies765ws] = useState(false);
  const [Applies821d, setApplies821d] = useState(false);

  const [couponFromDate, setCouponFromDate] = useState("");
  const [couponToDate, setCouponToDate] = useState("");
  const [couponFromTime, setCouponFromTime] = useState("");
  const [couponToTime, setCouponToTime] = useState("");
  const [Error, setError] = useState(false);


  const [promoName, setPromoName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeID, setCouponCodeID] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [couponDetails, setCouponDetails] = useState([]);

  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    console.log(match.params);
    if (match.params.couponCode) {
      http
        .get("/api/coupon/get-couponCode/" + match.params.couponCode)
        .then((res) => {
          console.log(res.data);
          if (res.data.couponDetails) {
            let data = res.data.couponDetails;

            let startdate = moment(data.FormDate);
            let enddate = moment(data.ToDate);

            setDiscountOnPercentage(data.DiscountOnPercentage);
            setDiscountOnPriceLimit(data.DiscountOnPrice);
            setPromoName(data.PromoName);
            setDiscountType(data.DiscountType);
            setCouponType(data.CouponType);
            setCouponCode(data.CouponCode);
            setCouponCodeID(data.ID);

            // setI130aPromotion(data.IsPromitionActive);
            setCouponFromDate(startdate.format("YYYY-MM-DD"));
            setCouponToDate(enddate.format("YYYY-MM-DD"));
            setCouponFromTime(startdate.format("HH:mm"));
            setCouponToTime(enddate.format("HH:mm"));

            setDataExists(true);
          }

          if (res.data.couponForm) {
            let data = res.data.couponForm;
            console.log(res.data.couponForm[0].FromName);
            for (let formNames = 0; formNames < data.length; formNames++) {
              // console.log(data[formNames].FromName)
              if (data[formNames].FromName === "n-400") {
                setApplies(true);
              }
              if (data[formNames].FromName === "i-130") {
                setApplies2(true);
              }
              if (data[formNames].FromName === "i-765") {
                setApplies3(true);
              }
              if (data[formNames].FromName === "i-589") {
                setApplies4(true);
              }
              if (data[formNames].FromName === "i-134") {
                setApplies5(true);
              }
              if (data[formNames].FromName === "i-751") {
                setApplies11(true);
              }
              if (data[formNames].FromName === "i-485") {
                setApplies6(true);
              }
              if (data[formNames].FromName === "g-1145") {
                setApplies7(true);
              } if (data[formNames].FromName === "i-90") {
                setApplies8(true);
              } if (data[formNames].FromName === "i-864") {
                setApplies9(true);
              } if (data[formNames].FromName === "i-131") {
                setApplies10(true);
              } if (data[formNames].FromName === "n-600") {
                setApplies600(true);
              } if (data[formNames].FromName === "n-565") {
                setApplies565(true);
              } if (data[formNames].FromName === "i-824") {
                setApplies824(true);
              } if (data[formNames].FromName === "i-129f") {
                setApplies129f(true);
              } if (data[formNames].FromName === "i-821d") {
                setApplies821d(true);
              } if (data[formNames].FromName === "i-539") {
                setApplies539(true);
              } if (data[formNames].FromName === "i-765ws") {
                setApplies765ws(true);
              }
            }
          }
        });
    }


    // // added by ali hasan
    // http
    //   .get("api/form-language/settings/fromDate", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     if (res.data[0]) {
    //       setFromDate(res.data[0].SettingsValue);
    //     }
    //   });
    // http
    //   .get("api/form-language/settings/toDate", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);

    //     if (res.data[0]) {
    //       setToDate(res.data[0].SettingsValue);
    //     }
    //   });
  }, []);

  const checkCouponCode = (e) => {
    var regex = new RegExp(" ");
    if (regex.test(e.target.value)) {
      return;
    }
    setCouponCode(e.target.value);
    if (e.target.value !== "") {
      http
        .get("/api/coupon/checkCoupon/" + e.target.value, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {

          if (res.data[0].Total > 0) {
            setError(true);
          } else {
            setError(false);
          }

        });
    } else {
      setError(false);
    }

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    new jBox("Notice", {
      content: "Creating ...",
      color: "yellow",
      attributes: { x: "right", y: "bottom" },
    });

    let Data = {
      FormDate: moment(couponFromDate + " " + couponFromTime)
        .utc()
        .format("YYYY-MM-DD HH:mm"),
      ToDate: moment(couponToDate + " " + couponToTime)
        .utc()
        .format("YYYY-MM-DD HH:mm"),

      FromNameN400: Applies,
      FromNameI130: Applies2,
      FromNameI765: Applies3,
      FromNameI589: Applies4,
      FromNameI134: Applies5,
      FromNameI751: Applies11,
      FromNameI485: Applies6,
      FromNameG1145: Applies7,
      FromNameI90: Applies8,
      FromNameI864: Applies9,
      FromNameI131: Applies10,

      FromNameI129f: Applies129f,
      FromNameI821d: Applies821d,
      FromNameI824: Applies824,
      FromNameI539: Applies539,
      FromNameI765ws: Applies765ws,
      FromNameN600: Applies600,
      FromNameN565: Applies565,

      DiscountOnPercentage: discountType == 1 ? discountOnPercentage : "",
      DiscountOnPrice: discountType == 0 ? discountOnPriceLimit : "",
      DiscountType: discountType,
      CouponType: CouponType,
      PromoName: promoName,
      CouponCode: couponCode,
      CouponCodeID: couponCodeID

    };
    console.log(Data);
    if (dataExists) {
      console.log("from put")
      console.log(couponCode)
      console.log(couponCodeID)

      http
        .put("/api/coupon/createCouponUpdate", Data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          new jBox("Notice", {
            content: "Created Successfully.",
            color: "green",
            attributes: { x: "right", y: "bottom" },
          });
        })

    } else {
      console.log("from post")
      http
        .post("api/coupon/createCoupon", Data, {

          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setDataExists(true);
          // console.log(res)
          new jBox("Notice", {
            content: "Created Successfully.",
            color: "green",
            attributes: { x: "right", y: "bottom" },
          });
        });

    }
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Generate Coupon Code</CCardHeader>
          <CCardBody>
            <CRow className="justify-content-md-center">
              <div className="col-md-8">
                <form onSubmit={(e) => submitHandler(e)}>
                  <CRow>
                    <div id="elg-question" style={{ marginLeft: 50 }}>
                      <div className="form-group eligible-question">
                        <div class="eligible-question-text">
                          <label>
                            Select the discount type?
                            <span className="require-field">*</span>{" "}
                            <span
                              className="text-color HaveYouEVERClaimedUSCitizenOtherway"
                              id="HaveYouEVERClaimedUSCitizenOtherway"
                            ></span>{" "}
                          </label>
                        </div>
                        <div>
                          <input
                            // className="form-check-input"
                            type="radio"
                            name="discountType"
                            id="n400-pageOne-yes1"
                            checked={discountType === "1"}
                            onChange={(e) => setDiscountType("1")}
                            required
                          />{" "}
                          <label htmlFor="n400-pageOne-yes1"> Percentage </label>{" "}
                        </div>
                        <div>
                          <input
                            // className="form-check-input"
                            type="radio"
                            name="discountType"
                            id="n400-pageOne-no1"
                            checked={discountType === "0"}
                            onChange={(e) => setDiscountType("0")}
                            required
                          />{" "}
                          <label htmlFor="n400-pageOne-no1">Discount on Price</label>{" "}
                        </div>
                        <div
                          style={{
                            display: discountType === "1" ? "inline" : "none",
                          }}
                        >
                          <div>
                            <label >Enter the percentage</label>
                            <span className="require-field">*</span> <br />
                            <input
                              type="text"
                              name="percentageLimit"

                              value={discountOnPercentage}
                              onChange={(e) => {
                                setDiscountOnPercentage(e.target.value);
                              }}
                              required={discountType === "1"}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: discountType === "0" ? "inline" : "none",
                          }}
                        >
                          <div>
                            <label htmlFor="n400-pageOne-no2">Enter the Price </label>
                            <span className="require-field">*</span> <br />
                            <input
                              type="text"
                              name="percentageLimit"
                              id="n400-pageOne-no2"
                              value={discountOnPriceLimit}
                              onChange={(e) => {
                                setDiscountOnPriceLimit(e.target.value);
                              }}
                              required={discountType === "0"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group eligible-question">
                        <div class="eligible-question-text">
                          <label>
                            Select the Coupon Genaration type?
                            <span className="require-field">*</span>{" "}
                            <span
                              className="text-color HaveYouEVERClaimedUSCitizenOtherway"
                              id="HaveYouEVERClaimedUSCitizenOtherway"
                            ></span>{" "}
                          </label>
                        </div>
                        <div>
                          <input
                            // className="form-check-input"
                            type="radio"
                            name="CouponType"
                            id="n400-pageTwo-yes1"
                            checked={CouponType === "1"}
                            onChange={(e) => setCouponType("1")}
                            required
                          />{" "}
                          <label htmlFor="n400-pageTwo-yes1"> System Defined </label>{" "}
                        </div>
                        <div>
                          <input
                            // className="form-check-input"
                            type="radio"
                            name="CouponType"
                            id="n400-pageTwo-no1"
                            checked={CouponType === "0"}
                            onChange={(e) => setCouponType("0")}
                            required
                          />{" "}
                          <label htmlFor="n400-pageTwo-no1">Own Defined</label>{" "}
                        </div>
                        <div
                          style={{
                            display: CouponType === "0" ? "inline" : "none",
                          }}
                        >
                          <div>
                            <label >Enter the Coupon Code</label>
                            <span className="require-field">*</span> <br />
                            <input
                              type="text"
                              name="couponCode"

                              value={couponCode}
                              onChange={(e) => {
                                checkCouponCode(e)
                              }}
                              maxLength={15}
                              required={CouponType === "0"}
                            /> {" "} <span> Maximum Coupon Length is 15.</span><br />
                            {Error &&
                              <span style={{ color: 'red' }}> *Coupon Code already in used!</span>
                            }
                          </div>

                        </div>

                      </div>
                      {/* frm name starts  */}
                      <div id="can-ethnicity-card">
                        <div className="form-group">
                          <span htmlFor="can-ethnicity-card">
                            Check the box, that applies:{" "}
                            <span
                              id="CheckTheBox"
                              className="CheckTheBox text-color "
                            >
                              {" "}
                            </span>{" "}
                          </span>
                        </div>
                        <div className="row" style={{ border: '1px #b1b1b1 solid', padding: '2px', marginLeft: "2px" }}>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="can-ethnicity-1"
                              name="Applies"
                              checked={Applies}
                              onChange={(e) => setApplies(e.target.checked)}
                            />
                            <label

                              htmlFor="can-ethnicity-1"
                              class="pr-2"
                            >
                              N400
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-2"
                              checked={Applies2}
                              onChange={(e) => setApplies2(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-2"
                            >
                              I130
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-3"
                              checked={Applies3}
                              onChange={(e) => setApplies3(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-3"
                            >
                              I765
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="can-ethnicity-4"
                              name="Applies4"
                              checked={Applies4}
                              onChange={(e) => setApplies4(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-4"
                            >
                              I589
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies5"
                              id="can-ethnicity-5"
                              checked={Applies5}
                              onChange={(e) => setApplies5(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-5"
                            >
                              I134
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="can-ethnicity-6"
                              checked={Applies6}
                              onChange={(e) => setApplies6(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-6"
                            >
                              I485
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-7"
                              checked={Applies7}
                              onChange={(e) => setApplies7(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-7"
                            >
                              G1145
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-8"
                              checked={Applies8}
                              onChange={(e) => setApplies8(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-8"
                            >
                              I90
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-9"
                              checked={Applies9}
                              onChange={(e) => setApplies9(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-9"
                            >
                              I864
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Ethnicity"
                              id="an-ethnicity-131"
                              checked={Applies10}
                              onChange={(e) => setApplies10(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="an-ethnicity-131"
                            >
                              I131
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies5"
                              id="can-ethnicity-11"
                              checked={Applies11}
                              onChange={(e) => setApplies11(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-11"
                            >
                              I751
                            </label>{" "}
                          </div>


                          {/* free forms */}

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies600"
                              id="can-ethnicity-n600"
                              checked={Applies600}
                              onChange={(e) => setApplies600(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-n600"
                            >
                              N600
                            </label>{" "}
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies565"
                              id="can-ethnicity-n565"
                              checked={Applies565}
                              onChange={(e) => setApplies565(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-n565"
                            >
                              N565
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies824"
                              id="can-ethnicity-i824"
                              checked={Applies824}
                              onChange={(e) => setApplies824(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-i824"
                            >
                              I824
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies129f"
                              id="can-ethnicity-i129f"
                              checked={Applies129f}
                              onChange={(e) => setApplies129f(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-i129f"
                            >
                              I129f
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies765ws"
                              id="can-ethnicity-i765ws"
                              checked={Applies765ws}
                              onChange={(e) => setApplies765ws(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-i765ws"
                            >
                              I765ws
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies539"
                              id="can-ethnicity-i539"
                              checked={Applies539}
                              onChange={(e) => setApplies539(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-i539"
                            >
                              I539
                            </label>{" "}
                          </div>

                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="Applies821d"
                              id="can-ethnicity-i821d"
                              checked={Applies821d}
                              onChange={(e) => setApplies821d(e.target.checked)}
                            />
                            <label
                              class="pr-2"
                              htmlFor="can-ethnicity-i821d"
                            >
                              I821d
                            </label>{" "}
                          </div>

                        </div>
                        <br />
                        <div>
                          <label className="form-check-label">
                            Enter the start date and time.
                          </label>
                          <br />
                          <input
                            type="date"
                            name="FromDate"
                            value={couponFromDate}
                            onChange={(e) => setCouponFromDate(e.target.value)}
                          />
                          {"  "}

                          <input
                            type="time"
                            name="FromDate"
                            value={couponFromTime}
                            onChange={(e) => setCouponFromTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="form-check-label">
                            Enter the end date and time.
                          </label>
                          <br />
                          <input
                            type="date"
                            name="ToDate"
                            value={couponToDate}
                            onChange={(e) => setCouponToDate(e.target.value)}
                          />
                          {"  "}

                          <input
                            type="time"
                            name="ToDate"
                            value={couponToTime}
                            onChange={(e) => setCouponToTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="form-check-label">Promo Name</label>
                          <br />
                          <input
                            type="text"
                            name="promoName"
                            value={promoName}
                            onChange={(e) => setPromoName(e.target.value)}
                          />
                        </div>
                        {/* <div>
                          <label className="form-check-label">
                            Coupon Code
                          </label>
                          <br />
                          <input
                            type="text"
                            name="couponCode"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                        </div> */}
                        <br />

                        <CButton type="submit" color="primary">
                          Submit
                        </CButton>
                      </div>
                      {/* frm name ends */}
                    </div>

                    {/* coupun code body ends here  */}
                  </CRow>
                </form>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CouponCode;
