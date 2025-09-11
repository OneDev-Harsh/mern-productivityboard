import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="shadow-md">
      <div className="navbar bg-base-200 px-6">
        {/* Left side: Logo / Brand */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">
            ProductivityBoard
          </Link>
        </div>

        {/* Right side: Single Link */}
        <div className="flex-none">
          <Link
            to="/create"
            className="btn btn-primary rounded-xl normal-case flex items-center gap-2"
          >
            <span className="text-2xl leading-none">+</span>
            <span>Create Task</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
