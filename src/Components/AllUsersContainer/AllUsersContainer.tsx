import { useEffect, useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import Filters from "../FIlters/Filter";
import { IFormData } from "../FormContainer/RegisterForm";
import UserCard from "../UserCard/UserCard";
import styles from "./AllUsersContainer.module.css"

interface IAllUserContainerProps {
     loggedUser: IFormData;
}



// function AllUsersContainer( {allUsers}:IAllUserContainerProps) {
function AllUsersContainer(props: IAllUserContainerProps) {
     const [filtredData, setFiltredData] = useState<IFormData[]>([]);
     const [update, setUpdate] = useState(false);

     const handleDeleteUser = (userID: number) => {
          UserApi.deleteById(userID)
               .then(() => {
                    setFiltredData(filtredData.filter(user => user.id !== userID));
                    setUpdate(update => !update);
               })
               .catch(err => alert(err))
     }

     const handleEditUser = (editUser: any) => {
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
               .catch(err => alert(err))
     }

     const handleFiltredData = (filtredUsers: any) => {
          setFiltredData(filtredUsers);
          
     }

     return (
          <div className={styles.allUsersContainer}>
               <h1 className={styles.userListTitle}>Users list</h1>
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