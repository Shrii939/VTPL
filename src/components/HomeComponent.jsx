import React, { useEffect, useState } from "react";
import "../scss/HomeComponent.scss";
import LogoutComponent from "./LogoutComponent";
import Topbar from "./common/TopBar/Topbar";
import Card from "./common/Card/Card";
import Task from "./common/Task/Task";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { toast } from "react-toastify";

function HomeComponent() {
  const [isAdded, setIsAdded] = useState(false);
  const [task, setTask] = useState([]);

  const [updatedTitle, setUpdatedTitle] = useState(""); // State for updated title
  const [updatedDescription, setUpdatedDescription] = useState(""); // State for updated description

  const [taskToUpdateId, setTaskToUpdateId] = useState(""); // State for the task ID to update
  const [updatedMentorEmail, setMentorEmail] = useState(""); // State for updated mentor email
  const [updatedMentorName, setMentorName] = useState(""); // State for updated mentor name
  const [addError, setAddError] = useState(""); // State for add error
  const [updateError, setUpdateError] = useState(""); // State for update error

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!updatedTitle || !updatedDescription || !updatedMentorName || !updatedMentorEmail) {
      setAddError("All fields are required.");
      return;
    }

    try {
      await addDoc(collection(firestore, "tasks"), {
        title: updatedTitle,
        description: updatedDescription,
        MentorName: updatedMentorName,
        MentorEmail: updatedMentorEmail,
        created: Timestamp.now(),
        completed: false,
      });

      onClose();
    } catch (err) {
      alert(err);
    }

    setUpdatedTitle("");
    setTaskToUpdateId("");
    setUpdatedDescription("");
    setMentorName("");
    setMentorEmail("");
    setAddError("");
  };

  useEffect(() => {
    const qry = query(
      collection(firestore, "tasks"),
      orderBy("created", "desc")
    );

    onSnapshot(qry, (snapshot) => {
      setTask(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleUpdate = async (e, taskIdToUpdate) => {
    e.preventDefault();

    if (!updatedTitle || !updatedDescription || !updatedMentorName || !updatedMentorEmail) {
      setUpdateError("All fields are required.");
      return;
    }

    // Find the task in the current state with the matching ID
    const taskDocRef = doc(firestore, "tasks", taskIdToUpdate);

    try {
      await updateDoc(taskDocRef, {
        title: updatedTitle,
        description: updatedDescription,
        MentorName: updatedMentorName,
        MentorEmail: updatedMentorEmail,
      });
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Something went wrong while updating the task");
    }
    setUpdatedTitle("");
    setTaskToUpdateId("");
    setUpdatedDescription("");
    setMentorName("");
    setMentorEmail("");
    setUpdateError("");
  };

  const handleDelete = async (e, id) => {
    const refDoc = doc(firestore, "tasks", id);
    let flag = false;

    task.map((tsk) => {
      if (tsk.id == id) {
        flag = true;
        try {
          deleteDoc(refDoc);
          toast.success("Task deleted successfully!");
        } catch (err) {
          toast.error("Couldn't delete task");
        }
      }
    });

    if (!flag) {
      toast.error("Couldn't delete");
    }
  };

  const onClose = () => {
    setIsAdded(false);
    // Add any additional logic to close or reset as needed.
  };

  return (
    <div>
      <Topbar />
      <form className="add-form">
        <div className="form-column">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Course Title"
            required
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Course Description"
            required
          />
          <input
            type="text"
            value={updatedMentorName}
            onChange={(e) => setMentorName(e.target.value)}
            placeholder="Mentor Name"
            required
          />
          <input
            type="email"
            value={updatedMentorEmail}
            onChange={(e) => setMentorEmail(e.target.value)}
            placeholder="Mentor Email"
            required
          />
        </div>
        <div className="form-row">
          <button className="add-button" type="submit" onClick={handleAdd}>
            Add
          </button>
          <button
            className="update-button"
            type="submit"
            onClick={(e) => handleUpdate(e, taskToUpdateId)}
          >
            Update
          </button>
        </div>
        {addError && <div className="error">{addError}</div>}
        {updateError && <div className="error">{updateError}</div>}
      </form>

      <div className="card-container">
        {task.map((tsk) => (
          <div className="card" key={tsk.id}>
            <div className="card-content">
              <div className="card-title">Title: {tsk.data.title}</div>
              <div className="card-description">Description: {tsk.data.description}</div>
              <div className="card-description">Mentor Name: {tsk.data.MentorName}</div>
              <div className="card-description">Mentor Email: {tsk.data.MentorEmail}</div>
            </div>
            <div className="card-actions">
              <button
                className="update-button"
                onClick={(e) => {
                  setTaskToUpdateId(tsk.id);
                  setUpdatedTitle(tsk.data.title);
                  setUpdatedDescription(tsk.data.description);
                  setMentorName(tsk.data.MentorName);
                  setMentorEmail(tsk.data.MentorEmail);
                }}
              >
                Update
              </button>
              <button
                className="delete-button"
                onClick={(e) => handleDelete(e, tsk.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeComponent;
