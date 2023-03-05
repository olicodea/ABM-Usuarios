const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const tableUsuarios = document.getElementById("table-usuarios");

const url = "http://localhost:3000/";

window.addEventListener("load", listarUsuarios);

async function listarUsuarios(event) {
    event.preventDefault();
    const res = await fetch(url);
    const usuarios = await res.json();
    let usuariosAMostrar = [];
    for (let i = 0; i < 5; i++) {
        usuariosAMostrar.push(usuarios[i]);
    }
    usuariosAMostrar.forEach((usuario) => {
        const { name, email, phone } = usuario;
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><p>${name}</p></td>
        <td><p>${email}</p></td>
        <td><p>${phone}</p></td>
    `;
        tbody.appendChild(tr);
    });
    tableUsuarios.classList.remove("d-none");
}

function agregarUsuario(event) {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const usuario = { nombre: nombre, email: email, phone: phone };
    fetch(url + "api/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    })
        .then((response) => response.json())
        .then((data) => {
            const { nombre, email, phone } = data;

            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;
            tbody.appendChild(tr);
            event.target.reset();
        })
        .catch((err) => {
            console.error(err);
        });
}

document
    .getElementById("formulario")
    .addEventListener("submit", agregarUsuario);
