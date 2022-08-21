import styles from "./UserDataContainer.module.css"
import { IFormData } from "../FormContainer/RegisterForm";
import { GenderEnum, RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import { useState } from "react";
import EditForm from "../FormContainer/EditForm";
import AllUsersContainer from "../AllUsersContainer/AllUsersContainer";

interface IUserDataContainerProps {
     user: IFormData | any;
     handleFormData(formData?: any): void;
}
type IEditMode = true | false

// function UserDataContainer(props:IUserDataContainerProps) {

function UserDataContainer({ user, handleFormData }: IUserDataContainerProps) {
     const [editMode, setEditMode] = useState<IEditMode>(false);

     const handleEditMode = () => {
          setEditMode(editMode => !editMode)
     }


     return (
          <>
               <div className={styles.dataContainer}>
                    <h1>Welcome, {user?.fname} {user?.lname}</h1>
                    <div> <h2>Your profile:</h2></div>
                    <div className={styles.data}>
                         <p>First name: {user?.fname}</p>
                         <p>Last name: {user?.lname}</p>
                         <p>Username: {user?.username}</p>
                         <p>Password: {user?.password}</p>
                         <p>Gender: {GenderEnum[user!.gender]}</p>
                         <p>Role: {RoleEnum[user!.role]}</p>
                         <p>Description: {user?.description}</p>
                         <p>Status: {StatusEnum[user!.status]}</p>
                         <p>Created on date: {user?.timeOfCreation}</p>
                         <p>Last modification: {user?.timeOfModification}</p>
                         <img className={styles.profilePic} src={user?.picture} alt="profile_picture" />
                    </div>
                    <button
                         onClick={handleEditMode}
                         className={styles.editProfileBtn}
                    >Edit profile</button>
               </div>

               {editMode && (<EditForm
                    handleFormData={handleFormData}
                    editUser={user}
                    handleEditMode={handleEditMode}
               ></EditForm>)}

               {/* element wrapper ->all users card + option to edit them */}
               {
                    (RoleEnum[user!.role]==="Admin") && <AllUsersContainer></AllUsersContainer>    
               }
               
         
         
         
          </>



     );
}

export default UserDataContainer;