import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from "@coreui/react"
import { useEffect, useState } from "react"
import Moment from "react-moment";
import { useHistory,useLocation } from "react-router-dom";
import http from "../../config";

const CouponCodeDetails = ({ match }) => {

    // const [userSession, setUserSession] = useState({});
    const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [StartLimit, setStartLimit] = useState(0)



    const [couponDetails, setCouponDetails] = useState([])
    const [couponForm, setCouponForm] = useState([])

    const history = useHistory();

    useEffect(() => {
        if(match.params.couponCode) {
            http.get('/api/coupon/get-all-couponCode/'+match.params.couponCode)
            .then((res) => {
                    setCouponDetails(res.data.couponCodeDetails);
            })
            http.get('/api/coupon/getCouponValidForm/'+match.params.couponCode)
            .then((res) => {
                if(!res.data[0].FromName) {
                    setCouponForm([]);
                } else {
                    console.log(res.data);
                    setCouponForm(res.data); 
                }
                
            })
        }
            
    }, [])
    

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                <CCardHeader>
                Coupon Code Details ( <b>"{match.params.couponCode}"</b> Used for <b>{couponDetails.length}</b> times) <br/>
                {couponForm.length>0 ? 'Valid for : ':''}
                {couponForm ? 
                    couponForm.map((val)=><><b>{val.FromName}</b> {" form | "}</>)
                    :'' }
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={couponDetails}
                        fields={[
                        
                        'FromName', 
                        'Phone',
                        'Amount', 
                        'TransactionDate',
                        ]}
                        hover
                        striped
                        tableFilter={{label: 'Search', placeholder: 'Search here ...'}}
                        columnFilter
                        pagination
                        itemsPerPage={10}
                        clickableRows
                        scopedSlots = {{
                           
                          
                            FromName:
                            (item)=>(
                            <td>
                                {item.ItemName}
                            </td>
                            ),
                            TransactionDate:
                            (item)=>(
                            <td>
                                <Moment format="DD-MMM-YYYY LT">{item.TransactionDate}</Moment>
                            </td>
                            ),
                        }}
                        />
                
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CouponCodeDetails