import Users from "../assets/images/users.png";
import Children from "../assets/images/children.png";
import ChangeIcon from "../assets/images/change-icon.png";
import SleepIcon from "../assets/images/sleep-icon.png";
import FeedIcon from "../assets/images/feed-icon.png";

import SignUpPrompt from "./SignUpPrompt";

import { useContext, Fragment } from "react";
import { AuthContext } from "../context/auth.context";

function Welcome() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main>
      <div className="welcomeFlex">
      {/* Contextual links for signup and login, only appears when someone is not logged in */}

      {!isLoggedIn && (
          <Fragment>
            <SignUpPrompt />
          </Fragment>
        )}
        

        {/* Sleeps card */}

        <div className="welcome">
          <div className="img">
            <img src={SleepIcon} />
          </div>
          <div className="text">
            <h3>Track your child's sleeps</h3>
            <p>
              Record when you child sleeps, for how long and where they sleep.
            </p>
          </div>
        </div>
        {/* Changes card */}
        <div className="welcome">
          <div className="img">
            <img src={ChangeIcon} />
          </div>
          <div className="text">
            <h3>Track your child's changes</h3>
            <p>
              Track your childs changes by date and time, wet, dry or both, and
              the consistency to better understand your childs health.{" "}
            </p>
          </div>
        </div>

        {/* Feeds card */}

        <div className="welcome">
          <div className="img">
            <img src={FeedIcon} />
          </div>
          <div className="text">
            <h3>Track your child's feeds</h3>
            <p>
              Keep tabs on your childs milk intact, ensuring your little one is
              getting enough.
            </p>
          </div>
        </div>

        {/* Users card */}

        <div className="welcome">
          <div className="img">
            <img src={Users} />
          </div>
          <div className="text">
            <h3>Add more than 1 guardian</h3>
            <p>
              You can invite more guardians onto the app, making it easier to
              tracks your childs health.
            </p>
          </div>
        </div>

        {/* Children card */}

        <div className="welcome">
          <div className="img">
            <img src={Children} />
          </div>
          <div className="text">
            <h3>Add all your children</h3>
            <p>
              Add as many children as you wish, allowing you to track the health
              of your whole family.
            </p>
          </div>
        </div>

        
      </div>
    </main>
  );
}

export default Welcome;
