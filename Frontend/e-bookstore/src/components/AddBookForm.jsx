import React, { useRef, useState } from "react";
import Select from "react-select";
import "../css/addbookform.scss";
import img1 from "../assets/img-bg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/dashboard.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../Firebase/Firebase";
import { useBookContext } from "../context/BookContext";
import { MdClose } from "react-icons/md";

const AddBookForm = ({ open, handleOpen }) => {
  const { addBook, fetchBooks } = useBookContext();
  

  const imageInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const resetImage = () => {
    setSelectedImage(null);
    setImage(null);
  };
  const checkSlide = () => {
    handleOpen();
  };

  const clearSelectValues = () => {
    setCategories([]);
    setGenres([]);
  };
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

            handleSubmit(url);
          })
      );
    }
  };
  //upload image


  const handleSubmit = async (url) => {
    try {
      if (!title || !isbn || !author || !price || !description || !url || categories.length === 0 || genres.length === 0) {
        throw new Error("Please fill in all the required fields and upload an image.");
      }
  
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
  
      toast.success("Book has been added successfully", {
        position: "top-right",
      });
  
      formRef.current.reset();
      resetImage();
      clearSelectValues();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
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
    <div
      className={
        open
          ? "book-form bg-[#edebe4] z-[99] h-screen w-[390px] px-4 flex flex-col gap-3 items-start justify-start py-2 book-form fixed top-0 right-0 translate-x-[0vw] transition ease-in shadow-lg scrollable-container overflow-y-auto"
          : "book-form bg-[#edebe4] z-[99] h-screen w-[390px] px-4 flex flex-col gap-3 items-start justify-start py-2 book-form fixed top-0 right-0 translate-x-[100vw] transition ease-in scrollable-container overflow-y-auto"
      }
    >
      <button
        className="absolute top-0 right-2 text-[20px] p-2"
        onClick={checkSlide}
      >
        <MdClose />
      </button>
      <form action="" ref={formRef}>
        <h2 className=" py-1 font-bold">Add Books</h2>

        <div className="">
          <div className="flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="book-title" className="font-bold text-xs">
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
                <label htmlFor="isbn" className="font-bold text-xs">
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
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="author" className="font-bold text-xs">
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
                <label htmlFor="price" className="font-bold text-xs">
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
              <label htmlFor="category" className="font-bold text-xs">
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
              <label htmlFor="genre" className="font-bold text-xs">
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
              <label htmlFor="description" className="font-bold text-xs ">
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
    </div>
  );
};

export default AddBookForm;
