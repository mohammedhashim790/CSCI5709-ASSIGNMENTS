export function Contact() {
    return (<div className="contact-container">
        <h2>Contact Us</h2>
        <small>
            We would be happy to hear from you!
        </small>
        <form className="contact-form">
            <div>
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input type="text" id="name"/>
            </div>
            <div>
                <label htmlFor="email" className="form-label">
                    Email address
                </label>
                <input type="email" id="email"/>
            </div>
            <div>
                <label htmlFor="message" className="form-label">
                    Message
                </label>
                <textarea id="message" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>);

}
