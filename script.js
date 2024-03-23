document.addEventListener("DOMContentLoaded", function() {
    const userTableContainer = document.getElementById("userTableContainer");
    const getUsersBtn = document.getElementById("getUsersBtn");
  
    // Función para mostrar los datos en una tabla y en la consola
    const renderUsersData = (users) => {
      // Mostrar en la consola
      console.log("Datos de usuarios:", users);
  
      // Mostrar en una tabla en el DOM
      const table = document.createElement("table");
      table.classList.add("table");
      table.innerHTML = `
        <thead style="color: #D29A5A;">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo electrónico</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody style="color: #D29A5A;">
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.first_name} ${user.last_name}</td>
              <td>${user.email}</td>
              <td><img src="${user.avatar}" class="rounded-circle" style="width: 50px; height: 50px;"></td>
            </tr>
          `).join('')}
        </tbody>
      `;
      userTableContainer.innerHTML = '';
      userTableContainer.appendChild(table);
    };
  
    // Función para realizar la solicitud GET al servidor
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?delay=3');
        const data = await response.json();
        const users = data.data;
  
        // Guardar en localStorage con la fecha y hora de la solicitud
        localStorage.setItem('userData', JSON.stringify({ users, timestamp: new Date().getTime() }));
        
        renderUsersData(users);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
  
    // Evento click del botón para obtener usuarios
    getUsersBtn.addEventListener("click", () => {
      fetchUsers();
    });
  
    // Verificar si existen datos en localStorage y si han pasado menos de 1 minuto
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && (new Date().getTime() - userData.timestamp < 60000)) {
      renderUsersData(userData.users);
    }
  });
  