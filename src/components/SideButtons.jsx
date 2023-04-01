import { Button } from "react-bootstrap";

function SideButtons() {
  // Buttons to add a child or invite a parent. Will only appear when logged in.
  return (
    <div className="buttons">
      
      <Button href="/newchild">
        Add a child
      </Button>
      <Button href="/invite">
        Invite a Parent
      </Button>
      
    </div>
  );
}

export default SideButtons;
