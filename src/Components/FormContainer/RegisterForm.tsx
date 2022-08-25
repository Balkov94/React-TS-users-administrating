import { IFormParentProps } from "./LoginForm";
import styles from "./FormContainer.module.css";
import {
     DescriptionType,
     GenderEnum, IdType,
     RoleEnum, StatusEnum,
     TimeOfModificationType,
     UserClass
} from "../../Rest-APi-Client/shared-types";


export interface IFormData {
     id?: IdType
     fname: string,
     lname: string,
     readonly username: string,
     password: string,
     gender: GenderEnum,
     role: RoleEnum,
     picture: string,
     description?: DescriptionType,
     status: StatusEnum,
     timeOfCreation: string,
     timeOfModification: TimeOfModificationType,

}


function RegisterForm(props: IFormParentProps | undefined) {
     // const [formData, setFormData] = useState({});

     const sendFormData = (event: any) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          //Password VALIDATION  8chars length - !!! 1 digit , 1 symbol atleast    
          if (formData.get("password") !== formData.get("confirmPassword")) {
               alert("Repeat password field doesn't match to password!")
               return;
          }
          const currPassword = (formData.get("password"))?.toString().split("");
          let haveDigit = false;
          let haveSpecialSign = false;
          currPassword?.forEach(char => {
               const currASCIICode = char.charCodeAt(0);
               if (currASCIICode >= 48 && currASCIICode <= 57) {
                    haveDigit = true;
               }
               else if (currASCIICode >= 33 && currASCIICode <= 47
                    || (currASCIICode >= 58 && currASCIICode <= 64)
                    || (currASCIICode >= 91 && currASCIICode <= 95)
                    || (currASCIICode >= 123 && currASCIICode <= 126)) {
                    haveSpecialSign = true;
               }
          })
          if (haveDigit === false || haveSpecialSign === false) {
               alert("Your password must contain atleast one digit and special sign( _ , &, $ etc.)");
               return;
          }
        
          // add avatar pictures for default if missing
          const currPicture = formData.get("picture") as string;
          if (currPicture === "") {
               const genderEnumNumber = formData.get("gender") as unknown as number;
               if (genderEnumNumber == 1) {
                    formData.set("picture", require('../../images/mavatar.png'));
               }
               else {
                    formData.set("picture", require('../../images/favatar.png'));
               }
          }

          const newUser = new UserClass(
               undefined,
               formData.get("fname") as string,
               formData.get("lname") as string,
               formData.get("username") as string,
               formData.get("password") as string,
               formData.get("gender") as unknown as number,
               formData.get("role") as unknown as number,
               formData.get("picture") as string,
               formData.get("description") as string,
          )

          console.log(newUser);

          // console.log(newUser.toString());
          props!.handleFormData(newUser)
     }


     //* UNCONTROLLED form (all inputs are uncontrolled)
     return (
          <div className={styles.registerForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Register
                              {
                                   !props?.isAdminEdition
                                   && (
                                        <button
                                             className={styles.formSwitchBtn}
                                             onClick={props!.switchForm}
                                        >go to login</button>
                                   )
                              }

                         </h1>
                    </div>
                    <div>
                         <label htmlFor="fname">*First name: </label>
                         <input type="text" name="fname" id="fname" required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="lname">*Last name: </label>
                         <input type="text" name="lname" id="lname" required={true} maxLength={15} minLength={2} />
                    </div>
                    <div>
                         <label htmlFor="username">*Username</label>
                         <input type="text" name="username" id="username" required={true} />
                    </div>
                    <div>
                         <label htmlFor="password">*Password</label>
                         <input type="text" name="password" id="password" required={true} minLength={8} />
                    </div>
                    <div>
                         <label htmlFor="confirmPassword">*Repeat password:</label>
                         <input type="text" name="confirmPassword" id="confirmPassword" required={true} minLength={8} />
                    </div>
                    <div>
                         <label htmlFor="gender">Gender</label>
                         <select name="gender" id="gender">
                              <option value={GenderEnum.Male}>male</option>
                              <option value={GenderEnum.female}>female</option>
                         </select>
                    </div>
                    {/* when register User Default / when admin create user role - OPTIONS */}
                    {
                         props?.isAdminEdition
                              ? (<div>
                                   <label htmlFor="role">Role:</label>
                                   <select name="role" id="role">
                                        <option value={RoleEnum.User}>user</option>
                                        <option value={RoleEnum.Admin}>admin</option>
                                   </select>
                              </div>)
                              : (<div>
                                   <label htmlFor="role">Role:</label>
                                   <select name="role" id="role" defaultValue={RoleEnum.User}>
                                        <option value={RoleEnum.User}>user</option>
                                   </select>
                              </div>)
                    }

                    <div>
                         <label htmlFor="picture">Picture(URL)</label>
                         <input type="text" name="picture" id="picture" />
                    </div>
                    <div>
                         <label htmlFor="description">Short description</label>
                         <textarea name="description" id="desc" cols={30} rows={10} maxLength={512}></textarea>
                    </div>
                    <button type="submit">make registration</button>
               </form>
          </div>
     )
}

export default RegisterForm;