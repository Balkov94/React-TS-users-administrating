
import Header from './Components/Header/Header';
import style from "./app.module.css"
import Footer from './Components/Footer/Footer';
import FormContainer from './Components/FormContainer/FormContainer';

// add here all components composition 

function App() {
     return (
          <div className={style.mainAppDiv}>
               <Header></Header>
               <FormContainer></FormContainer>
              
               {/* <Footer></Footer>        */}
          </div>

     );
}

export default App;



