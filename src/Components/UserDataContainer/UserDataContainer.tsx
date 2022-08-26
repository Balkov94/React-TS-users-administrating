import styles from "./UserDataContainer.module.css"
import { IFormData } from "../FormContainer/RegisterForm";
import { GenderEnum, RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import { useState } from "react";
import EditForm from "../FormContainer/EditForm";
import AllUsersContainer from "../AllUsersContainer/AllUsersContainer";

interface IUserDataContainerProps {
     loggedUser: any; //IFormData | UserClass(parent conditional rendering checkED)
     handleUserEdition(formData?: any): void;
     handleIslogged(): void;
}
type IEditMode = true | false


function UserDataContainer({ loggedUser, handleUserEdition, handleIslogged }: IUserDataContainerProps) {
     const [editMode, setEditMode] = useState<IEditMode>(false);

     const handleLoggedUserEditMode = () => {
          setEditMode(editMode => !editMode)
     }

     return (
          <>
               <div className={styles.dataContainer}>
                    <h1>Welcome, {loggedUser?.fname} - {RoleEnum[loggedUser.role]}</h1>
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
                         onClick={handleLoggedUserEditMode}
                         className={styles.editProfileBtn}
                    >Edit profile
                    </button>
                    <button
                         onClick={handleIslogged}
                         className={styles.logoutBtn}
                    >Logout
                    </button>
               </div>

               {editMode
                    && (<EditForm
                         handleFormData={handleUserEdition}
                         editUser={loggedUser}
                         handleEditMode={handleLoggedUserEditMode}
                    ></EditForm>)
               }

               {/* element wrapper ->all users card + options to edit/delete them */}
               {
                    (RoleEnum[loggedUser!.role] === "Admin")
                    && <AllUsersContainer loggedUser={loggedUser}></AllUsersContainer>
               }

          </>
     );
}

export default UserDataContainer;