import React from 'react'

import "../css/contactpage.scss";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FcBusinessContact } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { MdOutlineContactPhone } from "react-icons/md";


const ContactPage = () => {
    return (
        <section className='contactpage my-6' >
            <div className='contactsection '>
                <div className='details'>
                    <div className='flex items-start '>

                        <div >
                            <h2 className='m-0 flex items-center justify-start gap-2'>  <IoChatboxEllipsesOutline /><b>Chat With Us</b></h2>
                            <p className='m-0'> Our frendly support team is here to help you </p>
                            <p className='m-0'> 
                            <a href='mailto:hi@zenstore.com'>hi@zenstore.com</a></p>
                        </div>
                    </div>

                    <div className='flex items-start '>

                        <div >

                            <h2 className='m-0 flex items-center justify-start gap-2'>  <CiLocationOn />
                               <b> Office</b>
                            </h2>
                            <p className='m-0'> Come and say Hi at </p>
                            <p className='m-0'> Pipalbot, Dillibazar</p>
                        </div>
                    </div>

                    <div className='flex items-start '>
                        <div >

                            <h2 className='m-0 flex items-center justify-start gap-2'>  <MdOutlineContactPhone />
                               <b> Phone and Email</b></h2>
                            <p className='m-0'> <a href='tel:+9822338765'></a> </p>
                            <p className='m-0'> 098764532 </p>
                            <p className='m-0'>
                                <a href="mailto:zenstore99@gmail.com">zenstore99@gmail.com</a>
                            </p>
                        </div>
                    </div>
                    
                       <div className='flex gap-4 margin top-4'>


                       <a href="https://www.facebook.com/yourFacebookPage" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a herf="https://www.instagram.com/softwarica.college" target='_blank' rel='noopener noreferrer'>
                        <FaInstagramSquare />
                        </a>
                        <a href="https://www.tiktok.com/@yourTikTokUsername" target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                            </a>

                            <a href="https://twitter.com/yourTwitterUsername" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>

                    </div>


                </div>

                {/* //for map */}
                <div>
                    <iframe
                     src="https://maps.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3205.483450059157!2d139.88860141326907!3d36.54245453215222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f6789ed57aa47%3A0x604db4127f739b6b!2z44Ko44Kk44Og44K544OI44Os44O844K4IOWuh-mDveWuruewl-eArOeUuuW6lw!5e0!3m2!1sen!2snp!4v1676101173749!5m2!1sen!2snp"
                     height="300" width={500}
                        // src="https://www.google.com/maps/place/Softwarica+College/@27.7061431,85.3274043,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb190a74aa1f23:0x74ebef82ad0e5c15!8m2!3d27.7061384!4d85.3299792!16s%2Fg%2F12hvnfc2d?entry=ttu"
                        allowfullscreen="" loading="lazy" title="Google Map">

                    </iframe>
                </div>
            </div>
        </section>
    )
}

export default ContactPage