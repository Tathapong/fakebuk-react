import { FacebookLogo } from "../../components/icons";
import { Link, useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div className="py-2 flex-1">
      <Link className="navbar-brand" role="button" onClick={refreshPage}>
        <FacebookLogo />
      </Link>
    </div>
  );
}

export default Logo;
