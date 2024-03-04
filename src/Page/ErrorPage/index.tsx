import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <div>
      <h1>Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Please contact support if you think this is a server error.</p>
      <p>I'm sorry we don't have customer service.</p>
      <p>Please click on the line below to return to the site</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
