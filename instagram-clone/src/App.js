import Post from "./Post";
import "./App.css";
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import ImageUpload from "./ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  //hardcoded debug test
  const [posts, setPosts] = useState([
    // {
    //   username:"Thomas William Fredrick Jefferson" ,
    //   caption: "wassup bing chilling" ,
    //   imageUrl:"data:image/jpeg;base64,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"
    // }
  ]);

  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup action before refiring this useeffect
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign Up{" "}
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}> Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload </h3>
      )}
      <h1></h1>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
