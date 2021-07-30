import Anuncio_Auto from "./auto.js";

let autos = [];
let tablaFiltrada = [];

//#region Axios

const getAutosAxiosAsync = async () => {
  agregarSpinner();
  try {
    const { data } = await axios.get("http://localhost:5000/autos");
    autos = data;
  } catch (err) {
    console.error(err.response);
  } finally {
    eliminarSpinner();
  }
};

const altaAutoAxiosAsync = async (nuevoAuto) => {
  agregarSpinner();
  try {
    await axios.post("http://localhost:5000/autos", nuevoAuto);
  } catch (err) {
    console.error(err.response);
  } finally {
    eliminarSpinner();
  }
};

const updateAutoAxiosAsync = async (autoEditado) => {
  agregarSpinner();
  try {
    await axios.put(
      "http://localhost:5000/autos/" + autoEditado.id,
      autoEditado
    );
  } catch (err) {
    console.error(err.response);
  } finally {
    eliminarSpinner();
  }
};

const deleteAutoAxios = async (idDestino) => {
  agregarSpinner();
  try {
    await axios.delete("http://localhost:5000/autos/" + idDestino);
  } catch (err) {
    console.error(err.response);
  } finally {
    eliminarSpinner();
  }
};

//#endregion

//#region events

window.addEventListener("DOMContentLoaded", async () => {
  await getAutosAxiosAsync();

  document.forms[0].addEventListener("submit", handlerSubmit);

  document.addEventListener("click", handlerClick);

  if (autos.length > 0) {
    handlerLoadList(autos);
    autos.forEach((el) => {
      tablaFiltrada.push(el);
    });
  }

  cargarColumnasSeleccionadas();
});

//#endregion

//#region spinner region

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "image spinner");
  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner() {
  document.getElementById("spinner-container").innerHTML = "";
}

//#endregion

//#region handlers

async function handlerSubmit(e) {
  e.preventDefault();
  const frm = e.target;

  if (frm.id.value) {
    const AutoEditado = new Anuncio_Auto(
      parseInt(frm.id.value),
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      parseFloat(frm.precio.value),
      frm.cantPuertas.value,
      frm.cantKMs.value,
      frm.potencia.value
    );
    if (confirm("Confirma modificacion?")) {
      await updateAutoAxiosAsync(AutoEditado);
    }
  } else {
    const nuevoAuto = new Anuncio_Auto(
      Date.now(),
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      parseFloat(frm.precio.value),
      frm.cantPuertas.value,
      frm.cantKMs.value,
      frm.potencia.value
    );
    await altaAutoAxiosAsync(nuevoAuto);
  }
  limpiarFormulario(frm);
}

function handlerLoadList(e) {
  renderizarLista(crearTabla(e), document.getElementById("divLista"));
}

async function handlerClick(e) {
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    cargarFormulario(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);
    if (confirm("Confirma la Baja?")) {
      await deleteAutoAxios(id);
    }
    limpiarFormulario(document.forms[0]);
  } else if (e.target.matches("#btnFiltroTodos")) {
    filtroTodos(tablaFiltrada);
  } else if (e.target.matches("#btnFiltroAlquiler")) {
    filtroAlquiler(tablaFiltrada);
  } else if (e.target.matches("#btnFiltroVenta")) {
    filtroVenta(tablaFiltrada);
  } else if (e.target.matches("#cbTitulo")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbTitulo").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.titulo = autos.find((a) => a.id === auto.id).titulo;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "titulo");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbTransaccion")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbTransaccion").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.transaccion = autos.find((a) => a.id === auto.id).transaccion;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "transaccion");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbDescripcion")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbDescripcion").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.descripcion = autos.find((a) => a.id === auto.id).descripcion;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "descripcion");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbPrecio")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbPrecio").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.precio = autos.find((a) => a.id === auto.id).precio;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "precio");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbPuertas")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbPuertas").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.cantPuertas = autos.find((a) => a.id === auto.id).cantPuertas;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "cantPuertas");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbKilometros")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbKilometros").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.cantKMs = autos.find((a) => a.id === auto.id).cantKMs;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "cantKMs");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  } else if (e.target.matches("#cbPotencia")) {
    guardarColumnasSeleccionadas();
    if (document.getElementById("cbPotencia").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = auto;
        obj.potencia = autos.find((a) => a.id === auto.id).potencia;
        return obj;
      });
    } else {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "potencia");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  }
}

//#endregion

//#region creacion de la tabla

///crea la tabla completa
function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.setAttribute(
    "class",
    "table table-bordered table-striped table-hover table-responsive-md"
  );
  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));

  return tabla;
}

///crea el thead dinamicamente
function crearThead(item) {
  const thead = document.createElement("thead");
  thead.setAttribute("class", "table-dark");
  const tr = document.createElement("tr");

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      th.className = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

///crea el tbody dinamicamente
function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((item) => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = item[key];
        td.className = key;
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  return tbody;
}

function cargarColumnasSeleccionadas() {
  if(localStorage.getItem("columnas") !== null) {
    var columnas = JSON.parse(localStorage.getItem("columnas"));
    columnas.forEach((item) => {
      document.getElementById(item.name).checked = item.value;
    });

    if (!document.getElementById("cbTitulo").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "titulo");
        return obj;
      });
    }
    if (!document.getElementById("cbTransaccion").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "transaccion");
        return obj;
      });
    }
    if (!document.getElementById("cbPrecio").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "precio");
        return obj;
      });
    }
    if (!document.getElementById("cbPuertas").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "cantPuertas");
        return obj;
      });
    }
    if (!document.getElementById("cbKilometros").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "cantKMs");
        return obj;
      });
    }
    if (!document.getElementById("cbPotencia").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "potencia");
        return obj;
      });
    }
    if (!document.getElementById("cbDescripcion").checked) {
      tablaFiltrada = tablaFiltrada.map(function (auto) {
        const obj = _.omit(auto, "descripcion");
        return obj;
      });
    }
    handlerLoadList(tablaFiltrada);
  }

}

