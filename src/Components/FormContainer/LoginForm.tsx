import { useState } from "react";
import styles from "./FormContainer.module.css";
import { IFormData } from "./RegisterForm";

export interface IFormParentProps {
     switchForm?: (event?: any) => void; //optional function in interface
     handleEditMode?: () => void;
     editUser?: IFormData;
     isAdminEdition?:boolean;
     handleFormData(formData?: any): void;

}



function LoginForm(props: IFormParentProps) {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");

     const handleInputs = (event: any) => {
          switch (event.target.name) {
               case 'username':
                    setUsername(event.target.value);
                    break;
               case 'password':
                    setPassword(event.target.value)
                    break;

          }
     }

     const sendFormData = (event: any) => {
          event.preventDefault();
          props.handleFormData(
               {
                    username,
                    password
               }
          );
          setUsername("");
          setPassword("");
     }


     return (
          <div className={styles.loginForm}>
               <form action="submit" onSubmit={sendFormData}>
                    <div className={styles.formTitle}>
                         <h1>Login
                              <button className={styles.formSwitchBtn}
                                   onClick={props.switchForm}
                              >go to register</button>
                         </h1>
                    </div>
                    <div>
                         <label htmlFor="username">username</label>
                         <input type="text"
                              name="username"
                              id="username"
                              value={username}
                              onChange={handleInputs}
                         />
                    </div>
                    <div>
                         <label htmlFor="password">password</label>
                         <input type="text"
                              name="password"
                              id="password"
                              value={password}
                              onChange={handleInputs}
                         />
                    </div>
                    <button type="submit"> login</button>
               </form>
          </div>
     );
}

export default LoginForm;