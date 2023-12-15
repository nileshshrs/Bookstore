import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/main-banner2.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const SingleProduct = () => {
  return (
    <section className="bestselling my-6 py-20">
   
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center bestselling-books">
        <div className="">
          <img src={img1} alt="" />
        </div>
        <div className="flex flex-col gap-3 justify-center items-start px-4" style={{marginBottom:'150px'}}>
         
          <p className="text-[#74642f] text-lg">By Timbur Hood</p>
          <h3>Birds Gonna Be Happy</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam
            rem asperiores ab architecto ratione possimus, doloremque maiores
            laboriosam. Dolorem, earum.
          </p>
          <div className="text-lg font-bold text-[#74642f]">$ 45.00</div>
          <div className="">
          <button className='py-1 px-4 rounded-md' style={{ color: '#591201', border: '1px solid #591201', marginTop: '20px' }}>
           <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: '8px' }} />
            Add to Cart
         </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import Img1 from '../assets/Bookcover.png';

// const SingleProduct = () => {
//   const [amount, setAmount] = useState(1);

//   return (
//     <div className='flex flex-col justify-between lg:flex-row gap-4 lg:items-center' style={{ backgroundColor: '#E6D9D1', padding: '10px', width: '1020px', marginLeft: '100px', marginTop: '30px', marginBottom: '30px', boxShadow: '100px' }}>

//       {/* Arrow Link */}
//       <Link to="/previous-page" className='py-1 px-2 rounded-md text-violet-800 text-base' style={{ color: '#591201', alignSelf: 'flex-start', marginBottom: '10px' }}>
//         <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
//       </Link>

//       {/* Image */}
//       <div className='flex flex-col gap-2 lg:w-1/2 lg:max-w-sm'>
//         <img
//           src={Img1}
//           alt=""
//           className='w-full h-full aspect-square object-cover rounded-xl smaller-image'
//           style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}
//         />
//       </div>

//       {/* Product Details */}
//       <div className='flex flex-col gap-2 lg:w-1/2' style={{ height: '500px' }}>
//         <div style={{ marginTop: '60px' }}>
//           <span className='' style={{ color: '#9B7167', fontSize: '16px', fontWeight: 'Molengo' }}>By Jeff Vanderemeer</span>
//           <h1 className='' style={{ color: '#591201', fontFamily:'monospace', fontWeight: 'bold', marginTop: '8px', fontSize: '20px' }}>Authority</h1>
//         </div>
//         <p className='text-gray-700' style={{ color: "#AC8980", fontWeight: 'Molengo' }}>
//           Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
//         </p>
//         <div className='flex flex-row items-center gap-4'>
//           <div className='flex flex-row items-center'>
//             <button className='py-1 px-2 rounded-lg text-violet-800 text-base' style={{ color: '#9B7167' }} onClick={() => setAmount((prev) => prev - 1)}>-</button>
//             <span className='py-1 px-2 rounded-lg' style={{ color: '#591201' }}>{amount}</span>
//             <button className='py-1 px-2 rounded-lg text-violet-800 text-base' style={{ color: '#9B7167' }} onClick={() => setAmount((prev) => prev + 1)}>+</button>
//           </div>
//           <span style={{ fontSize: '14px', color: '#9B7167', marginLeft: '250px' }}>(32 reviews)</span>

//         </div>

//         {/* Price */}
//         <h6 className='text-lg font-semibold' style={{ color: '#E7A081', marginTop: '10px' }}>$ 199.00</h6>

//         {/* Add to Cart Button */}
//         <div className='flex flex-row items-center'>
//           <button className='py-1 px-4 rounded-md' style={{ color: '#591201', border: '1px solid #591201', marginTop: '20px' }}>
//             <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: '8px' }} />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
