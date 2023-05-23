let currPage = 1;

async function fetchContactsFromJson() {

    const response = await fetch('https://boverhill.github.io/data.json');
    const myData = await response.json();
    console.log(myData);

    const users = myData.users;
    const total_Pages = Math.ceil(users.length / 10);

    const totalContactsElement = document.getElementById('total_Contacts');
    totalContactsElement.textContent = `Total: ${users.length}`;

    function myContacts(page) {
      const beginning = (page - 1) * 10;
      const ending = beginning + 10;
      const userDisplay = users.slice(beginning, ending);

      const contactList = document.getElementById('contactList');
      contactList.innerHTML = '';

      userDisplay.forEach(user => {
        const userList = document.createElement('li');
        userList.className = 'contact-item cf';


        // name, avatar = image, joined 
        userList.innerHTML = `
          <div class="contact-details">
            <img class="avatar" src="${user.image}">
            <h3>${user.name}</h3>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${user.joined}</span>
          </div>
        `;

        contactList.appendChild(userList);
      });
    }

    function userPagination() {
      const pagDiv = document.getElementById('pagination');
      pagDiv.innerHTML = '';

      for (let i = 1; i <= total_Pages; i++) {
        const pButton = `<button type="button">${i}</button>`;
        pagDiv.insertAdjacentHTML('beforeend', pButton);
      }

      pagDiv.addEventListener('click', (event) => {
        if (event.target.matches('button')) {
          currPage = parseInt(event.target.textContent);
          myContacts(currPage);
        }
      });
    }

    myContacts(currPage);
    userPagination();

}

fetchContactsFromJson();
