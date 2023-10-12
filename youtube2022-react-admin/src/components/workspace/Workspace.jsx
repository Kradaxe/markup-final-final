import React, { useContext, useEffect, useState } from "react";
import { Searchtab } from "../searchtab/Searchtab";
import "./workspace.scss";
import axios from "axios";
import ImageComments from "../commentsAdd/ImageComments";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

export const Workspace = () => {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [finalimag, setfinalimag] = useState("");
  const { currentImg, setCurrentImg } = useContext(MyContext);
  const navigator = useNavigate();
  const [shareableToken, setshareableToken] = useState("");
  console.log(shareableToken);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      try {
        console.log("nice");
        const token = localStorage.getItem("token");
        console.log(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios
          .post("http://localhost:3000/api/images/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // console.log(response.data);

            console.log(response);
            // setAllImage([...allImage, { src: response.data.photo }]);
          });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("what?");
    }
  };

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("error", error);
    };
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  function send(e) {
    setCurrentImg(e.target.currentSrc);
    navigator("/ImageComments");
    // console.log();
  }

  async function getImage() {
    await axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.getItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log(response);
        // const shareToken = response.data.body.shareToken;
        // console.log(shareToken);
        setAllImage(response.data.body);
      });
  }
  useEffect(() => {
    getImage();
  }, []);
  async function getImagebytoken() {
    await axios
      .get("http://localhost:8000/api/posts/ZoSbj1MoPT")
      .then((response) => {
        console.log(response.data);
        localStorage.getItem("token", response.data.token);
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${response.data.token}`;
        console.log(response.data.body.shareToken);
        setshareableToken(response.data.body.shareToken);
        // setAllImage(response.data.body);
      });
  }
  useEffect(() => {
    getImagebytoken();
  }, []);

  return (
    <div className="workspace">
      <div className="searchtab">
        <Searchtab />
      </div>
      <a href="/ImageComments">COMMENTS</a>

      <div className="mainsection" style={{ width: "auto" }}>
        <input
          accept="image/*"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        {image == "" || image == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image} />
        )}

        <button onClick={handleUpload}>Upload</button>

        {allImage.map((data, key) => {
          return (
            <img onClick={send} width={100} height={100} src={data.photo} />
          );
        })}
        {/* <img onClick={getImagebytoken} width={100} height={100} src="" /> */}
      </div>
    </div>
  );
};
