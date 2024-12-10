import React from 'react'
import img1 from '../asset/driver.jpg';
import img2 from '../asset/logo.png';
import img3 from '../asset/car.jpg'

function Header() {
    return (
        <div>
            <div className="position-relative bg-light d-flex flex-column align-items-center justify-content-center">
                {/* Logo Section */}
                <div className="position-absolute top-0 w-100 d-flex justify-content-between align-items-center px-4 py-3">

                    <div className="d-flex justify-content-start ms-5">
                        <img src={img3} alt="Logo 1" className="img-fluid rounded-circle" style={{ height: '100px', width: '150px' }} /> {/* Adjusted size */}
                    </div>

                    <a href="#" className="d-flex justify-content-center">
                        <img src={img2} alt="Business Platform" className="img-fluid rounded" style={{ height: '150px', width: '400px' }} /> {/* Adjusted size */}
                    </a>

                    <div className="d-flex justify-content-end me-5">
                        <img src={img1} alt="Logo 2" className="img-fluid rounded-circle" style={{ height: '100px', width: '150px' }} /> {/* Adjusted size */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header