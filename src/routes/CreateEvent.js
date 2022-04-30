import React, { useContext } from "react"
import { useForm } from "react-hook-form";
import {firestore, storage} from "../firebase"
import { collection, addDoc} from "firebase/firestore";
import { v4 as uuid} from "uuid";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom"
import EventContext from "../store/event-context"
import { eventConverter } from "../utils/firebase-converters"
import styles from "./CreateEvent.module.css";



const CreateEvent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { reloadEvents } = useContext(EventContext);

    async function handleRegistration(event){
      const help = uuid();
  
        const storageReference = ref(storage, "posters/" + help + event.poster[0].name);
        await uploadBytes(storageReference, event.poster[0]);
        const imageURL = await getDownloadURL(storageReference);
        event.poster = imageURL;
        await addDoc(collection(firestore, "events").withConverter(eventConverter),event);
        alert("Congratulation, your event has been created!")
        reloadEvents();
        navigate("/")
        
        
    }
    const handleError = (errors) => {
      alert("Something went wrong, try again!")
    };
    
    const registerOptions = {
      title: { required: "Title is required" },
      description: { required: "Add some description about event" },
      location: {required: "Please fill place of the event"},
      date: {required: "Please enter date and time of event"},
      capacity: {required: "Enter capacity of the event if you need"},
      genre: {required: "Enter genre of the event"},
      price: {required: "Enter price for 1 ticket"},
    };
    

    return (
      <div className= {styles["form-image"]}>
        <form className = {styles["form-wrapper"]} onSubmit={handleSubmit(handleRegistration, handleError)} >
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Title</label>
            <input className = {styles["form-input"]}name="title" type="text" {...register('title', registerOptions.title) }/>
            <small className={styles["form-error"]}>
              {errors?.title && errors.title.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Description</label>
            <textarea className = {styles["form-input"]} type="text" name="description"{...register('description', registerOptions.description)}/>
            <small className={styles["form-error"]}>
              {errors?.description && errors.description.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Location</label>
            <input className = {styles["form-input"]} name="location" type="text" {...register('location', registerOptions.location) }/>
            <small className={styles["form-error"]}>
              {errors?.location && errors.location.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Date and time</label>
            <input className = {styles["form-input"]} name="date" type="datetime-local" {...register('date', registerOptions.date) }/>
            <small className={styles["form-error"]}>
              {errors?.date && errors.date.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Capacity</label>
            <input className = {styles["form-input"]} name="capacity" type="number" {...register('capacity', registerOptions.capacity) }/>
            <small className={styles["form-error"]}>
              {errors?.capacity && errors.capacity.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Genre</label>
            <input className = {styles["form-input"]} name="genre" type="text" {...register('genre', registerOptions.genre) }/>
            <small className={styles["form-error"]}>
              {errors?.genre && errors.genre.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Price</label>
            <input className = {styles["form-input"]} name="price" type="text" {...register('price', registerOptions.price) }/>
            <small className={styles["form-error"]}>
              {errors?.price && errors.price.message}
            </small>
          </div>
          <div className = {styles["form-box-wrapper"]}>
            <label className={styles["form-label"]}>Poster</label>
            <input className = {styles} name="poster" type="file" {...register('poster', registerOptions.poster)} />
          </div>
          <button className = {styles["form-button"]} type="submit" >Submit</button>
        </form>
      </div>
      );
}

export default CreateEvent;