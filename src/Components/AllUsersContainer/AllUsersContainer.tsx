import { useEffect, useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { IFormData } from "../FormContainer/RegisterForm";
import UserCard from "../UserCard/UserCard";
import styles from "./AllUsersContainer.module.css"

interface IAllUserContainerProps {
     loggedUser: IFormData;
}


// function AllUsersContainer( {allUsers}:IAllUserContainerProps) {
function AllUsersContainer(props: IAllUserContainerProps) {
     const [users, setUsers] = useState<IFormData[]>([]);

     useEffect(() => {
          UserApi.findAll()
               .then(res => {
                    setUsers(res);
               })
               .catch(err => alert(err))
     }, []);

     const handleDeleteUser = (userID: number) => {
          UserApi.deleteById(userID)
               .then(() => {
                    setUsers(users.filter(user => user.id !== userID));
               })
               .catch(err => alert(err))
     }

     const handleEditUser = (editUser: any) => {
          UserApi.update(editUser)
               .then(() => {
                    setUsers(users.map(user => {
                         if(user.id===editUser.id){
                              return editUser;
                         }
                         return user
                    }));
               })
               .catch(err => alert(err))
     }

     return (
          <div className={styles.allUsersContainer}>
               <h1 className={styles.userListTitle}>Users list</h1>
               <div className={styles.cardWrapper}>
                    {
                         users.filter(user => user.id !== props.loggedUser.id)
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