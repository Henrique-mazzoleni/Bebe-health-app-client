import { Button } from "react-bootstrap";

function SignUpPrompt() {
  return (
    <main>
      <div className="prompt">
        <Button href="/signup" variant="success">
          <h2>Signup</h2>
        </Button>
        <h2>or</h2>
        <Button className="btnOther" href="/login" variant="primary">
          <h2>Login</h2>
        </Button>
      </div>
    </main>
  );
}

export default SignUpPrompt;
