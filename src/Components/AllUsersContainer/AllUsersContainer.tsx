import { useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { UserClass } from "../../Rest-APi-Client/shared-types";
import Filters from "../FIlters/Filter";
import RegisterForm, { IFormData } from "../FormContainer/RegisterForm";
import UserCard from "../UserCard/UserCard";
import styles from "./AllUsersContainer.module.css"

interface IAllUserContainerProps {
     loggedUser: IFormData;
}


function AllUsersContainer(props: IAllUserContainerProps) {
     const [filtredData, setFiltredData] = useState<IFormData[]>([]);
     const [update, setUpdate] = useState(false);
     const [showCreateForm, setShowCreateForm] = useState(false);

     const handleDeleteUser = (userID: number) => {
          UserApi.deleteById(userID)
               .then(() => {
                    setFiltredData(filtredData.filter(user => user.id !== userID));
                    setUpdate(update => !update);
               })
               .catch(err => alert(err.message))
     }

     const handleEditUser = (editUser: UserClass) => {
          UserApi.update(editUser)
               .then(() => {
                    setFiltredData(filtredData.map(user => {
                         if (user.id === editUser.id) {
                              return editUser;
                         }
                         return user
                    }));
                    setUpdate(update => !update);
               })
               .catch(err => alert(err.message))
     }


     const handleFiltredData = (filtredUsers: UserClass[]) => {
          setFiltredData(filtredUsers);
     }



     const handleCreateUser = (newUserObj: IFormData) => {
          UserApi.findAll()
               .then(data => {
                    if (data.some(user => user.username === newUserObj.username)) {
                         alert("This username is already taken! Choose another one.")
                         return;
                    }
                    UserApi.create(newUserObj)
                         .then(res => {
                              alert("Successful registration!");
                         })
                         .catch(err => alert(err))
               })
     }


     return (
          <div className={styles.allUsersContainer}>
               <h1 className={styles.userListTitle}>Users list</h1>
               <button className={styles.createNewUser}
                    onClick={() => setShowCreateForm(showCreateForm => !showCreateForm)}
               >Create new user</button>
               {
                    showCreateForm
                    && <RegisterForm
                         handleFormData={handleCreateUser}
                         isAdminEdition={true}
                    ></RegisterForm>
               }
               <Filters
                    update={update}
                    handleFiltredData={handleFiltredData}
               ></Filters>

               <div className={styles.cardWrapper}>
                    {    //additional filter not to show logged user)
                         filtredData.filter(user => user.id !== props.loggedUser.id)
                              .map((user: IFormData) => {
                                   return <UserCard
                                        key={user.id}
                                        user={user}
                                        handleEditUser={handleEditUser}
                                        handleDeleteUser={handleDeleteUser}
                                   ></UserCard>
                              })
                    }
               </div>
          </div>
     );
}

export default AllUsersContainer;