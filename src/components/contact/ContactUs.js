import React from "react"
import ContactCard from "./ContactCard"
import styles from "./ContactUs.module.css"
import { FaUserCircle, FaEnvelope, FaPhoneAlt} from 'react-icons/fa';

export default function Contact(){
    return(
        <div className={styles["contact-wrapper"]}> 
           <ContactCard
            icon= {<FaUserCircle/>}
            text= "We can discus problems at the personal meeting"
            contact = "We can meet everywhere"
            />
            
           <ContactCard 
           icon= {<FaEnvelope/>}
           text= "Write us your problem to the " 
           contact= "voidd@gmail.com"/>
           
           <ContactCard 
            icon={<FaPhoneAlt/>}
            text= "Our service centre is available for you on this number "
            contact="+420 001 234 567"  
        /> 
        </div>
    )
}