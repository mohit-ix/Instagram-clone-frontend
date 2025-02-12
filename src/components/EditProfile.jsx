import { uiActions } from "../store/ui-slice";
import Modal from "./UI/Modal";
import { useSelector, useDispatch } from "react-redux";

export default function EditProfile() {
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.ui.showModal);

    //function to show Edit Profile modal
    function handleClose() {
        dispatch(uiActions.hideEditProfile());
    }

    return (
        <Modal open={showModal === "edit-profile"} onClose={showModal === "edit-profile"? handleClose : null}>
            <div>
                edit profile
            </div>
        </Modal>
    );
}