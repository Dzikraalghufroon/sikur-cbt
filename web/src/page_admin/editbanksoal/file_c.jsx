import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Editor.module.css";
import Navbar from "../../komponen/navbar/navbar";

function App() {
  const [image, setImage] = useState();
  const [saveImage, setSaveImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleUploadChange(e) {
    //e.preventDefault();
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  function handleSave() {
    if (saveImage) {
      let formData = new FormData();
      formData.append("photo", saveImage);
      formData.append("id", id); 

      fetch(`${import.meta.env.VITE_SERVER}/api/upload_c`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //window.location.href = "/";
        })
        .catch((err) => console.error("Error: ", err));
    } else {
      alert("Upload gambar dulu");
    }
  }

  const goBack = () => {
    navigate(-1);
};
  return (
    <div>
      <Navbar></Navbar>
    <div className={styles.App}>
      <div className={styles.uploadContainer}>
        <div>
          <img src={image} className={styles.imgThumbnail} alt="Preview" />
        </div>
        <div className="my-3">
          <label htmlFor="formFile" className={styles.formLabel}>
            Upload image here
          </label>
          <input
            onChange={handleUploadChange}
            className={`form-control ${styles.formControl}`}
            type="file"
            id="formFile"
          />
          <button onClick={handleSave} className={`btn ${styles.btnPrimary} mt-2 w-100`}>
            Save my photo
          </button>
          <br /><br />
                <div>
                    <button className="logout" onClick={goBack}>Kembali</button>
                </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
