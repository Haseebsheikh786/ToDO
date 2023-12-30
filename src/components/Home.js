import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
import { Card } from "reactstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AddUser, fetchUsers } from "../store/actions/crudActions";
function Home() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const createUser = async () => {
        await dispatch(AddUser({ name: newName, age: Number(newAge) }));

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    };

    const updateUser = async (id, age) => {
        // dispatch(updateUser({ id, age: age + 1 }));

        await firestore
            .collection("users")
            .doc(id)
            .update({ age: age + 1 });
    };

    const deleteUser = async (id) => {
        // dispatch(deleteUser(id));

        await firestore.collection("users").doc(id).delete();
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUsers());
        };

        fetchData();
    }, [dispatch, createUser, updateUser, deleteUser]);

    return (
        <div className="App text-center">
            <div className=" p-3">
                <input
                    id="name"
                    placeholder="Name..."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
            </div>
            <div className=" pb-3">
                <input
                    id="age"
                    type="number"
                    placeholder="Age..."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />
            </div>

            <button className="btn btn-primary" onClick={createUser}>
                {" "}
                Create User
            </button>
            <Card className="p-2 m-3">
                <h2>List of all the users</h2>
                {users?.map((user) => {
                    return (
                        <div className="m-2">
                            {" "}
                            <h4>Name: {user.name}</h4>
                            <h4>Age: {user.age}</h4>
                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    updateUser(user.id, user.age);
                                }}
                            >
                                {" "}
                                Increase Age
                            </button>
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    deleteUser(user.id);
                                }}
                            >
                                {" "}
                                Delete User
                            </button>
                        </div>
                    );
                })}
            </Card>
        </div>
    );
}

export default Home;
