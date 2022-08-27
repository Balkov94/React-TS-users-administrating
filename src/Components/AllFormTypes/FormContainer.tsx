import React, { useState } from "react";
import LoginForm from "./LoginForm";
import styles from "./FormContainer.module.css";
import RegisterForm, { IFormData } from "./RegisterForm";
import { UserApi } from "../../Rest-APi-Client/client"
import UserDataContainer from "../UserDataContainer/UserDataContainer";
import { UserClass } from "../../Rest-APi-Client/shared-types";

type FormType = "login" | "register";
type Logged = true | false;
export type IEditMode = true | false

function FormContainer() {
     const [formType, setFormType] = useState<FormType>("login");
     const [logged, setLogged] = useState<Logged>(false)
     const [loggedUser, setLoggedUser] = useState<IFormData>();



     const handleFormType = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();

          if (event.currentTarget.innerText.includes("login")) {
               setFormType("login")
          }
          else {
               setFormType("register")
          }
     }

     const handleLoginData = (formData: IFormData) => {
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
                         setLoggedUser(isLogged);
                    }
                    return isLogged;

               })
               .then(res => {
                    return res !== undefined ?
                         handleIslogged() : alert("Wrong username or password!")
               }).catch(err => alert(err))
     }

     const handleIslogged = () => {
          setLogged(logged => !logged);
     }

     const handleCreateUser = (formData: IFormData) => {
          UserApi.findAll()
               .then(data => {
                    if (data.some(user => user.username === formData.username)) {
                         alert("This username is already taken! Choose another one.")
                         return;
                    }
                    UserApi.create(formData)
                         .then(res => {
                              alert("Successful registration!");
                              setFormType("login");
                         })
                         .catch(err => alert(err))
               })
     }

     // editmode_____to show or not EditForm and auto close it on update
     const [editMode, setEditMode] = useState<IEditMode>(false);

     const handleEditMode = () => {
          setEditMode(editMode => !editMode);
     }

     const handleUserEdition = (formData: UserClass) => {
          UserApi.update(formData)
               .then(res => {
                    alert(`${formData.username}'s profile was updated.`)
                    //after edint profile update user in state too
                    setLoggedUser(formData);
                    // close edinform
                    handleEditMode();

               })
               .catch(err => alert(err))
     }


     return (
          <div className={styles.formContainer}>
               {
                    (!logged)
                         ? (
                              formType === "login" ?
                                   <LoginForm
                                        switchForm={handleFormType}
                                        handleLoginData={handleLoginData}
                                   ></LoginForm>
                                   :
                                   <RegisterForm
                                        switchForm={handleFormType}
                                        handleCreateUser={handleCreateUser}
                                   ></RegisterForm>
                         )
                         : (<UserDataContainer
                              loggedUser={loggedUser}
                              handleIslogged={handleIslogged}
                              handleUserEdition={handleUserEdition}

                              handleEditMode={handleEditMode}
                              currEditMode={editMode}
                         ></UserDataContainer>)

               }

          </div>
     );
}

export default FormContainer;