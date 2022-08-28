import React, { useState } from "react";
import styles from "./FormContainer.module.css";
import { IFormData } from "./RegisterForm";

export interface ILoginFormProps {
     switchForm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
     handleLoginData(formData?: Partial<IFormData>): void;
}

function LoginForm({ handleLoginData, switchForm }: ILoginFormProps) {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");

     const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
          switch (event.target.name) {
               case 'username':
                    setUsername(event.target.value);
                    break;
               case 'password':
                    setPassword(event.target.value)
                    break;
          }
     }

     const sendFormData = (event: React.FormEvent) => {
          event.preventDefault();
          handleLoginData(
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
                                   onClick={switchForm}
                              >go to register</button>
                         </h1>
                    </div>
                    <div>
                         <label htmlFor="username">username</label>
                         <input type="text"
                              name="username"
                              id="username"
                              maxLength={15} minLength={5}
                              required={true}
                              value={username}
                              onChange={handleInputs}
                         />
                    </div>
                    <div>
                         <label htmlFor="password">password</label>
                         <input type="password"
                              name="password"
                              id="password"
                              autoComplete="on"
                              minLength={8}
                              required={true}
                              value={password}
                              onChange={handleInputs}
                         />
                    </div>
                    <button type="submit"> login</button>
                    <div className={styles.testTipsContainer}>
                         <p>Tips for test: username:1 / password:1</p>


                    </div>
               </form>
          </div>
     );
}

export default LoginForm;