function guardarColumnasSeleccionadas() {
  const columnas = [];
  columnas.push({"name": "cbTitulo", "value": document.getElementById("cbTitulo").checked});
  columnas.push({"name": "cbTransaccion", "value" : document.getElementById("cbTransaccion").checked});
  columnas.push({"name": "cbDescripcion", "value" : document.getElementById("cbDescripcion").checked});
  columnas.push({"name": "cbPrecio", "value" : document.getElementById("cbPrecio").checked});
  columnas.push({"name": "cbPuertas", "value" : document.getElementById("cbPuertas").checked});
  columnas.push({"name": "cbKilometros", "value" : document.getElementById("cbKilometros").checked});
  columnas.push({"name": "cbPotencia", "value" : document.getElementById("cbPotencia").checked});
  localStorage.setItem("columnas", JSON.stringify(columnas));
}


//#endregion

//#region gestion de la lista

function renderizarLista(lista, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (lista) {
    contenedor.appendChild(lista);
  }
}

//#endregion

//#region gestion del form

function limpiarFormulario(frm) {
  frm.reset();
  document.getElementById("btnEliminar").classList.add("hidden");
  document.getElementById("btnSubmit").textContent = "Guardar Automovil";
  document
    .getElementById("btnSubmit")
    .classList.replace("btn-secondary", "btn-primary");

  document.forms[0].id.value = "";
}

function cargarFormulario(id) {
  const {
    titulo,
    transaccion,
    descripcion,
    precio,
    cantPuertas,
    cantKMs,
    potencia,
  } = autos.filter((p) => p.id === parseInt(id))[0];

  const frm = document.forms[0];

  frm.titulo.value = titulo;
  frm.transaccion.value = transaccion;
  frm.descripcion.value = descripcion;
  frm.precio.value = precio;
  frm.cantPuertas.value = cantPuertas;
  frm.cantKMs.value = cantKMs;
  frm.potencia.value = potencia;
  frm.id.value = id;

  document.getElementById("btnSubmit").textContent = "Modificar Automovil";
  document
    .getElementById("btnSubmit")
    .classList.replace("btn-success", "btn-secondary");
  document.getElementById("btnEliminar").classList.remove("hidden");
}

//#endregion

//#region gestion de filtros

function filtroTodos(lista) {
  document.getElementById("lblResultado").textContent = "N/A";
  document.getElementById("lblMaximo").textContent = "N/A";
  document.getElementById("lblMinimo").textContent = "N/A";
  document.getElementById("lblPotencia").textContent = "N/A";
  handlerLoadList(lista);
}
function filtroAlquiler(lista) {
  let listaFiltrada = lista.filter((x) => x.transaccion === "Alquiler");
  const precios = listaFiltrada.map((e) => autos.find((a) => a.id === e.id).precio);
  const potencias = listaFiltrada.map((e) => parseFloat(autos.find((a) => a.id === e.id).potencia));
  const lenPrecios = precios.length;
  const totalPrecios = precios.reduce((acc, el) => acc + el, 0);
  const totalPotencia = potencias.reduce((acc, el) => acc + el, 0);
  console.log(totalPotencia);
  const maximoPrecio = precios.reduce((acc, el) => {
    return (acc > el ? acc : el);
  });
  const minimoPrecio = precios.reduce((acc, el) => {
    return (acc < el ? acc : el);
  });
  const resultado = Math.round(totalPrecios / lenPrecios);
  const promedioPotencia = (totalPotencia / lenPrecios).toFixed(2);
  document.getElementById("lblResultado").textContent = "Prom: "+ resultado;
  document.getElementById("lblMaximo").textContent = "Max: " + maximoPrecio;
  document.getElementById("lblMinimo").textContent = "Min: " + minimoPrecio;
  document.getElementById("lblPotencia").textContent = "Pot: " + promedioPotencia;
  handlerLoadList(listaFiltrada);
}
function filtroVenta(lista) {
  let listaFiltrada = lista.filter((x) => x.transaccion === "Venta");
  const precios = listaFiltrada.map((e) => autos.find((a) => a.id === e.id).precio);
  const potencias = listaFiltrada.map((e) => parseFloat(autos.find((a) => a.id === e.id).potencia));
  const lenPrecios = precios.length;
  const totalPrecios = precios.reduce((acc, el) => acc + el, 0);
  const totalPotencia = potencias.reduce((acc, el) => acc + el, 0);
  const maximoPrecio = precios.reduce((acc, el) => {
    return (acc > el ? acc : el);
  });
  const minimoPrecio = precios.reduce((acc, el) => {
    return (acc < el ? acc : el);
  });
  const resultado = Math.round(totalPrecios / lenPrecios);
  const promedioPotencia = (totalPotencia / lenPrecios).toFixed(2);
  document.getElementById("lblResultado").textContent = "Prom: "+ resultado;
  document.getElementById("lblMaximo").textContent = "Max: " + maximoPrecio;
  document.getElementById("lblMinimo").textContent = "Min: " + minimoPrecio;
  document.getElementById("lblPotencia").textContent = "Pot: " + promedioPotencia;
  handlerLoadList(listaFiltrada);
}

//#endregion
