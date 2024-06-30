import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [sterilize, setSterilize] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, city, age, breed, gender, sterilize });
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <div className="search__form-group">
        <label htmlFor="type">Type (Cat, Dog, Bird)</label>
        <select
         className="search__input"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type of Animal</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
        </select>
      </div>
      <div className="search__form-group">
        <label htmlFor="city">City</label>
        <input
        className="search__input"
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
      </div>
      <div className="search__form-group">
        <label htmlFor="age">Age</label>
        <input
        className="search__input"
          type="text"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
      </div>
      <div className="search__form-group">
        <label htmlFor="gender">Gender</label>
        <select
        className="search__input"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="search__form-group">
        <label htmlFor="age">Breed</label>
        <input
        className="search__input"
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Enter Breed"
        />
      </div>
      <div className="search__form-group">
        <label>Select whether the animal is sterile</label>
        <select
        className="search__input"
          value={sterilize}
          onChange={(e) => setSterilize(e.target.value)}
        >
          <option value="">Select Sterilize</option>
          <option value="yes">yes it's sterilize</option>
          <option value="no">no it's not</option>
        </select>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
