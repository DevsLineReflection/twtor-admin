import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Logo from "src/assets/brand/logo.png";
// sidebar nav config
import navigation from "../_nav";
import {
  changeSidebarShow,
  changeSidebarUnfoldable,
} from "src/features/sidebar/sidebarSlice";
import { useLogoutMutation } from "src/features/auth/authApi";
import { cilAccountLogout } from "@coreui/icons";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { unfoldable } = useSelector((state) => state.sidebar);
  const { sidebarShow } = useSelector((state) => state.sidebar);
  const [logout, { data, isLoading, error }] = useLogoutMutation();

  const handleLogOut = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(changeSidebarShow({ sidebarShow: visible }));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {!unfoldable && (
          <img src={Logo} alt="Logo" style={{ width: "120px" }} />
        )}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => handleLogOut()}
            style={{ cursor: "pointer" }}
          >
            <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
            <span className="mr-4">Logout</span>{" "}
            {isLoading && (
              <div
                className="spinner-border spinner-grow-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </a>
        </li>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch(changeSidebarUnfoldable({ unfoldable: !unfoldable }))
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
