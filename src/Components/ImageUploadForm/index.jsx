import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
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
    if (selectedFiles.length === 0) {
      alert("Por favor, selecione até três arquivos para fazer upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Upload realizado com sucesso");
      console.log("Arquivos enviados:", response.data);
    } catch (error) {
      setUploadStatus("Falha no upload");
      console.error("Erro no upload:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fileInput">Selecione até três imagens:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>
      {previews.length > 0 && (
        <div>
          <p>Pré-visualizações:</p>
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              width="200"
            />
          ))}
        </div>
      )}
      <button type="submit">Fazer Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default ImageUploadForm;
