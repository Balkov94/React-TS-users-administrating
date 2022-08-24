import React, { useEffect, useState } from "react";
import reactMarkdown from "react-markdown";
import { UserApi } from "../../Rest-APi-Client/client";
import { RoleEnum, StatusEnum } from "../../Rest-APi-Client/shared-types";
import { IFormData } from "../FormContainer/RegisterForm";
import styles from "./Filters.module.css"

interface IFilterProps {
     handleFiltredData(filtredUsers: IFormData[]): void;
     update: boolean,
}

function Filters({ handleFiltredData, update }: IFilterProps) {
     const [allUsers, setallUsers] = useState<IFormData[]>([]);
     const [role, setRole] = useState<string>("All");
     const [status, setStatus] = useState<string>("All");
     const [searchText, setSearchText] = useState("");


     useEffect(() => {
          UserApi.findAll()
               .then(res => {
                    setallUsers(res)

                    let filtredData = res.filter(user => {
                         if (RoleEnum[user.role] === (role === "All" ? RoleEnum[user.role] : role)
                              && StatusEnum[user.status] === (status === "All" ? StatusEnum[user.status] : status)) {
                              return user
                         }
                    })
                    handleFiltredData(filtredData);
               })
               .catch(err => alert(err))
     }, [update]);

     const hadnleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
          let role = event.target.value === "2" ? "Admin" :
               (event.target.value === "1") ? "User" : "All";
          setRole(role);

     }
     const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
          let status = event.target.value === "1" ? "Active" :
               (event.target.value === "2") ? "Deactivated" :
                    (event.target.value === "3") ? "Suspended" : "All";
          setStatus(status);
     }

     const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);
     }

     const handleSubmit = (event: any) => {
          event.preventDefault();
          let filtredData = allUsers.filter(user => {
               if (RoleEnum[user.role] === (role === "All" ? RoleEnum[user.role] : role)
                    && StatusEnum[user.status] === (status === "All" ? StatusEnum[user.status] : status)
                    && (user.fname.toLocaleLowerCase().includes(searchText)
                         || user.lname.toLocaleLowerCase().includes(searchText)
                         || user.username.toLocaleLowerCase().includes(searchText))) {
                    return user
               }
          })

          handleFiltredData(filtredData);

     }

     return (
          <form action="submit" onSubmit={(event) => handleSubmit(event)}>
               <div className={styles.searchContainer}>
                    <label htmlFor="search">Search by names or username:</label>
                    <input type="text" name="search" id="search"
                         value={searchText}
                         onChange={(event) => handleInput(event)}
                         onClick={() => setSearchText("")}
                    />

                    <label htmlFor="filterByRole">Filter by Role:</label>
                    <select name="filterByRole" id="filterByRole"
                         onChange={(event) => hadnleRole(event)}
                         defaultValue={"All"}>
                         <option value={"All"}>All</option>
                         <option value={RoleEnum.User}>User</option>
                         <option value={RoleEnum.Admin}>Admin</option>
                    </select>

                    <label htmlFor="filterByStatus">Filter by Status:</label>
                    <select name="filterByStatus" id="filterByStatus"
                         onChange={(event) => handleStatus(event)}
                         defaultValue={"All"}>
                         <option value={"All"}>All</option>
                         <option value={StatusEnum.Active}>Active</option>
                         <option value={StatusEnum.Deactivated}>Deactivated</option>
                         <option value={StatusEnum.Suspended}>Suspended</option>
                    </select>
                    <button type="submit">Filter</button>
               </div>
          </form>

     );
}

export default Filters;