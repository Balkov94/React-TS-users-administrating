import React, { useState } from "react";
import LoginForm from "./LoginForm";
import styles from "./FormContainer.module.css";
import RegisterForm, { IFormData } from "./RegisterForm";
import { UserApi } from "../../Rest-APi-Client/client"
import UserDataContainer from "../UserDataContainer/UserDataContainer";

type FormType = "login" | "register";
type Logged = true | false;


function FormContainer() {
     const [formType, setFormType] = useState<FormType>("login");
     const [logged, setLogged] = useState<Logged>(false)
     const [user, setUser] = useState<IFormData>();


     const handleFormType = (event: any) => {
          event.preventDefault();
          if (event.target.innerText.includes("login")) {
               setFormType("login")
          }
          else {
               setFormType("register")
          }
     }

     const handleLoginData = (formData: any) => {
          // go to data check for entities and return 
          UserApi.findAll()
               .then((response) => response)
               .then(data => {
                    console.log(data);
                    return data;
               })
               .then(data => {
                    const isLogged = data.find(user =>
                         user.username === formData.username
                         && user.password === formData.password);
                    if (isLogged) {
                         setUser(isLogged);
                    }
                    return isLogged;

               })
               .then(res => {
                    return res !== undefined ?
                         setLogged(logged => !logged) : alert("Wrong username or password!")
               }).catch(err => alert(err))
     }

     const handleRegisterData = (formData: IFormData) => {
          UserApi.findAll()
               .then(data => {
                    if (data.some(user => user.username === formData.username)) {
                         alert("This username is already taken! Choose another one.")
                         return;
                    }
                    UserApi.create(formData)
                         .then(res => {
                              alert("Successful registration!");
                         })
                         .catch(err => alert(err))
               })
     }

     const handleUserEdition = (formData: any) => {
          UserApi.update(formData)
          .then(res=>{
               alert(`${formData.username}'s profile was updated.`)
               //after edint profile update user in state too
               setUser(formData);

          })
          .catch(err=>alert(err))
     }


     return (
          <div className={styles.formContainer}>
               {
                    (!logged)
                         ? (
                              formType === "login" ?
                                   <LoginForm
                                        switchForm={handleFormType}
                                        handleFormData={handleLoginData}
                                   ></LoginForm>
                                   :
                                   <RegisterForm
                                        switchForm={handleFormType}
                                        handleFormData={handleRegisterData}
                                   ></RegisterForm>
                         )
                         : (<UserDataContainer
                              user={user}
                              handleFormData={handleUserEdition}
                         ></UserDataContainer>)




               }

          </div>
     );
}

export default FormContainer;