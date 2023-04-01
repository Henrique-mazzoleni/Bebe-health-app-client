import React, { Fragment } from "react";

import Nav from "react-bootstrap/Nav";

import SideButtons from "./SideButtons";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
      

        {props.childId && (
          <Fragment>
            <Nav.Item>
              <Nav.Link style={{ color: "#DE7886" }} href={`/sleeps/${props.childId}`}>Sleeps</Nav.Link>
            </Nav.Item>
            <Nav.Link style={{ color: "#DE7886" }} href={`/changes/${props.childId}`}>Changes</Nav.Link>
            <Nav.Link style={{ color: "#DE7886" }} href={`/feeds/${props.childId}`}>Feeds</Nav.Link>
            <Nav.Link href="disabled" disabled>
              Coming Soon
            </Nav.Link>
               

          </Fragment>
        )}
      </Nav>
      <SideButtons />
    </div>
  );
}

export default Sidebar;
