"use client"
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import AuthGuard from "../authGuard/page,";
import { useDispatch, useSelector } from "react-redux";
import { getComment, getPosts } from "@/redux/Posts";
import {
  Grid, Card, CardHeader, CardMedia, CardContent,
  CardActions, Avatar, IconButton, Typography, Button,Box,TextField,InputProps
} from "@mui/material";
import { red } from "@mui/material/colors";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Loading from "../loadingPosts/page";
import '../page.module.css';
import AllComment from "../allComment/page";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
 
export default function AllPosts() {
  const [modal, setModal] = useState(false)
  const [comId, setComId] = useState(null)
  const { posts, loading} = useSelector((store) => store.postsReducer);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getPosts({ limit: 50, page }));
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };


    const handelModal=(id)=>{
    dispatch(getComment(id))
    setModal(true)
    setComId(id)
     }


  return <>
    <AuthGuard> 
      <Box sx={{ position:'fixed', bottom:0,right:0}}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
      </SpeedDial>
    </Box>
      {loading ? <Loading /> : (
        <>
          <Grid container spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              margin: " auto",
               marginTop: "100px",
            }}>
            {posts?.posts?.map((item) => (
              <Card key={item.id}
                sx={{
                  maxWidth: { xs: "90%", sm: 500, md: 700 },
                  minWidth: { xs: "90%", sm: 500, md: 700 },
                  margin: "auto",
                }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      <img src={item.user?.photo} style={{ width: "100%" }} alt="" />
                    </Avatar>
                  }
                  title={item?.user?.name}
                 subheader={item?.createdAt?.split("T")?.[0] ?? ""}
                />
                {item?.image && (
                  <CardMedia component="img" height="300" image={item?.image} alt="post image" />
                )}
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item?.body}
                  </Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent: "center",alignItems:'center',marginRight:3 }} disableSpacing>
                  <IconButton onClick={()=>{handelModal(item.id)}} aria-label="comment"><InsertCommentIcon /></IconButton>
                </CardActions>
              </Card>
            ))}
          </Grid>

          {/* 🔘 Pagination Controls */}
<Box
  sx={{
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 2,
    zIndex: 999,
    background: "#fff",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    borderRadius: "30px",
    px: 3,
    py: 1,
    alignItems: "center"
  }}
>
  <IconButton
    onClick={handlePrevPage}
    disabled={page === 1}
    sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#ddd" } }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>

  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
    page {page}
  </Typography>

  <IconButton
    onClick={handleNextPage}
    sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#ddd" } }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
</Box>
        </>
      )}

      {/* show all comment */}
      {modal===true &&<>
         <div className="backdrop" onClick={() => setModal(false)} />
    <div className="modal">
      <AllComment id={comId} setModal={setModal}/>
    </div>
      </>
      }
    </AuthGuard>
  </>
}