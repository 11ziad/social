"use client";
export const dynamic = "force-dynamic";
import React,{useRef, useState} from "react";
import AuthGuard from "../authGuard/page,";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Card,CardHeader,CardMedia,CardContent,Avatar,Typography,Button,Box,TextField,List,ListItem,ListItemText,ListItemAvatar,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingComment from "../LoadingComment/page";
import toast from "react-hot-toast";
import axios from "axios";
import { getComment } from "@/redux/Posts";

export default function AllComment({ id, setModal }) {
  const [loadingSend, setLoadingSend] = useState(false)
    const commentRef = useRef(); 
  const { comment, loadingComment } = useSelector((store) => store.postsReducer
  );

  let dispatch=useDispatch()


   const handleSubmit = async (e) => {
  e.preventDefault();
  const value = commentRef.current.value;

  if (!value.trim()) {
    toast.error('Write a comment before sending');
    return;
  }
  try {
    setLoadingSend(true)
    let { data } = await axios.post(
      `https://linked-posts.routemisr.com/comments`,
      {
        content: value,
        post: id,
      },
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
    setLoadingSend(false)
    toast.success('Comment added successfully');
    dispatch(getComment(id));
    commentRef.current.value = "";
  } catch (err) {
        setLoadingSend(false)
    toast.error('Failed to submit comment');
    console.error(err);
  }
};
  return (
    <AuthGuard>
      <Box
        sx={{
          height: "95vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Scrollable area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
 
          }}
        >
          {loadingComment === true ? (
            <LoadingComment />
          ) : (
            <Grid container justifyContent="center">
              <Card
                key={comment?.id}
                sx={{
                  width: "100%",
                  maxWidth: 640,
                  margin: "auto",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                      <img
                        src={comment?.user?.photo}
                        style={{ width: "100%" }}
                        alt=""
                      />
                    </Avatar>
                  }
                  action={
                    <CancelIcon
                      onClick={() => {
                        setModal(false);
                      }}
                      sx={{ cursor: "pointer" }}
                    />
                  }
                  title={comment?.user?.name}
                  subheader={comment?.createdAt?.split("T")?.[0] ?? ""}

                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {comment?.body}
                  </Typography>
                </CardContent>
                {comment?.image && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={comment?.image}
                    alt="post image"
                  />
                )}

                {/* Comments List */}
                <List sx={{ width: "100%", bgcolor: "#fff" }}>
                 {[...(comment?.comments ?? [])].reverse().map((ite)  => (
                    <ListItem
                      key={ite._id}
                      alignItems="flex-start"
                      sx={{ bgcolor: "#eee6", mt: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={ite?.commentCreator?.name}
                          src={ite?.commentCreator?.photo}
                        />
                      </ListItemAvatar>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <ListItemText
                          primary={ite?.commentCreator?.name}
                          secondary={ite?.content}
                        />
                        <Box
                          sx={{
                            fontSize: 12,
                            transform: "translate(5px, -10px)",
                            alignSelf: "flex-end",
                          }}
                        >
                          {ite?.createdAt?.split("T")?.[0] || ""

}
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          )}
        </Box>

        {/* 📝 Fixed Input at Bottom */}
        {loadingComment===false&&
        <Box
          component="form"
                onSubmit={handleSubmit}
          sx={{position: "sticky",bottom: 0,bgcolor: "#fff",boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",zIndex: 100,p: 1,margin:'auto',width: {xs: "93%",sm: "94%", md: "623px"},
            transform: {xs: "translateX(-7px)", sm: "translateX(-7px)", }}}>
          <Box sx={{ display: "flex", gap: 2, maxWidth: 600, mx: "auto" }}>
            <TextField
              inputRef={commentRef}
              name="comment"
              placeholder="Write your comment here..."
              variant="outlined"
              fullWidth
              multiline
              maxRows={3}
              sx={{ bgcolor: "#f9f9f9", borderRadius: 1 }}
            />
            <Button type="submit" variant="contained">
              {loadingSend===true? <i className="fa-solid fa-spinner fa-spin" style={{fontSize : '17px'}}></i>: <span>send</span> }
               
            </Button>
          </Box>
        </Box>
        }
      </Box>
    </AuthGuard>
  );
}
