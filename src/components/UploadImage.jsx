import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uiActions } from "../store/ui-slice";

import Modal from "./UI/Modal";
import "./UploadImage.css";

export default function UploadImage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const showModal = useSelector((state) => state.ui.showModal);

  //function to close the modal
  function handleClose() {
    dispatch(uiActions.hideUploadImage());
  }

  //function to send the request to upload image and then hide the modal
  async function handleUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const formDataFile = new FormData();
    if (file) {
      console.log(file);
      formDataFile.append("file", file);
      const img = await axios.post(
        "http://localhost:8000/post/upload",
        formDataFile
      );

      let uploadImageInfo = {};
      uploadImageInfo.imageUrl = img.data.imageUrl;
      uploadImageInfo.description = "";
      try {
        const result = await axios.post(
          "http://localhost:8000/post/api/upload-post",
          uploadImageInfo,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        ); 
        console.log(result);

        if (result.status === 200) {
          dispatch(uiActions.hideUploadImage());
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <Modal
      open={showModal === "upload-post"}
      onClose={showModal === "upload-post" ? handleClose : null}
    >
      <div className="modal-wrap">
        <div className="heading-wrap">
          <div className="new-post-text">Create New Post</div>
          <div className="cross-wrap" onClick={handleClose}>
            X
          </div>
        </div>
        <div className="upload-wrap">
          <div className="upload-img">
            <img src="http://localhost:3000/images/uploadPost.png" />
            <label htmlFor="upload-post" className="upload-button">
              Select from computer
            </label>
            <input id="upload-post" type="file" onChange={handleUpload} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
