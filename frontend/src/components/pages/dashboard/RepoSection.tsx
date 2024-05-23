import React, {useState, useEffect} from "react";
import Loading from '../../../assets/images/circle-loading.gif';
import Modal from "../../commons/Modal";
import formatDate from "../../utls/formatDate";

export default function RepoSection(props:any) {

    const [conversations, setConversations] = useState(props.conversations);

    useEffect(() => {
        setConversations(props.conversations);
    }, [props.conversations]);

    return (
        <>
            <section>
                <div className="sidebar-menu">
                    <div className="p-3">
                        Reportes
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="container">
                        <div className='row py-1 filtro'>
                            <div className='filtro-titulo-lg col-3'>
                                <span>Filtrar</span>
                            </div>
                            <div className="col-9 d-flex flex-column flex-md-row align-item-center justify-content-end">
                                {props.isModalOpen &&
                                    <Modal isOpen={props.isModalOpen} onClose={props.handleCloseModal} onAcept={props.handleAceptModal} title="Rango de fechas">
                                        <div className="row">
                                            <div className="col-6">
                                                <label className='font-weight-normal'>
                                                    <small>Desde:</small><br></br>
                                                    <input type='date' value={props.from} onChange={(e) => props.setFrom(e.target.value)} />
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <label className='font-weight-normal'>
                                                    <small>Hasta:</small><br></br>
                                                    <input type='date' value={props.to} onChange={(e) => props.setTo(e.target.value)} />
                                                </label>
                                            </div>
                                        </div>
                                    </Modal>
                                }
                                {props.period === 'rango' &&
                                    <div className='font-weight-normal pl-1' style={{ cursor: 'pointer', lineHeight: '35px', minWidth: '120px'}} onClick={(e) => props.handleOpenModal()} >
                                        <span className='text-capitalize' style={{ fontSize: '14px' }}>Desde: <b>{formatDate(props.from)}</b> Hasta: <b>{formatDate(props.to)}</b></span>
                                    </div>
                                }
                                <div className='px-3'>
                                    <select className='custom-select' disabled={props.clientSelected.length === 0 ? true : false} style={{ marginBottom: '0px' }} onChange={(event) => props.handleChangePeriod(event.target.value)}>
                                        <option value={"hoy"}>Hoy</option>
                                        <option value={"semana"}>Últ. 7 días</option>
                                        <option value={"mes"}>Últ. 30 días</option>
                                        <option value={"rango"}>Rango de Fechas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget-caja m-2 p-2">
                    {props.clientSelected.length === 0 ?
                        <span style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Seleccione un cliente.</span>
                    :
                        !props.isLoadConversations ?
                            props.conversations.length > 0 ?
                                <table className="table tableWrap table-striped">
                                    <thead>
                                        <tr>
                                        <th>Gestionado</th>
                                        <th>Id caso</th>
                                        <th>Teléfono</th>
                                        <th>DNI</th>
                                        <th>Grupo</th>
                                        <th>Orden</th>
                                        <th>Llamada</th>
                                        <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {conversations.map((conversation:any, index:number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{conversation.last_updated}</td>
                                                    <td>{conversation.case_uuid}</td>
                                                    <td>{conversation.phone}</td>
                                                    <td>{conversation.extra_metadata.dni ? conversation.extra_metadata.dni : "--"}</td>
                                                    <td>{conversation.extra_metadata.grupo ? conversation.extra_metadata.grupo : "--"}</td>
                                                    <td>{conversation.extra_metadata.orden ? conversation.extra_metadata.orden : "--"}</td>
                                                    <td>{conversation.case_duration}</td>
                                                    <td>
                                                        <p className={conversation.case_result.is_final === false ? "estado-fracaso" : "estado-exito" }> 
                                                            {conversation.case_result.name}
                                                        </p>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            :
                                <span style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No se encontraron resultados en la fecha asignada.</span>
                        :
                            <span style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img style={{ width: '130px' }} src={Loading} alt='' />

                            </span>
                    }
                </div>
            </section>
        </>
    )
}