"use client";
import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfileImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedImage);

    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: { token },
        }
      );

      toast.success("Photo updated successfully");
      router.replace("/profile");
    } catch (err) {
      toast.error("Failed to update photo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 400,
        margin: "auto",
        mt: 17,
        background: "#f9f9f9",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" fontWeight="bold" color="primary">
          Upload Profile Picture
        </Typography>

        <Box position="relative">
          <Avatar
            src={preview || "/default-avatar.png"}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid #1976d2",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#1976d2",
              color: "white",
              "&:hover": {
                background: "#115293",
              },
            }}
          >
            <PhotoCamera />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </IconButton>
        </Box>

        {selectedImage && (
          <Typography variant="body2" color="text.secondary">
            {selectedImage.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedImage || loading}
          sx={{ px: 4 }}
        >
          {loading ? "Uploading..." : "Save"}
        </Button>
      </Stack>
    </Paper>
  );
}