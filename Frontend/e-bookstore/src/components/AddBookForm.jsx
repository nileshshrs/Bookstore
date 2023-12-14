import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "../css/addbookform.scss";
import img1 from "../assets/img-bg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../Firebase/Firebase";
import { useBookContext } from "../context/BookContext";

const AddBookForm = ({ open }) => {
  const { addBook, fetchBooks } = useBookContext();

  const imageInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const formRef = useRef(null);
  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setImage(file); // Set the 'image' state to the selected file
      };

      reader.readAsDataURL(file);
    }
  };

  //input fields
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  //
  //react select
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);

  const categoryOptions = [
    { value: "EBOOK", label: "EBOOK" },
    { value: "AUDIOBOOK", label: "AUDIOBOOK" },
    { value: "PHYSICAL", label: "PHYSICAL" },
  ];

  const genreOptions = [
    { value: "FICTION", label: "Fiction" },
    { value: "NON_FICTION", label: "Non-Fiction" },
    { value: "MYSTERY", label: "Mystery" },
    { value: "SCIENCE_FICTION", label: "Science Fiction" },
    { value: "FANTASY", label: "Fantasy" },
    { value: "ROMANCE", label: "Romance" },
  ];

  const handleGenres = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setGenres(selectedValues);
  };

  const handleCategories = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setCategories(selectedValues);
  };
  //upload Image
  const uploadImage = async (e) => {
    e.preventDefault();
    const file = image;
    console.log(file);

    if (!file) {
      handleSubmit(null);
    } else {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}_${randomString}_${file.name}`;

      const storage = getStorage(app);
      const REF = ref(storage, `upload/${fileName}`);
      const uploadTask = uploadBytesResumable(REF, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(progress);
        },
        (err) => {
          // console.log(err);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // Assuming you have a Submit function defined elsewhere
            // Modify this part according to your logic
            //calls the submit to database
            handleSubmit(url);
          })
      );
    }
  };
  //upload image

  const handleSubmit = async (url) => {
    const formData = {
      title: title,
      isbn: isbn,
      authorName: author,
      price: price,
      description: description,
      imagePath: url,
      inStock: true,
      categories: categories,
      genres: genres,
    };
    await addBook(formData);

    // Fetch updated books
    fetchBooks();

    toast.success("Book has been added sucessfully", {
      position: "top-right",
    });
    formRef.current.reset();
  };

  //react select

  const style1 = {
    control: (base, state) => ({
      ...base,
      border: "1px solid black  !important",
      boxShadow: "0 !important",
      borderRadius: "8px",
      "&:hover": {
        border: "1px solid black !important",
      },
    }),
  };

  return (
    <form
      action=""
      ref={formRef}
      className={
        open
          ? "bg-[#edebe4] h-screen w-[390px] px-4 flex flex-col gap-4 items-start justify-start py-3 book-form fixed top-0 right-0 translate-x-[0vw] transition ease-in shadow-lg"
          : "bg-[#edebe4] h-screen w-[390px] px-4 flex flex-col gap-4 items-start justify-start py-3 book-form fixed top-0 right-0 translate-x-[100vw] transition ease-in"
      }
    >
      <h2 className=" py-2">Add/Edit Books</h2>

      <div className="scrollable-container overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="book-title" className="font-bold text-sm">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-black h-8 rounded-lg px-3"
                id="book-title"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value.toLowerCase())}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="isbn" className="font-bold text-sm">
                ISBN
              </label>
              <input
                type="text"
                className="w-full border border-black h-8 rounded-lg px-3"
                id="isbn"
                autoComplete="off"
                onChange={(e) => setIsbn(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="author" className="font-bold text-sm">
                Author
              </label>
              <input
                type="text"
                className="w-full border border-black h-8 rounded-lg px-3"
                id="author"
                autoComplete="off"
                onChange={(e) => setAuthor(e.target.value.toLowerCase())}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="price" className="font-bold text-sm">
                Price
              </label>
              <input
                type="number"
                className="w-full border border-black h-8 rounded-lg px-3"
                id="price"
                autoComplete="off"
                onChange={(e) => setPrice(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="w-full">
            <label htmlFor="category" className="font-bold text-sm">
              Category
            </label>
            <Select
              options={categoryOptions}
              isMulti
              onChange={handleCategories}
              className="w-full rounded-md h-[30px] border-slate-600 outline-none"
              styles={style1}
            />
          </div>

          {/* Row 4 */}
          <div className="w-full">
            <label htmlFor="genre" className="font-bold text-sm">
              Genre
            </label>
            <Select
              options={genreOptions}
              isMulti
              onChange={handleGenres}
              className="w-full rounded-md h-[30px] border-slate-600 outline-none"
              styles={style1}
            />
          </div>

          {/* Row 3 */}
          <div className="w-full">
            <div
              onClick={handleImageClick}
              className="form-img-div min-h-[180px] border w-full flex items-center justify-center rounded-lg border-dashed border-black"
            >
              <img
                src={selectedImage || img1}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <input
                type="file"
                ref={imageInputRef}
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="w-full">
            <label htmlFor="description" className="font-bold text-sm ">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full border border-black rounded-lg px-3 py-2"
              id="description"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Row 5 (Added Button) */}
          <div className="w-full">
            <button
              className="w-full bg-black text-white h-10 rounded-lg"
              onClick={uploadImage}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddBookForm;
