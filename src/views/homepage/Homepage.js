import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
  CCardGroup,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from "@coreui/react";
import axios from "src/lib/axios";
import {
  useCreatepagecontentMutation,
  useGetpagecontentQuery,
} from "src/features/pagecontent/pagecontentApi";

function Homepage() {
  const { data: pagecontent, isLoading, error } = useGetpagecontentQuery();
  const [
    createpagecontent,
    { data, isLoading: createpagecontentLoading, error: createError },
  ] = useCreatepagecontentMutation();

  const [TopFeature, setTopFeature] = useState("");
  const [TopFeatureSearchKey, setTopFeatureSearchKey] = useState("");
  const [MidFeatureSearchKey, setMidFeatureSearchKey] = useState("");
  const [LeastFeatureSearchKey, setLeastFeatureSearchKey] = useState("");
  const [MidFeature, setMidFeature] = useState([]);
  const [LeastFeature, setLeastFeature] = useState([]);

  const [List, setList] = useState([]);

  const handleSarchKey = (type, key) => {
    if (type == "top") {
      setTopFeatureSearchKey(key);
      setMidFeatureSearchKey("");
      setLeastFeatureSearchKey("");
    } else if (type == "mid") {
      setTopFeatureSearchKey("");
      setMidFeatureSearchKey(key);
      setLeastFeatureSearchKey("");
    } else if (type == "least") {
      setTopFeatureSearchKey("");
      setMidFeatureSearchKey("");
      setLeastFeatureSearchKey(key);
    }

    if (key) {
      axios.get(`/api/admin/search_bookclub/${key}`).then((res) => {
        if (res.data) {
          setList(res.data);
        }
      });
    }
  };

  const handleSelectTopStudyGroup = (val) => {
    debugger;
    let findStudyGroup = List.find((item) => item.id == val);

    if (findStudyGroup) {
      setTopFeature({
        id: findStudyGroup.id,
        name: findStudyGroup.name,
        author: findStudyGroup.owner.name,
      });
    }
  };

  const handleMidStudyGroup = (val) => {
    debugger;
    let findStudyGroup = List.find((item) => item.id == val);

    if (findStudyGroup) {
      let checkItem = MidFeature.find((item) => item.id == val);

      if (!checkItem) {
        setMidFeature((prev) => {
          let copy = [...prev];
          copy.push({
            id: findStudyGroup.id,
            name: findStudyGroup.name,
            author: findStudyGroup.owner.name,
          });
          return copy;
        });
      }
    }
  };
  const handleLeastStudyGroup = (val) => {
    debugger;
    let findStudyGroup = List.find((item) => item.id == val);

    if (findStudyGroup) {
      let checkItem = LeastFeature.find((item) => item.id == val);

      if (!checkItem) {
        setLeastFeature((prev) => {
          let copy = [...prev];
          copy.push({
            id: findStudyGroup.id,
            name: findStudyGroup.name,
            author: findStudyGroup.owner.name,
          });
          return copy;
        });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!TopFeature && MidFeature.length == 0 && LeastFeature.length == 0) {
      return;
    }
    let data = {
      top_study_group: TopFeature ? TopFeature : null,
      mid_study_group: MidFeature.length > 0 ? MidFeature : null,
      least_study_group: LeastFeature.length > 0 ? LeastFeature : null,
    };
    createpagecontent(data).then(() => {
      setTopFeature("");
      setTopFeatureSearchKey("");
      setMidFeatureSearchKey("");
      setLeastFeatureSearchKey("");
      setMidFeature([]);
      setLeastFeature([]);
    });
  };

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between">
        Twtor Study Group Homepage
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CForm onSubmit={handleSubmit}>
              <CFormLabel>Top Featured Study Group</CFormLabel>
              {TopFeature ? (
                <>
                  <br />
                  <CFormLabel style={{ fontWeight: "bold" }}>
                    {TopFeature.name} by {TopFeature.author}
                  </CFormLabel>{" "}
                  <CButton color="danger" onClick={() => setTopFeature("")}>
                    Remove
                  </CButton>
                </>
              ) : (
                pagecontent &&
                pagecontent.top_study_group &&
                pagecontent.top_study_group.study_group_info && (
                  <>
                    <br />
                    <CFormLabel style={{ fontWeight: "bold" }}>
                      {pagecontent.top_study_group.study_group_info.name} by{" "}
                      {pagecontent.top_study_group.study_group_info.owner.name}
                    </CFormLabel>{" "}
                  </>
                )
              )}
              <CInputGroup className="mt-2">
                <CFormInput
                  type="text"
                  placeholder="Search Study groups"
                  value={TopFeatureSearchKey}
                  onChange={(e) => handleSarchKey("top", e.target.value)}
                />{" "}
              </CInputGroup>
              {TopFeatureSearchKey && List && List.length > 0 && (
                <CFormSelect
                  onChange={(e) => handleSelectTopStudyGroup(e.target.value)}
                >
                  <option>Select Study Group</option>
                  {List.map((item) => (
                    <option value={item.id}> {item.name}</option>
                  ))}
                </CFormSelect>
              )}
              <CFormLabel className="mt-4">
                Mid Featured Study Groups(4)
              </CFormLabel>
              {MidFeature && MidFeature.length > 0
                ? MidFeature.map((item) => (
                    <>
                      <br />
                      <br />
                      <CFormLabel
                        style={{ fontWeight: "bold", marginTop: "2px" }}
                      >
                        {item.name} by {item.author}
                      </CFormLabel>{" "}
                      <CButton
                        color="danger"
                        onClick={() =>
                          setMidFeature((prev) => {
                            return prev.filter((i) => i.id != item.id);
                          })
                        }
                      >
                        Remove
                      </CButton>
                    </>
                  ))
                : pagecontent &&
                  pagecontent.mid_study_group &&
                  pagecontent.mid_study_group.map((item) => (
                    <>
                      <br />
                      <CFormLabel style={{ fontWeight: "bold" }}>
                        {item.study_group_info.name} by{" "}
                        {item.study_group_info.owner.name}
                      </CFormLabel>{" "}
                    </>
                  ))}
              <CInputGroup className="mt-2">
                <CFormInput
                  type="text"
                  placeholder="Search Study groups"
                  value={MidFeatureSearchKey}
                  onChange={(e) => handleSarchKey("mid", e.target.value)}
                />{" "}
              </CInputGroup>
              {MidFeatureSearchKey &&
                List &&
                List.length > 0 &&
                MidFeature.length < 4 && (
                  <CFormSelect
                    onChange={(e) => handleMidStudyGroup(e.target.value)}
                  >
                    <option>Select Study Group</option>
                    {List.map((item) => (
                      <option value={item.id}> {item.name}</option>
                    ))}
                  </CFormSelect>
                )}
              <CFormLabel className="mt-4">
                Least Featured Study Groups(2)
              </CFormLabel>
              {LeastFeature && LeastFeature.length > 0
                ? LeastFeature.map((item) => (
                    <>
                      <br />
                      <br />
                      <CFormLabel style={{ fontWeight: "bold" }}>
                        {item.name} by {item.author}
                      </CFormLabel>{" "}
                      <CButton
                        color="danger"
                        onClick={() =>
                          setLeastFeature((prev) => {
                            return prev.filter((i) => i.id != item.id);
                          })
                        }
                      >
                        Remove
                      </CButton>
                    </>
                  ))
                : pagecontent &&
                  pagecontent.least_study_group &&
                  pagecontent.least_study_group.map((item) => (
                    <>
                      <br />
                      <CFormLabel style={{ fontWeight: "bold" }}>
                        {item.study_group_info.name} by{" "}
                        {item.study_group_info.owner.name}
                      </CFormLabel>{" "}
                    </>
                  ))}
              <CInputGroup className="mt-2">
                <CFormInput
                  type="text"
                  placeholder="Search Study groups"
                  value={LeastFeatureSearchKey}
                  onChange={(e) => handleSarchKey("least", e.target.value)}
                />{" "}
              </CInputGroup>
              {LeastFeatureSearchKey && List && List.length > 0 && (
                <CFormSelect
                  onChange={(e) => handleLeastStudyGroup(e.target.value)}
                >
                  <option>Select Study Group</option>
                  {List.map((item) => (
                    <option value={item.id}> {item.name}</option>
                  ))}
                </CFormSelect>
              )}

              <CRow className="mt-2">
                <CCol xs={6}>
                  <CButton
                    color="primary"
                    className="px-4"
                    type="submit"
                    disabled={createpagecontentLoading}
                  >
                    Save{" "}
                    {createpagecontentLoading && (
                      <div
                        className="spinner-border spinner-grow-sm text-light "
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}{" "}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}

export default Homepage;
