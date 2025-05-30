import {Link} from "react-router-dom";

export function Home() {
    return (
    <div className="home">
        <span className="title">
            <h1 className="display-4">Welcome to ProdManager</h1>
            <p className="lead">Manage your products efficiently and effectively.</p>
            <Link to="/products">
                <button className="accordion-button"  style={{background: 'white', 'color': 'black'}}>
                    Explore Products
                </button>
            </Link>
        </span>
    </div>
    );
}
