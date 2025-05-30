import {Link} from "react-router-dom";


export const Navigation = () => {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                ProdManager
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <Link to="/">
                    <a className="nav-a">
                        Home
                    </a>
                </Link>
                <Link to="/products">
                    <a className="nav-a">
                        Products
                    </a>
                </Link>
                <Link to="/contact">
                    <a className="nav-a">
                        Contact
                    </a>
                </Link>

            </div>
        </nav>);
}
