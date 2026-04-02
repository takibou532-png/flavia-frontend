import { useState } from "react";
import { CircularProgress, Button, Card } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
export default function Upload({ onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message:"",color:""});

  const selectFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const uploadImage = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

 
    try {
      const res = await axios.post(
        "https://flavia-backend.onrender.com/Admin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      onUploaded(res.data); // returns Cloudinary final URL
        setError({message:"Upload seccess",color:"text-green-500"});
    } catch (err) {
      console.error(err);
      setError({message:"Upload failed! Try again.",color:"text-red-500"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-5 w-full">

      {/* Upload Card */}
      <Card
        className="shadow-lg border border-gray-200 w-[350px] h-[350px] 
                   flex flex-col items-center justify-center 
                   cursor-pointer hover:shadow-xl transition"
      >
        {!preview ? (
          <label className="flex flex-col items-center cursor-pointer">
            <CloudUploadIcon style={{ fontSize: 70, color: "#888" }} />
            <p className="text-gray-600 mt-2">Click to choose an image</p>
            <input type="file" hidden onChange={selectFile} />
          </label>
        ) : (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded"
          />
        )}
      </Card>

      {/* Error */}
      {error && <p className={error.color}>{error.message}</p>}

      {/* Upload Button */}
      <Button
        variant="contained"
        onClick={uploadImage}
        disabled={loading}
        startIcon={!loading && <CloudUploadIcon />}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
      </Button>
    </div>
  );
}
