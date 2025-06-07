

import './product.css'

export function Product({image, title, description, price}) {
    return (<div className="card-body">
            <img src={image} className="card-image" alt={title}/>
            <div className="card-body-1">
                <h5>{title}</h5>
                <small>{description}</small>
                <p className='price'>
                    ${price}
                </p>
            </div>
            <div className="card-footer">
                <button className="delete-button small-button">
                    Delete
                </button>
                <button className="edit-button small-button">
                    Edit
                </button>
            </div>
        </div>);
}



