import { useEffect, useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { IFormData } from "../FormContainer/RegisterForm";
import UserCard from "../UserCard/UserCard";
import styles from "./AllUsersContainer.module.css"

interface IAllUserContainerProps {
     allUsers: IFormData[];
}


// function AllUsersContainer( {allUsers}:IAllUserContainerProps) {
function AllUsersContainer() {
     const [users, setUsers] = useState<IFormData[]>([]);

     useEffect(() => {
          let allUsers = UserApi.findAll()
               .then(res => {
                    setUsers(res);
               })
               .catch(err => alert(err))
     }, []);


     return (
          <div className={styles.allUsersContainer}>
               <h1 className={styles.userListTitle}>Users list</h1>
               <div className={styles.cardWrapper}>
                    {
                         users.map((user:IFormData)=>{
                             return <UserCard key={user.id} user={user}></UserCard>
                         })
                    }
               </div>
          </div>
     );
}

export default AllUsersContainer;