"use client";
import React, { useContext, useState } from "react";
import {Box,Typography,Avatar,TextField,Button,IconButton,Paper,Stack,} from "@mui/material";
import {
  Close,
  Image as ImageIcon,
  LocationOn,
  EmojiEmotions,
  WhatsApp,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/page";
import toast from "react-hot-toast";
import axios from "axios";
import AuthGuard from "../authGuard/page,";

const AddPost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userProfile } = useContext(UserContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  async function handelSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    const body = form.body.value;
    const image = form.image.files[0];

    if (image && !image.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    formData.append("body", body);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        toast.error("No token found!");
        setLoading(false);
        return;
      }

      await axios.post("https://linked-posts.routemisr.com/posts", formData, {
        headers: { token },
      });

      toast.success("  Post added successfully!");
      router.replace("/profile");
    } catch (err) {
      toast.error(" Failed to create post. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <Paper
        elevation={4}
        sx={{
          mt: 12,
          p: 4,
          maxWidth: 500,
          mx: "auto",
          borderRadius: 4,
          background: "#fdfdfd",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Box component="form" onSubmit={handelSubmit}>
          <Stack spacing={3} alignItems="center">
            {/* ✖️ Close Button */}
            <IconButton
              onClick={() => router.push("/profile")}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#f44336",
                color: "#fff",
                "&:hover": { background: "#d32f2f" },
              }}
            >
              <Close />
            </IconButton>

            {/*   Title */}
            <Typography variant="h5" fontWeight="bold" color="primary">
              Create a Post
            </Typography>

            {/*   User Info */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={userProfile?.photo}
                sx={{
                  width: 70,
                  height: 70,
                  border: "3px solid #1976d2",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
              <Box>
                <Typography fontWeight="medium">{userProfile?.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Posting to: <strong style={{ color: "#1976d2" }}>Public</strong>
                </Typography>
              </Box>
            </Stack>

            {/*   Post Body */}
            <TextField
              multiline
              rows={4}
              fullWidth
              name="body"
              placeholder={`💬 What's on your mind, ${userProfile?.name}?`}
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  px: 2,
                },
              }}
            />

            {/*   Image Preview */}
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                }}
              />
            )}

 
            <Stack direction="row" spacing={1}>
              <IconButton color="primary"><EmojiEmotions /></IconButton>
              <IconButton color="success"><WhatsApp /></IconButton>
              <IconButton color="error"><LocationOn /></IconButton>
              <label htmlFor="image-upload">
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
                <IconButton component="span" color="primary">
                  <ImageIcon />
                </IconButton>
              </label>
            </Stack>

 
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                py: 1.2,
                fontSize: 16,
                fontWeight: "bold",
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {loading ? "Uploading..." : "Post"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </AuthGuard>
  );
};

export default AddPost;