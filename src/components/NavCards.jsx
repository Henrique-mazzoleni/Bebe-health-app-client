import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Sleep from "../assets/images/sleep.jpg";
import Change from "../assets/images/change.jpg";
import Feed from "../assets/images/feedCA.jpg";

function NavCards(props) {
  return (
    <div className="homeCards">
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={Sleep} />
        <Card.Body>
          <Card.Title>Sleep Tracker</Card.Title>
          <Card.Text>Log your childs naps.</Card.Text>
          <Button href={`/sleeps/${props.childId}`} variant="primary">
            Go to Sleep Tracker
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "15rem"  }}>
        <Card.Img variant="top" src={Change} />
        <Card.Body>
          <Card.Title>Changes</Card.Title>
          <Card.Text>Log your childs changes.</Card.Text>
          <Button href={`/changes/${props.childId}`} variant="primary">
            Go to Changes Tracker
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={Feed} />
        <Card.Body>
          <Card.Title>Feeds</Card.Title>
          <Card.Text>Log your childs feeds.</Card.Text>
          <Button href={`/feeds/${props.childId}`} variant="primary">
            Go to Feeds Tracker
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NavCards;
