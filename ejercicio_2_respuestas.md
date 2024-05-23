## 2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)

- No se aprendi a utilizar redux por el momento.

## 2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

- Agregaría la dependencia de "react-router-dom" para el manejo de rutas
- En el archivo index.js importaría {BrowserRouter as Router, Routes, Route},  
 luego modificaría el ReactDom para que quede de la siguiente manera:  
ReactDOM.render(  
  <Router>
    <Routes>
      <Route path='/' element={<Dashboard/>} />  
      <Route path='/About' element={<About/>} />  
    </Routes>  
  </Router>  
  ,document.getElementById("root")  
);  
Entre los componentes Routes y Router podemos agregar los componentes layout, por ejemplo el Footer,  
para que sea visible globalmente en nuestro sitio:  
    '</Routes>'  
        '<Footer/>'  
    '</Router>'
