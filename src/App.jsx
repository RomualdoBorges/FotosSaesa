import React, { useState } from "react";
import styles from "./App.module.css";
import logo2 from "../public/logo2.png";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    setSelectedFiles(files);

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(filePreviews).then((previews) => {
      setPreviews(previews);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("teste");
  };

  return (
    <div className={styles.container}>
      <img src={logo2} alt="Logo2" />

      <form onSubmit={handleSubmit}>
        {/* Input para ordem de servico */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="osNumber">
            Informe o número da Ordem de Serviço:
          </label>
          <input className={styles.inputField} type="text" id="osNumber" />
        </div>

        {/* Input para imagens */}
        <div className={styles.inputGroup}>
          <label className={styles.fileLabel} htmlFor="fileInput">
            Adicionar Fotos
          </label>
          <input
            className={styles.fileInput}
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Pre-visualizacao da imagem */}
        {previews.length > 0 && (
          <div className={styles.previewContainer}>
            {previews.map((preview, index) => (
              <img
                className={styles.previewImg}
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                width="200"
              />
            ))}
          </div>
        )}

        {/* Botao de submit */}
        <button className={styles.submitButton} type="submit">
          Fazer Upload
        </button>
        {uploadStatus && <p className={styles.statusMessage}>{uploadStatus}</p>}
      </form>
    </div>
  );
}

export default App;
