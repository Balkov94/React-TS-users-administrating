import styles from "./UserDataContainer.module.css"
import { IFormData } from "../FormContainer/RegisterForm";
import { GenderEnum, RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import { useState } from "react";
import EditForm from "../FormContainer/EditForm";
import AllUsersContainer from "../AllUsersContainer/AllUsersContainer";

interface IUserDataContainerProps {
     loggedUser: IFormData | any;
     handleFormData(formData?: any): void;
     handleLogged():void;
}
type IEditMode = true | false

// function UserDataContainer(props:IUserDataContainerProps) {

function UserDataContainer({ loggedUser, handleFormData,handleLogged}: IUserDataContainerProps) {
     const [editMode, setEditMode] = useState<IEditMode>(false);

     const handleEditMode = () => {
          setEditMode(editMode => !editMode)
     }


     return (
          <>
               <div className={styles.dataContainer}>
                    <h1>Welcome, {loggedUser?.fname} {loggedUser?.lname}</h1>
                    <div> <h2>Your profile:</h2></div>
                    <div className={styles.data}>
                         <p>First name: {loggedUser?.fname}</p>
                         <p>Last name: {loggedUser?.lname}</p>
                         <p>Username: {loggedUser?.username}</p>
                         <p>Password: {loggedUser?.password}</p>
                         <p>Gender: {GenderEnum[loggedUser!.gender]}</p>
                         <p>Role: {RoleEnum[loggedUser!.role]}</p>
                         <p>Description: {loggedUser?.description}</p>
                         <p>Status: {StatusEnum[loggedUser!.status]}</p>
                         <p>Created on date: {loggedUser?.timeOfCreation}</p>
                         <p>Last modification: {loggedUser?.timeOfModification}</p>
                         <img className={styles.profilePic} src={loggedUser?.picture} alt="profile_picture" />
                       
                    </div>
                    <button
                         onClick={handleEditMode}
                         className={styles.editProfileBtn}
                    >Edit profile
                    </button>
                    <button
                         onClick={handleLogged}
                         className={styles.logoutBtn}
                    >Logout
                    </button>
               </div>

               {editMode && (<EditForm
                    handleFormData={handleFormData}
                    editUser={loggedUser}
                    handleEditMode={handleEditMode}
               ></EditForm>)}

               {/* element wrapper ->all users card + option to edit them */}
               {
                    (RoleEnum[loggedUser!.role]==="Admin") && <AllUsersContainer loggedUser={loggedUser}></AllUsersContainer>    
               }
               
         
         
         
          </>



     );
}

export default UserDataContainer;