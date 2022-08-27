import styles from "./FormContainer.module.css";
import {
     GenderEnum,
     RoleEnum,
     StatusEnum,
} from "../../Rest-APi-Client/shared-types";
import { useState } from "react";
import { IFormData } from "./RegisterForm";

interface IEditFormProps {
     handleFormData(formData?: Partial<IFormData>): void;
     isAdminEdition?: boolean;
     handleEditMode?: (event?: any) => void;
     editUser?: IFormData;
}

function EditForm({ editUser,
     handleFormData,
     handleEditMode,
     isAdminEdition }: IEditFormProps) {

     // USING props into a local STATE -> because there is A SINGLE SOURCE OF TRUTH
     const [editObject, setEditObject] = useState(editUser)

     const handleInputs = (event: any) => {
          const propName = event.target.name;
          const newValue = event.target.value;
          const newObj: any = {
               ...editObject,
               [propName]: newValue,
          }
          setEditObject(newObj)
     }

     const sendFormData = (event: any) => {
          event.preventDefault();
          const updatedUser = { ...editObject, timeOfModification: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}` };   
          handleFormData(updatedUser)
          // console.log(updatedUser);

     }


     return (
          <div className={styles.registerForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Edit {editUser?.username}'s profile
                              <button className={styles.formSwitchBtn}
                                   onClick={handleEditMode}
                              >Exit edition</button>
                         </h1>
                    </div>

                    <div>
                         <label htmlFor="fname">First name: </label>
                         <input onChange={handleInputs}
                              type="text" name="fname" id="fname" value={editObject?.fname}
                              required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="lname">Last name: </label>
                         <input onChange={handleInputs}
                              type="text" name="lname" id="lname" value={editObject?.lname}
                              required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="username">Username:</label>
                         <input onChange={handleInputs}
                              type="text" name="username" id="username"
                              value={editObject?.username} readOnly={true}
                              className={styles.usernameLOckedField} />

                    </div>
                    {
                         isAdminEdition === undefined ?
                              //undefined - > user edit self 
                              <>
                                   <div>
                                        <label htmlFor="password">New Password:</label>
                                        <input onChange={handleInputs} type="password" name="password" id="password" value={editObject?.password} />
                                   </div>
                                   {/* edit self by Admin*/}
                                   {

                                        (RoleEnum[editUser!.role] === "Admin") &&
                                        <>
                                             <div>
                                                  <label htmlFor="status">User status:</label>
                                                  <select onChange={handleInputs} name="status" id="status" defaultValue={editObject?.status}>
                                                       <option value={StatusEnum.Active}>Active</option>
                                                       <option value={StatusEnum.Deactivated}>Deactivated</option>
                                                       <option value={StatusEnum.Suspended}>Suspended</option>
                                                  </select>
                                             </div>
                                             <div>
                                                  <label htmlFor="role">Role:</label>
                                                  <select onChange={handleInputs} name="role" id="role" defaultValue={editObject?.role}>
                                                       <option value={RoleEnum.User}>user</option>
                                                       <option value={RoleEnum.Admin}>admin</option>
                                                  </select>
                                             </div>
                                        </>
                                   }
                              </>

                              :
                              //admin edit other user
                              (<>
                                   <div>
                                        <label htmlFor="status">User status:</label>
                                        <select onChange={handleInputs} name="status" id="status" defaultValue={editObject?.status}>
                                             <option value={StatusEnum.Active}>Active</option>
                                             <option value={StatusEnum.Deactivated}>Deactivated</option>
                                             <option value={StatusEnum.Suspended}>Suspended</option>
                                        </select>
                                   </div>
                                   <div>
                                        <label htmlFor="role">Role:</label>
                                        <select onChange={handleInputs} name="role" id="role" defaultValue={editObject?.role}>
                                             <option value={RoleEnum.User}>user</option>
                                             <option value={RoleEnum.Admin}>admin</option>
                                        </select>
                                   </div>
                              </>)

                    }
                    <div>
                         <label htmlFor="gender">Gender:</label>
                         <select onChange={handleInputs} name="gender" id="gender" defaultValue={editObject?.gender}>
                              <option value={GenderEnum.Male}>male</option>
                              <option value={GenderEnum.female}>female</option>
                         </select>
                    </div>
                    <div>
                         <label htmlFor="picture">Picture(URL):</label>
                         <input onChange={handleInputs} type="text" name="picture" id="picture" value={editObject?.picture} />
                    </div>
                    <div>
                         <label htmlFor="description">Description:</label>
                         <textarea onChange={handleInputs}
                              name="description" id="desc" cols={30} rows={10} value={editObject?.description}
                              maxLength={512}
                              placeholder="Not necessary only if you are in the mood &#128516;"
                         ></textarea>
                    </div>
                    <button type="submit">SAVE EDITION</button>
               </form>
          </div>
     )
}

export default EditForm;