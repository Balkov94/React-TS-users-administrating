import { useEffect, useState } from "react";
import { UserApi } from "../../Rest-APi-Client/client";
import { RoleEnum, StatusEnum, UserClass } from "../../Rest-APi-Client/shared-types";
import Filters, { IFilterValues } from "../FIlters/Filter";
import RegisterForm, { IFormData } from "../AllFormTypes/RegisterForm";
import UserCard from "../UserCard/UserCard";
import styles from "./AllUsersContainer.module.css"

interface IAllUserContainerProps {
     loggedUser: IFormData;
}


function AllUsersContainer({ loggedUser }: IAllUserContainerProps) {
     const [fetchedUsers, setFetchedUsers] = useState<IFormData[]>([]);
     const [showCreateForm, setShowCreateForm] = useState(false);
     //get all users once
     useEffect(() => {
          UserApi.findAll()
               .then(res => {
                    setFetchedUsers(res.reverse());
               })
               .catch(err => alert("ERROR:Coudn't get users from the date!"))
     }, []);

     // users CRUD ___________________________________________________________________
     const handleDeleteUser = (userID: number) => {
          UserApi.deleteById(userID)
               .then(() => {
                    setFetchedUsers(fetchedUsers.filter(user => user.id !== userID));
               })
               .catch(err => {
                    alert("Error: Unsuccessful deletion!");
               })
     }

     const handleEditUser = (editUser: UserClass) => {
          UserApi.update(editUser)
               .then(() => {
                    setFetchedUsers(fetchedUsers.map(user => {
                         if (user.id === editUser.id) {
                              return editUser;
                         }
                         return user
                    }));
               })
               .catch(err => {
                    alert("ERROR: Unsuccessful edition!");
               })
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
                              // setFetchedUsers(fetchedUsers => fetchedUsers.concat(res));
                              //put new user infront of the array
                              setFetchedUsers(fetchedUsers => [res,...fetchedUsers]);
                         })
                         .catch(err => alert("ERROR: Unsuccessful creation!!!"))
               })
     }
     // _____________________________________________________________________________________
     const handleShowCreateForm = () => {
          setShowCreateForm(false);
     }

     // FILTER handler _______________________________________________________________________
     const [filter, setFilter] = useState<IFilterValues>({
          role: "All", status: "All", searchText: "",
     });
     const handleFilterChanges = (newFilterValues: IFilterValues) => {
          setFilter(newFilterValues);
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
                         handleCreateUser={handleCreateUser}
                         isAdminUsingForm={true}
                         handleShowCreateForm={handleShowCreateForm}
                    ></RegisterForm>
               }

               <Filters
                    filterValues={filter}
                    onfilterChange={handleFilterChanges}
               ></Filters>

               <div className={styles.cardWrapper}>
                    {
                         fetchedUsers.filter(user => {
                              // if filtervalue ==="All" need to return all of curr value
                              const role = filter.role === "All" ? user.role : filter.role;
                              const status = filter.status === "All" ? user.status : filter.status;
                              if (user.id !== loggedUser.id
                                   && user.role == role 
                                   && user.status == status //StatusEnum return num but from fetch get str FIX -> ==
                                   && (user.username.toLowerCase().includes(filter.searchText.toLowerCase())
                                        || ((user.fname.toLowerCase().includes(filter.searchText.toLowerCase())))
                                        || (user.lname.toLowerCase().includes(filter.searchText.toLowerCase())))) {
                                   return user;
                              }
                         }).map((user: IFormData) => {
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