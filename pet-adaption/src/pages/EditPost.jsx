import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  // ilanda istediğim özellikler
  const [title, setTitle] = useState(""); // İlan Başlığı
  const [city, setCity] = useState(""); // ilanı verenin yaşadığı şehir
  const [type, setType] = useState(""); // Hayvanın türü (kedi,köpek,kuş)
  const [breed, setBreed] = useState(""); // hayvanın cinsi (scotish,doberman)
  const [gender, setGender] = useState(""); // hayvanın cinsiyeti
  const [age, setAge] = useState(""); // hayvanın yaşı
  const [phoneNumber, setPhoneNumber] = useState(""); // ilanı paylaşanın telefon numarası
  const [sterilize, setSterilize] = useState(""); // hayvan kısır mı?
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //giriş yapmamışları login'e yönlendirme
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        ); 
        setTitle(response.data.title);
        setCity(response.data.city);
        setGender(response.data.gender);
        setPhoneNumber(response.data.phoneNumber);
        setDescription(response.data.description);
        setSterilize(response.data.sterilize || "");
        setBreed(response.data.breed || "");
        setType(response.data.type || "");
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("city", city);
    postData.set("type", type);
    postData.set("gender", gender);
    postData.set("phoneNumber", phoneNumber);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    
    if (breed) postData.set("breed", breed);
    if (age) postData.set("age", age);
    if (sterilize) postData.set("sterilize", sterilize);


    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        return navigate("/");
      }
    } catch (err) {
      /*// Hata mesajının mevcut olup olmadığını kontrol et
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }*/
      setError(err.response.data.message);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <div className="box-div create">
          <div className="box create_page">
            <h2>Edit Post</h2>
            {error && <p className="form__error-message create">{error}</p>}

            <form className="form create-post__form" onSubmit={editPost}>
              <label>Enter the Ad Title</label>
              <input
                className="createPost_input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Type of Animal</label>
              <select
                className="createPost_input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select>

              <input
                className="createPost_input"
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="png, jpg, jpeg"
              />

              <label>Enter the Animal's Age</label>
              <input
                className="createPost_input"
                type="number"
                placeholder="Enter Age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />

              <label>Select the Gender of the Animal</label>
              <select
                className="createPost_input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="female">female</option>
                <option value="male">male</option>
              </select>

              <label>enter the breed of the animal</label>
              <input
                className="createPost_input"
                type="text"
                placeholder="Enter Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />

              <label>Select whether the animal is sterile</label>
              <select
                className="createPost_input"
                value={sterilize}
                onChange={(e) => setSterilize(e.target.value)}
              >
                <option value="">Select Sterilize</option>
                <option value="yes">yes it's sterilize</option>
                <option value="no">no it's not</option>
              </select>

              <label>Which city do you live in?</label>
              <input
                className="createPost_input"
                type="text"
                placeholder="Title"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label>Please enter your phone number for contact</label>
              <input
                className="createPost_input"
                type="String"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <label htmlFor="">Add a Description</label>
              <textarea
                className="createPost_input"
                name=""
                id=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button type="submit" className="btn primary create">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
