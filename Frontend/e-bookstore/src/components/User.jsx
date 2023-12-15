import React from 'react';
import img3 from "../assets/product-item3.jpg";

function User() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <form>
        <ul class="form-style-1">
            <h2>Basic information</h2>
              <li><label>Auther Name<span class="required"></span></label>
                <input type="text" name="field1" class="field-long" placeholder="" /></li>
                <li><label>Category<span class="required"></span></label>
                  <input type="text" name="field1" class="field-long" placeholder="" /></li>
                  <li><label>Price<span class="required"></span></label>
                    <input type="text" name="field1" class="field-long" placeholder="" /></li>
                    <li><label>Book Name<span class="required"></span></label>
                      <input type="text" name="field1" class="field-long" placeholder="" /></li>
               
             
              <li>
                  <label>Description <span class="required"></span></label>
                  <textarea name="field5" id="field5" class="field-long field-textarea"></textarea>
              </li>
              <li>
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*" />
            </li>

              <li>
                  <input type="submit" value="update" />
                  <span>                    </span>
                  <input type="submit" value="delete" />

              </li>
          </ul>
        </form>
      </div>

      <div className="card-list">
        <a href="#" className="card-item">
          <img src={img3} alt=""/>
          <span className="developer">Muna madan</span>
          <h3>$50</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores odit perferendis atque at incidunt cum aut adipisci voluptate, sapiente doloremque?</p>
        </a>
      </div>
    </main>
  );
}

export default User;
