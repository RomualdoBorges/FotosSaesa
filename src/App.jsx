import React, { useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.png";
import Message from "./Components/Message";

function App() {
  //Estado da pre-visualizacao
  const [previews, setPreviews] = useState([]);

  //Estados do Formulario
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [osNumber, setOsNumber] = useState("");

  //Estados de Validacao
  const [validOs, setValidOs] = useState(false);
  const [validImg, setValidImg] = useState(false);

  //Estados de Mensagem
  const [sendMessage, setSendMessage] = useState(false);

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

    const formData = {
      osNumber: osNumber,
      images: selectedFiles,
    };

    const isValid = osNumber.length > 0 && selectedFiles.length === 3;

    if (!isValid) {
      if (osNumber.length === 0) {
        setValidOs(true);
      } else {
        setValidOs(false);
      }

      if (selectedFiles.length !== 3) {
        setValidImg(true);
      } else {
        setValidImg(false);
      }

      return;
    }

    // Se as duas condições forem válidas, envia o formulário
    console.log(formData);

    // Limpeza dos campos ao enviar o formulário
    setValidImg(false);
    setValidOs(false);
    setOsNumber("");
    setSelectedFiles([]);
    setPreviews([]);

    // Mensagem enviada. Fazer tratamento para erro quando tiver uma API
    setSendMessage(true);

    setTimeout(() => {
      setSendMessage(false);
      //Substituir esse reload por algum componente de loading
      window.location.reload();
    }, 5000);
  };

  return (
    <div className={styles.container}>
      {/* Logo */}
      <img src={logo} alt="Logo" />

      <form onSubmit={handleSubmit}>
        {/* Input para ordem de servico */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="osNumber">
            Informe o número da Ordem de Serviço:
          </label>
          <input
            className={`${styles.inputField} ${
              validOs ? styles.inputError : ""
            }`}
            type="text"
            id="osNumber"
            value={osNumber}
            onChange={(event) => setOsNumber(event.target.value)}
          />
          {validOs && (
            <p className={styles.errorParagraph}>
              *Favor informar o número da Ordem de Serviço.
            </p>
          )}
        </div>

        {/* Input para imagens */}
        <div className={styles.inputGroup}>
          <label className={styles.fileLabel} htmlFor="fileInput">
            Adicionar Fotos
          </label>
          {validImg && (
            <p className={styles.errorParagraph}>
              *Favor informar adicionar as três fotos.
            </p>
          )}
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
      </form>

      {sendMessage && <Message />}
    </div>
  );
}

export default App;
