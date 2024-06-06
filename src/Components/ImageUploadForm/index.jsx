import React, { useState } from "react";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input para ordem de servico */}
      <div>
        <label htmlFor="osNumber">Informe o número da Ordem de Serviço:</label>
        <input type="text" id="osNumber" />
      </div>

      {/* Input para imagens */}
      <div>
        <label htmlFor="fileInput">Selecione uma imagem:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Pre-visualizacao da imagem */}
      {preview && (
        <div>
          <p>Pré-visualização:</p>
          <img src={preview} alt="Preview" width="200" />
        </div>
      )}

      {/* Botao de submit */}
      <button type="submit">Fazer Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default ImageUploadForm;
