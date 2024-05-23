import React, {useEffect} from "react";
import restQueries from "./rest/RestQueries";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Footer from "./components/commons/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const rest = new restQueries();

function App() {
    useEffect(() => {
        if(!localStorage.getItem('token')){
            rest.login();
        }
    }, []);

    return(
        <div className="container-fluid p-0">
            <Dashboard/>
            <Footer/>
        </div>
    )
}

export default App;