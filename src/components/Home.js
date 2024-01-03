import { useState, useEffect, useRef } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    AddUser,
    deleteUser,
    fetchUsers,
    updateUser,
} from "../store/actions/crudActions";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function Home() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState();
    const [editingUserId, setEditingUserId] = useState(null);
    const nameInputRef = useRef(null);
    const [isNameInputFocused, setIsNameInputFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUserId) {
            updateUserFun(editingUserId.id);
        } else {
            createUser();
        }
        setNewName("");
        setNewAge("");
    };

    const createUser = async () => {
        if (newName || newAge) {
            await dispatch(AddUser({ name: newName, age: Number(newAge) }));
        }
    };

    const updateUserFun = async (id) => {
        const data = {
            id: id,
            name: editingUserId.name,
            age: Number(editingUserId.age),
        };
        if (editingUserId.name || editingUserId.age) {
            dispatch(updateUser(data));
        }
        setEditingUserId(null);
    };

    const deleteUserFun = async (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUsers());
        };

        fetchData();
    }, [dispatch, updateUserFun]);

    useEffect(() => {
        if (editingUserId && !isNameInputFocused) {
            nameInputRef.current.focus();
            setIsNameInputFocused(true);
        }
    }, [editingUserId, isNameInputFocused]);
    return (
        <>
            <div className="App text-center m-2">
                <h1 className="mt-4 ">TodoHub</h1>
                <form onSubmit={handleSubmit}>
                    <div className=" p-3">
                        <input
                            required
                            id="name"
                            ref={nameInputRef}
                            placeholder="Name..."
                            value={editingUserId ? editingUserId.name : newName}
                            onChange={(event) => {
                                if (editingUserId) {
                                    setEditingUserId((prevUser) => ({
                                        ...prevUser,
                                        name: event.target.value,
                                    }));
                                } else {
                                    setNewName(event.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className=" pb-3">
                        <input
                            required
                            id="age"
                            type="number"
                            placeholder="Age..."
                            value={editingUserId ? editingUserId.age : newAge}
                            onChange={(event) => {
                                if (editingUserId) {
                                    setEditingUserId((prevUser) => ({
                                        ...prevUser,
                                        age: event.target.value,
                                    }));
                                } else {
                                    setNewAge(event.target.value);
                                }
                            }}
                        />
                    </div>
                    {!editingUserId?.id ? (
                        <button className="btn btn-primary" type="submit">
                            Create User
                        </button>
                    ) : (
                        <>
                            <button
                                className="btn btn-success"
                                onClick={() => updateUserFun(editingUserId.id)}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => setEditingUserId(null)}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </form>
            </div>

            <table className="table table-dark table-striped my-4 tableContainer">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    {editingUserId?.id === user.id ? null : (
                                        <>
                                            <FaEdit
                                                className="fs-4 mx-2 pointer "
                                                onClick={() => {
                                                    setEditingUserId(user);
                                                }}
                                            />

                                            <FaDeleteLeft
                                                className="fs-4  pointer"
                                                onClick={() =>
                                                    deleteUserFun(user.id)
                                                }
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Home;
