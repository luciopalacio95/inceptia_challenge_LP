
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";
import RepoSection from "./RepoSection";
import moment from 'moment';

function Dashboard() {
    const [clients, setClients] = useState([]);
    const [isLoadClients, setIsLoadClients] = useState(true); 
    const [clientSelected, setClientSelected] = useState("");
    const [conversations, setConversations] = useState([]);
    const [isLoadConversations, setIsLoadConversations] = useState(true);
    const [period, setPeriod] = useState("hoy");
    const [from, setFrom] = useState(moment().utcOffset(0, true).format('YYYY-MM-DD'));
    const [to, setTo] = useState(moment().utcOffset(0, true).format('YYYY-MM-DD'));
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    useEffect(() => {
        getClients();
    }, []);

    function getClients() {
        let token = localStorage.getItem('token');
        fetch(process.env.REACT_APP_API_URL+ "/clients/", {
            method: "GET",
            headers: 
                {
                    "Content-type": "application/json",
                    "authorization": `JWT ${token}`
                }
        })
        .then(response => response.json())
        .then(json => {
            setClients(json);
        })
        .finally(() => {
            setIsLoadClients(false);
        })
        .catch(err => console.log(err));
    }

    function getClientsConversations(clientId: number, from: string, to: string) {
        let token = localStorage.getItem('token');
        setIsLoadConversations(true);
        fetch(process.env.REACT_APP_API_URL+ "/inbound-case/?bot="+clientId+"&local_updated__date__gte="+from+"&local_updated__date__lte="+to, {
            method: "GET",
            headers: 
                {
                    "Content-type": "application/json",
                    "authorization": `JWT ${token}`
                }
        })
        .then(response => response.json())
        .then(json => {
            setConversations(json.results);
        })
        .finally(() => {
            setIsLoadConversations(false);
        })
        .catch(err => console.log(err));
    }
    
    function handleChangeClient(clientId:any){
        setClientSelected(clientId);
        getClientsConversations(clientId, from, to)
    }

    function handleChangePeriod(period:string){
        setPeriod(period);
        var fromDate = "";
        var toDate = "";
        switch (period) {
            case "hoy":
                fromDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
                toDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
            break;
            case "semana":
                fromDate = moment().subtract(7, 'd').utcOffset(0, true).format('YYYY-MM-DD');
                toDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
            break;
            case "mes":
                fromDate = moment().subtract(30, 'd').utcOffset(0, true).format('YYYY-MM-DD');
                toDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
            break;
            case "rango":
                handleOpenModal();
            break;
            default:
                fromDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
                toDate = moment().utcOffset(0, true).format('YYYY-MM-DD');
            break;
        }
        if(period !== "rango"){
            setFrom(fromDate);
            setTo(toDate);
            getClientsConversations(Number(clientSelected),fromDate,toDate);
        }
    }
    function handleAceptModal(){
        getClientsConversations(Number(clientSelected), from, to);
        handleCloseModal();
    }

    return(
        <div className="container-fluid">
            {!isLoadClients &&
                <div className="row">
                    <div className="col-2 p-0">
                        <Sidebar clients={clients} clientSelected={clientSelected} handleChangeClient={handleChangeClient}/>
                    </div>
                   <div className="col-10 p-0">
                        <RepoSection 
                            clientSelected={clientSelected}
                            conversations={conversations}
                            isLoadConversations={isLoadConversations}
                            period={period}
                            handleChangePeriod={handleChangePeriod}
                            from={from}
                            setFrom={setFrom}
                            to={to}
                            setTo={setTo}
                            isModalOpen={isModalOpen}
                            handleOpenModal={handleOpenModal}
                            handleCloseModal={handleCloseModal}
                            handleAceptModal={handleAceptModal}
                        />
                    </div>
                </div>
            }
        </div>
             
    )
}

export default Dashboard;