import React from "react"
import styles from "./ContactCard.module.css"


export default function ContactCard(props){
    return(
        <div className={styles["card-wrapper"]}>
            <h2>{props.icon}</h2>
            <p>{props.text}</p>
            <p>{props.contact}</p>
        
        </div>
    )
}