import React from "react";

export default function Sidebar(props:any) {
    return (
        <>
            <section className=''>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-menu">
                        <div className="p-3">
                            Clientes
                        </div>
                        <div className="dropdown-divider"></div>
                        <ul className="sidebar-menu">
                            {props.clients.map((client:any, index:number)=> {
                            return  <li key={index} className={`sidebar-menu ${props.clientSelected === client.id && "active"}`}>
                                        <a className="cursor_pointer pl-3" onClick={(e) => props.handleChangeClient(client.id)}>
                                            <span style={{textTransform: "capitalize"}}>{client.name}</span>
                                        </a>
                                        <div className="dropdown-divider"></div>                                  
                                    </li>
                        })}
                        </ul>
                    </div>
                </nav>
            </section>
        </>
    )
}