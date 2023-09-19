import React, { useEffect, useState } from "react";
import "../scss/HomeComponent.scss";
import LogoutComponent from "./LogoutComponent";
import Topbar from "./common/TopBar/Topbar";
import Card from "./common/Card/Card";
import Task from "./common/Task/Task";
import Image from "../assets/laptop.png";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

import 'react-chatbot-kit/build/main.css'
import { IconContext } from "react-icons";

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
import ChatbotWidget from "./chatbot/ChatbotWidget.jsx";


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
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !updatedTitle ||
      !updatedDescription ||
      !updatedMentorName ||
      !updatedMentorEmail
    ) {
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
      toast.success("Added New Course to the list")
    } catch (err) {
      toast.success("Added New Course to the list")
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

    if (
      !updatedTitle ||
      !updatedDescription ||
      !updatedMentorName ||
      !updatedMentorEmail
    ) {
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
  
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to MyCourse</h1>
          <h3>
            Streamline Your Video Content Creation and Sharing Experience as an
            Author
          </h3>
          <p>
            A platform designed to empower authors by simplifying the uploading
            and sharing of their video content, enhancing their online presence
            and engagement with readers
          </p>
          <button className="add-now" onClick={() => setIsFormVisible(true)}>
            Add now
          </button>
        </div>
        <img src={Image} alt="mentor banner" className="banner-image" />
      </div>

      {isFormVisible && (
        <div className={`popup ${isFormVisible ? "popup-visible" : ""}`}>
          <form className="add-form">
            <div className="form-column">
              <div className="popup-close-container">
                <IconContext.Provider
                  value={{
                    color: "red",
                    className: "global-class-name",
                    size: "1.5rem",

                    style: { cursor: "pointer" },
                  }}
                >
                  <AiOutlineClose
                    onClick={() => setIsFormVisible(false)}
                  ></AiOutlineClose>
                </IconContext.Provider>
              </div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Course Title"
                id="title"
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
        </div>
      )}

      <div className="course">
        <h1>Courses</h1>
      </div>
      <div className="card-container">
        {task.map((tsk) => (
          <div className="card" key={tsk.id}>
            <div className="card-content">
              <div className="card-title"> {tsk.data.title}</div>
              <div className="card-description">
                Description: {tsk.data.description}
              </div>
              <div className="card-description">
                Mentor Name: {tsk.data.MentorName}
              </div>
              <div className="card-description">
                Mentor Email: {tsk.data.MentorEmail}
              </div>
            </div>
            <div className="card-actions">
              <IconContext.Provider
                value={{
                  color: "blue",
                  className: "global-class-name",
                  size: "1.5rem",
                  style: { cursor: "pointer" },
                }}
              >
                <AiOutlineEdit
                  className="update-button"
                  onClick={(e) => {
                    setIsFormVisible(true);
                    setTaskToUpdateId(tsk.id);
                    setUpdatedTitle(tsk.data.title);
                    setUpdatedDescription(tsk.data.description);
                    setMentorName(tsk.data.MentorName);
                    setMentorEmail(tsk.data.MentorEmail);
                  }}
                >
                  Update
                </AiOutlineEdit>
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  color: "red",
                  className: "global-class-name",
                  size: "1.5rem",
                  style: { cursor: "pointer" },
                }}
              >
                <FiTrash2
                  className="delete-button"
                  onClick={(e) => handleDelete(e, tsk.id)}
                >
                  Delete
                </FiTrash2>
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
      <div className="App">
                <ChatbotWidget />
      </div>
    </div>
  );
}

export default HomeComponent;
