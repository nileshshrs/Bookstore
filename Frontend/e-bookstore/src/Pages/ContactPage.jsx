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
                            <a href='mailto:hi@zenstore.com'><u>hi@zenstore.com</u></a></p>
                        </div>
                    </div>

                    <div className='flex items-start ' style={{paddingTop:"20px"}}>

                        <div >

                            <h2 className='m-0 flex items-center justify-start gap-2'>  <CiLocationOn />
                               <b> Office</b>
                            </h2>
                            <p className='m-0'> Come and say Hi at </p>
                            <p className='m-0'> Pipalbot, Dillibazar</p>
                        </div>
                    </div>

                    <div className='flex items-start ' style={{paddingTop:"40px"}}>
                        <div >

                            <h2 className='m-0 flex items-center justify-start gap-2'>  <MdOutlineContactPhone />
                               <b> Phone and Email</b></h2>
                            <p className='m-0'> 9822338765</p> 
                            <p className='m-0'> 098764532 </p>
                            <p className='m-0'>
                                <a href="mailto:zenstore99@gmail.com"><u>zenstore99@gmail.com</u></a>
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3609923548966!2d85.32740427395757!3d27.706138376183237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College!5e0!3m2!1sen!2snp!4v1706061326494!5m2!1sen!2snp"
                     width={600} height="300"   loading="lazy">
                 
                    </iframe>
                </div>
            </div>
        </section>
    )
}

export default ContactPage