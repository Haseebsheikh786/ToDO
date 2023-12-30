import { firestore } from "../../config/firebase";

export const fetchUsers = () => async (dispatch) => {
    const tasksCollection = await firestore.collection("users").get();
    let temp = tasksCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    dispatch({ type: "GETAllUsers", payload: temp });
};

export const AddUser =
    ({ name, age }) =>
    async (dispatch) => {
        let temp = await firestore.collection("users").add({
            name,
            age,
        });
        dispatch({ type: "AddUser", payload: temp });
    };

export const updateUser =
    ({ id, age }) =>
    async (dispatch) => {
        try {
            await firestore.collection("users").doc(id).update({
                age,
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

export const deleteUser = (id) => async (dispatch) => {
    try {
        await firestore.collection("users").doc(id).delete();
    } catch (error) {
        console.error("Error deleting user:", error.message);
    }
};
