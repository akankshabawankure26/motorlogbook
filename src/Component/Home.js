import React from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'

function Home() {
    return (
        <div className=''>
            <div style={{ marginBottom: "180px" }}>
                <Header />
            </div>

            <div className='py-5 bg-white'>
                <h2 className="w-100 fw-bold" style={{ textAlign: "center",fontWeight:"bold",fontSize:"40px" }}>Motor Log Book</h2>
            </div>

            <section className="flex ">
                <div className='d-flex flex-row gap-5 justify-content-center'>
                    <div className='hover-focus'>
                        <a href="/login" className='btn btn-primary p-2' style={{width:"100px"}}>CHP</a>
                    </div>
                    <div >
                        <a href="/login" className='btn btn-primary p-2' style={{width:"100px"}}>STORE</a>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home