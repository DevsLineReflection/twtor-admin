import { CCard, CCardBody, CCardHeader, CCol, CRow,CPagination,CDropdown,CDataTable,CBadge,CButton } from "@coreui/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory,useLocation } from "react-router-dom";
import jBox from 'jbox';
import 'jbox/dist/jBox.all.css';
import http from "../../config";

const CouponList = ({ match }) => {
    const history = useHistory();

    const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);

    const [CouponCode, setCouponCode] = useState([]);
    const [CouponID, setCouponID] = useState([]);
    const [DiscountOnPercentage, setDiscountOnPercentage] = useState([]);
    const [DiscountOnPrice, setDiscountOnPrice] = useState([]);
    const [DiscountType, setDiscountType] = useState([]);
    const [FormDate, setFormDate] = useState([]);
    const [ToDate, setToDate] = useState([]);
    const [PromoName, setPromoName] = useState([]);
   
    const [coupon, setCoupon] = useState([])

    const [message, setMessage] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [submitDisable, setSubmitDisable] = useState("");
    const [isStatusChaged, setIsStatusChaged] = useState(false);

//     const [TicketId, setTicketId] = useState("")
//   const [SubsSubject, setSubsSubject] = useState("")
//   const [SubsEmail, setSubsEmail] = useState("")
//   const [Details, setDetails] = useState("")
//   const [SubsStatus, setSubsStatus] = useState("")
//   const [SubsUploadedFile, setSubsUploadedFile] = useState("")
//   const [SubsCreatedOn, setSubsCreatedOn] = useState("")

const [StartLimit, setStartLimit] = useState(0)
  const [NumberOfUser, setNumberOfUser] = useState(0)


  const [GlobalSearch, setGlobalSearch] = useState("")
  const [couponCodeForFormList, setCouponCodeForFormList] = useState([]);
  const [CouponListWithUsedNumber, setCouponListWithUsedNumber] = useState([]);

    useEffect(() => {
            http
                .get("/api/coupon/getList", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    let data = res.data;
                    setCoupon(data);

                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("token-expiration");
                        window.location.href = "/Subscriber";
                    }

                });
            http.get('/api/coupon/getCouponCodeFormName')
            .then((res) => {
                if(res.data) {
                  setCouponCodeForFormList(res.data);
                }
                
            })
            http.get('/api/coupon/getCouponListWithUsedNumber')
            .then((res) => {
                if(res.data) {
                  setCouponListWithUsedNumber(res.data);
                }
                
            })
    }, []);
        
 
  
    const pageChange = newPage => {
        console.log(newPage)
        currentPage !== newPage && history.push(`/support-ticket?page=${newPage}`)
        if (newPage >= 1) {
          setStartLimit((newPage - 1) * 10)
    
        }
      }

    return (
        <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Coupon List</CCardHeader>
          <CCardBody>
            {/* using datatable starts  */}
             <CDataTable
              items={coupon}
              fields={[
                "ID",
                "CouponCode",
                
                "DiscountType",
                "DiscountOnPercentage",
                "DiscountOnPrice",
                "PromoName",
                "FormDate",
                "ToDate",{   
                  key: 'FormName',
                  label: 'Form Name(Coupon Valid for)',
                  // _style: { width: '1%' },
                  sorter: false,
                  filter: false
              },{   
                key: 'UseedBy',
                label: 'Useed By(Number of User)',
                _style: { width: '1%' },
                sorter: false,
                filter: false
              },
                {   
                  key: 'show_details',
                  label: '',
                  _style: { width: '1%' },
                  sorter: false,
                  filter: false
              } ,
                {   
                  key: 'edit_details',
                  label: '',
                  _style: { width: '1%' },
                  sorter: false,
                  filter: false
              } 
              ]}
           
              hover
              responsive
              striped
              tableFilter={{label: 'Search', placeholder: 'Search here ...'}}
              columnFilter
              pagination
              itemsPerPage={10}
              activePage={page}
              clickableRows
              //onRowClick={(item) => history.push(`/support-ticket/${item.TicketId}`)}
              scopedSlots={{
                FormName: (item) => (
                  <td style={{textAlign:'center'}}>
                    {couponCodeForFormList.map((val,key) => (
                      <>{val.CouponID === item.ID ? <b>{val.FromName}{" , "}</b> : ' '}</>
                    ))}
                  </td>
                ),
                UseedBy: (item) => (
                  <td style={{textAlign:'center'}}>
                  {CouponListWithUsedNumber.find((val,key) => (val.CouponCode === item.CouponCode)) ?
                  <>
                    {CouponListWithUsedNumber.map((val,key) => (
                      <>{val.CouponCode === item.CouponCode ? <b>{val.TimeOfUsed}</b> : ' '}</>
                    ))}
                  </>
                  : <b>0</b>
                  }
                  </td>
                ),
                DiscountType: (item) => (
                  <td>
                      {item.DiscountType=== "0"?"Price":"Percentage"}
                  </td>
                ),
                DiscountOnPercentage: (item) => (
                  <td>
                   
                   <b>{item.DiscountOnPercentage ? item.DiscountOnPercentage+"%" : '---'}</b>
                  </td>
                ),
                DiscountOnPrice: (item) => (
                  <td>
                   
                     <b> {item.DiscountOnPrice?"$"+item.DiscountOnPrice : '---'} </b> 
                  </td>
                ),
                FormDate: (item) => (
                  <td>
                    <Moment format="DD-MMM-YYYY LT">{item.FormDate}</Moment>
                  </td>
                ),
                ToDate: (item) => (
                  <td>
                    <Moment format="DD-MMM-YYYY LT">{item.ToDate}</Moment>
                  </td>
                ),
                'show_details':
                        (item, index) => {
                            return (
                            <td className="py-2">
                                <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => history.push(`/couponCode/couponList/${item.CouponCode}`)}
                                >
                                Details
                                </CButton>
                            </td>
                            )
                        },
               
                'edit_details':
                        (item, index) => {
                            return (
                            <td className="py-2">
                                <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={() => history.push(`/couponCode/couponCodeGenerate/${item.CouponCode}`)}
                                >
                                Edit
                                </CButton>
                            </td>
                            )
                        }
               
                
              }}
            />
            {/* using datatable ends  */}

           
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    )
}

export default CouponList;