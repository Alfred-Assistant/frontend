import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { IoMdRefresh } from "react-icons/io";
import { FaSave } from "react-icons/fa";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

const ConfigEditor = () => {
  const { requestedFile } = useParams();
  const [file, setFile] = useState<string>();
  const [originalFile, setOriginalFile] = useState<string>();

  useEffect(() => {
    const getFile = async () => {
      const res = await axios.get("get-config", {
        params: { file: requestedFile },
      });

      let json = JSON.stringify(res.data, null, 2);
      setFile(json);
      setOriginalFile(json);
    };
    getFile();
  }, []);

  const handleSave = async () => {
    try {
      const config = JSON.parse(file || "");
      await axios.post("save-config", {
        config,
        file: requestedFile,
      });
      toast.success("Successfully saved configuration");
    } catch (err) {
      console.error(err);
      toast.error("Invalid JSON format");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          boxSizing: "border-box",
          p: 3,
          height: "100vh",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ p: 1 }}>
          Alfred Assistant's Configuration Page
        </Typography>
        <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
          <CodeEditor
            language="json"
            value={file}
            placeholder="Please enter a valid Alfred Assitant configuration."
            padding={15}
            onChange={(e) => setFile(e.target.value)}
            style={{
              fontSize: "0.9rem",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              lineHeight: "1.2rem",
              background: "#f5f5f5",
              width: "100%",
              borderRadius: "5px",
            }}
          />
          <Box sx={{ position: "absolute", right: "5px", top: "5px" }}>
            <IconButton
              sx={{
                fontSize: "1.2rem",
                color: "#0550ae",
                transition: "transform 200ms",
                "&:hover": {
                  transform: "rotate(359deg)",
                },
              }}
              onClick={() => {
                toast.success("Reset configuration");
                setFile(originalFile);
              }}
            >
              <IoMdRefresh />
            </IconButton>
            <IconButton
              sx={{
                fontSize: "1.2rem",
                color: "#0550ae",
                transition: "transform 200ms",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={handleSave}
            >
              <FaSave />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ConfigEditor;
