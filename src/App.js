import React, { useState } from "react";

import './App.css'
function App() {
    const [filebase64, setFileBase64] = useState("");
    const [file, setFile] = useState("");

    const [idenfiant, setIdenfiant] = useState("");
    const [date_n, setDate_n] = useState("");
    const [ville, setVille] = useState("");
    const [loisir, setLoisir] = useState([]);
    const [text, setText] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setText(true);
    };
    const handleChange = (e) => {
      const value = e.target.value;
      const checked = e.target.checked;
  
      if (checked) {
        setLoisir([...loisir, value]);
      } else {
        setLoisir([]);
      }
    };
  
    const home = () => {
      setText(false);
      setLoisir([]);
    };
    
  
    function convertFile(files) {
      if (files) {
        setFile(files);
        const fileRef = files[0] || "";
        console.log(fileRef);
        const fileType = fileRef.type || "";
        console.log("This file upload is of type:", fileType);
        const reader = new FileReader();
        reader.readAsBinaryString(fileRef);
        reader.onload = (ev) => {
          setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
        };
      }
    }
  return (
    <>
    {text ? (
        <div>
          <h1>
            Je suis {idenfiant} né le {date_n} à {ville} et mes loisirs sont: {loisir}
            <hr />
            {
          filebase64 && (<>
            {filebase64.indexOf("image/") > -1 && (
                <img src={filebase64} width={300} /> )}
          </>)
        }
          </h1>
          <button onClick={home}>home</button>
        </div>
      ) : (
    <div className="App">
      <form onSubmit={ handleSubmit}>
        <h1  id="titre">Inscrition</h1>
        <div id="L">
            <label htmlFor="">L'indentifiant</label>
            <input type="text"  required onChange={(event) => setIdenfiant(event.target.value)}/>
        </div>
        <div id="mdp">
            <label htmlFor="">Mot de passe</label>
            <input type="password" required/>
        </div>
        <div id="dtn">
            <label htmlFor="">Date de naissance</label>
            <input type="date"  required onChange={(event) => setDate_n(event.target.value)}  />
        </div>
        <div id="ville">
            <label htmlFor="">Ville</label>
            <select name="ville" id="v"  required onChange={(event) => setVille(event.target.value)}>
                <option value="Marrakech">Marrakech</option>
                <option value="Casa">Casa</option>
                <option value="Rabat">Rabat</option>
            </select>
        </div>
        <div id="genre">
            <label htmlFor="">Genre</label>
            <input type="radio" name="g" id="G"/>
            <label htmlFor="" name="g" id="G">Homme</label>
            <input type="radio" name="g" id="G"/>
            <label htmlFor="" name="g" id="G">Femme</label>
        </div>
        <div id="loisirs">
        <label>Loisirs : </label>
        <input type="checkbox" id="sport" name="loisir" value="Sport" onChange={handleChange}/>
        <label for="sport">Sport</label>
        <input type="checkbox" id="lecture" name="loisir" value="Lecture" onChange={handleChange} />
        <label for="lecture">Lectures</label>
        <input type="checkbox" id="musique" name="loisir" value="Musique" onChange={handleChange}
            />
            <label for="musique">Musique</label>
        </div>
        <div>
        <input type="file" onChange={(e) => convertFile(e.target.files)} multiple />
        <hr />
        {
          filebase64 && (<>
            {filebase64.indexOf("image/") > -1 && (
                <img src={filebase64} width={300} /> )}
          </>)
        }
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
      </form>
      </div>)}
    </>
  );
}
export default App;