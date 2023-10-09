const appendClientBtn = document.getElementsByClassName('btn-append')[0]; //кнопка "Добавить клиента"
const newClientForm = document.getElementById('new-client-form'); //форма добавления нового клиента
const deleteForm = document.getElementById('delete-form');
const editForm = document.getElementById('edit-form');
const appendFormCloseBtn = newClientForm.getElementsByClassName('close-btn')[0] //крестик в форме добавить нового клиента
const appendFormCancelBtn = newClientForm.getElementsByClassName('cancel-btn')[0]; //"отмена" в форме добавления нового клиента
const body = document.getElementsByTagName('body')[0];//вся страница
const popupFade = document.createElement('div');//создание затемняющего элемента модального окна
popupFade.classList.add("popup-fade");//создание затемняющего элемента модального окна
const surnameValue = newClientForm.getElementsByClassName('surname')[0];
const nameValue = newClientForm.getElementsByClassName('name')[0];
const lastNameValue = newClientForm.getElementsByClassName('lastname')[0];
const tableBody = document.getElementById('main-table').querySelector('.main-table__body');
const nullTableBody = document.querySelector('.null-body');// пустое тело таблицы с загрузкой
const contactAdditionNew = newClientForm.querySelector('.client-form__add-contact-btn');
const contactsAreaNew = newClientForm.getElementsByClassName('client-form__add-contact-area')[0];
const deleteFormCloseBtn = deleteForm.getElementsByClassName('close-btn')[0];
const deleteFormCancelBtn = deleteForm.getElementsByClassName('cancel-btn')[0];
const editFormCloseBtn = editForm.getElementsByClassName('close-btn')[0];
const formId = editForm.getElementsByClassName('edit-form__id')[0];
const surnameChangeValue = editForm.getElementsByClassName('surname')[0];
const nameChangeValue = editForm.getElementsByClassName('name')[0];
const lastNameChangeValue = editForm.getElementsByClassName('lastname')[0];
const contactsAreaEdit = editForm.getElementsByClassName('client-form__add-contact-area')[0];
const contactAdditionEdit = editForm.getElementsByClassName('client-form__add-contact-btn')[0];
const editFormDeleteBtn = editForm.getElementsByClassName('cancel-btn')[0];
const sendChangeBtn = editForm.getElementsByClassName('send-btn')[0];
const idBtn = document.querySelector('.main-table__id-btn');
const fioBtn = document.querySelector('.main-table__fio-btn');
const createdBtn = document.querySelector('.main-table__created-btn');
const editedBtn = document.querySelector('.main-table__edited-btn');
const search = document.querySelector('.header__input');
const nullDB = document.createElement('div');
nullDB.classList.add('message')
nullDB.textContent = 'В базе данных пусто. Добавьте хотя бы 1 клиента.'


function newContact() {
  let contactForm = document.createElement('div');
  contactForm.classList.add('flex');
  contactForm.classList.add('client-form__contact');
  let selectWrapper = document.createElement('div');
  let contactSelect = document.createElement('select');
  selectWrapper.append(contactSelect);
  selectWrapper.classList.add('select-wrapper')
  let contactData = document.createElement('input');
  const mobile = window.matchMedia('(max-width: 480px)')
  if(mobile.matches) {
    contactData.placeholder = 'Введите данные';
  }
  else {
    contactData.placeholder = 'Введите данные контакта';
  }
  const contactSelectOption1 = document.createElement('option');
  const contactSelectOption2 = document.createElement('option');
  const contactSelectOption3 = document.createElement('option');
  const contactSelectOption4 = document.createElement('option');
  const contactSelectOption5 = document.createElement('option');
  

  contactSelect.form = 'new-client-form';
  contactData.form = 'new-client-form';
  
  contactSelectOption1.textContent = 'Телефон';
  contactSelectOption2.textContent = 'Email';
  contactSelectOption3.textContent = 'Facebook';
  contactSelectOption4.textContent = 'VK';
  contactSelectOption5.textContent = 'Другое';
  
  contactSelect.append(contactSelectOption1, contactSelectOption2, contactSelectOption3, contactSelectOption4, contactSelectOption5)
  
  contactForm.append(selectWrapper);

  selectWrapper.addEventListener('click', function() {
    selectWrapper.classList.toggle('is-active');
  })

  contactForm.append(contactData);
  console.log(contactData.parentElement.getElementsByTagName('select'))
  let formContactDelete = document.createElement('button');
  formContactDelete.innerHTML = '<svg fill="#B0B0B0" id="cancel-contact" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_224_6681)"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/></g><defs><clipPath id="clip0_224_6681"><rect width="16" height="16"/></clipPath></defs></svg>'
  formContactDelete.classList.add('client-form__contact-close');
  formContactDelete.setAttribute('aria-label', 'Удалить контакт')
  contactForm.append(formContactDelete);
  formContactDelete.addEventListener('click', function(contactDelete) {
    contactDelete.preventDefault();
    formContactDelete.parentElement.remove();
    let contactsForm = contactsAreaEdit.getElementsByClassName('client-form__contact')
    if(contactsForm.length <= 10) {
      contactAdditionEdit.style = 'display:flex'
    }
  })
  return contactForm;
}


async function addClient(contact) {
  let response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(contact)
    })
    if (!response.ok) {
      errorDiv(response.statusText);
    }
}


async function editClient(id, contact) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(contact)
    })
    if (!response.ok) {
      errorDiv(response.statusText);
    }
}


async function deleteClientFromServer(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    })
    if (!response.ok) {
      errorDiv(response.statusText);
    }
}

const allClients = async function allClientsOnServer() {
  const response = await fetch('http://localhost:3000/api/clients/')
  const data = await response.json()
  if (!response.ok) {
    errorDiv(response.statusText);
  }
  return await data
}

function errorDiv(errorText) {
  const errorDiv = document.createElement('div');
  errorDiv.textContent = `Ошибка: ${errorText}`
  setTimeout(function(){popupFade.remove()}, 500)
  popupFade.style.animation = 'MinOpacity .5s ease-in-out';
  document.getElementById('main').innerHTML = '';
  errorDiv.classList.add('error');
  document.getElementById('main').append(errorDiv);
}

async function findElements(arr, searchEl) {
  let ser = (await arr).filter((el) => {return(el.name.toLowerCase().includes(searchEl.toLowerCase()) || el.surname.toLowerCase().includes(searchEl.toLowerCase()) || el.lastName.toLowerCase().includes(searchEl.toLowerCase()) || el.id.toLowerCase().includes(searchEl.toLowerCase()))} )
  renderClients(ser)
}


let awaitSearch; 
search.addEventListener('input', async() => {
  clearTimeout(awaitSearch);
  awaitSearch = setTimeout(findElements, 300, allClients(), search.value.toLowerCase());
})

function openForm(event, formName) {
  event.preventDefault();
  popupFade.style.animation = 'MaxOpacity .5s ease-in-out'
  body.appendChild(popupFade);
  makeVisible(formName);
}

function closeForm(event, formName) {
  event.preventDefault();
  setTimeout(function(){popupFade.remove()}, 500)
  popupFade.style.animation = 'MinOpacity .5s ease-in-out'
  makeInvisible(formName);
}

function appendContactToCell(socialName, tableEl) {
  const contactPopupDiv = document.createElement('div');
  contactPopupDiv.setAttribute('tabindex', 0)
  contactPopupDiv.setAttribute('aria-label', `${el.type} ${el.value}`)
  contactPopupDiv.classList.add('main-table__contact');
  const popUp = document.createElement('span');
  popUp.classList.add('popup');
  tableEl.append(contactPopupDiv);
  if(socialName === 'fb') {
    contactPopupDiv.innerHTML = '<svg id="fb" width="16" height="16" fill="#9873FF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" /></g></svg>'
  }
  if(socialName === 'mail') {
    contactPopupDiv.innerHTML = '<svg id="mail" width="16" height="16" fill="#9873FF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z"/></svg>'
  }
  if(socialName === 'vk') {
    contactPopupDiv.innerHTML = '<svg id="vk" width="16" height="16" fill="#9873FF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z"/></g></svg>'
  }
  if(socialName === 'phone') {
    contactPopupDiv.innerHTML = '<svg id="phone" width="16" height="16" fill="#9873FF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g><circle cx="8" cy="8" r="8" /><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>'
  }
  if(socialName === 'contact') {
    contactPopupDiv.innerHTML = '<svg id="contact" width="16" height="16" fill="#9873FF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z"/></svg>'
  }
  
  contactPopupDiv.append(popUp);
  popUp.textContent = `${el.type}: ${el.value}`;
}


document.addEventListener('click', function(el) {
  if(el.target === popupFade) {
    makeInvisible(editForm);
    makeInvisible(deleteForm);
    makeInvisible(newClientForm)
    setTimeout(function(){popupFade.remove()}, 500)
    popupFade.style.animation = 'MinOpacity .5s ease-in-out'
  }
})

function preloaderFunc() {
  if(preloader !== true) {
    nullTableBody.style = 'display:none';
  }
  else {
    nullTableBody.style = 'display:block';
  }
}


let preloader = true;
async function renderClients(arr) {
  tableBody.innerHTML = '';
  if((await arr).length === 0) {
    nullTableBody.innerHTML = '';
    nullTableBody.append(nullDB)
    preloader = false;
    return;
  }
  preloader = true;
  preloaderFunc()
  setTimeout(async function() {
    for (row of (await arr)) {
      let newRow = document.createElement('tr');
      newRow.classList.add('main-table__row');
      tableBody.append(newRow);
      let id = document.createElement('td');
      id.classList.add('main-table__id-cell');
      id.classList.add('main-table__cell');
      let fio = document.createElement('td');
      fio.classList.add('main-table__cell');
      let createdDate = document.createElement('td');
      createdDate.classList.add('main-table__cell');
      let createdDateTime = document.createElement('span');
      createdDateTime.classList.add('main-table__created-time')
      let createdDateDate = document.createElement('span');
      let lastChanges = document.createElement('td');
      lastChanges.classList.add('main-table__cell');
      let lastChangesTime = document.createElement('span');
      lastChangesTime.classList.add('main-table__changes-time')
      let lastChangesDate = document.createElement('span');
      let contacts = document.createElement('td');
      contacts.classList.add('main-table__cell');
      contacts.classList.add('main-table__contacts-cell');
      let actions = document.createElement('td');
      actions.classList.add('main-table__cell');
      actions.classList.add('main-table__actions-cell');
      let changeBtn = document.createElement('button');
      let deleteBtn = document.createElement('button');
  
      id.textContent = row.id;
      fio.textContent = (row.surname +' ' + row.name +' ' + row.lastName).trim();
  
      createdDateDate.textContent = `${new Date(row.createdAt).toLocaleDateString()} `;
      createdDateTime.textContent = new Date(row.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      createdDate.append(createdDateDate);
      createdDate.append(createdDateTime);
  
  
      lastChangesDate.textContent = `${new Date(row.updatedAt).toLocaleDateString()} `;
      lastChangesTime.textContent = new Date(row.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      lastChanges.append(lastChangesDate);
      lastChanges.append(lastChangesTime);
      
      for (el of row.contacts) {
        if (el.type === 'VK') {
          appendContactToCell('vk', contacts);
        }
        else if (el.type === 'Facebook') {
          appendContactToCell('fb', contacts);
        }
        else if (el.type === 'Телефон') {
          appendContactToCell('phone', contacts);
        }
        else if (el.type === 'Email') {
          appendContactToCell('mail', contacts);
        }
        else if (el.type === 'Другое') {
          appendContactToCell('contact', contacts);
        }
      }
      let showMoreContacts = document.createElement('div');
      let showMoreContactsText = document.createElement('span');
      showMoreContacts.innerHTML = '<svg id="show-more" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7.5" stroke="#9873FF"/></svg>'
      showMoreContacts.setAttribute('tabindex', 0)
      showMoreContacts.classList.add('main-table__contacts-more');
      
      showMoreContactsText.classList.add('main-table__contacts-more-text')
  
      showMoreContacts.append(showMoreContactsText);
      if(contacts.children.length > 5) { 
        let count = contacts.children.length;
        while(count >= 5) {
          contacts.children.item(count-1).classList.add('display-none');
          count--;
        }
        showMoreContactsText.textContent = `+${contacts.children.length - 4}`
        contacts.children.item(3).after(showMoreContacts)
        showMoreContacts.addEventListener('click', () => {
          showMoreContacts.classList.add('display-none');
          count = contacts.children.length
          while(count > 5) {
            contacts.children.item(count-1).classList.remove('display-none');
            count--;
          }
        })
      }
  
      changeBtn.textContent = 'Изменить';
      changeBtn.classList.add('change-btn');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = 'Удалить';
  
      actions.append(changeBtn);
      actions.append(deleteBtn);

      preloader = false;
      preloaderFunc();
  
      newRow.append(id, fio, createdDate, lastChanges, contacts, actions);
  
      deleteBtn.addEventListener('click', function() {
        openForm(event, deleteForm);
        deleteForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          deleteClientFromServer(deleteBtn.parentElement.parentElement.childNodes[0].textContent);
        })
      })
  
      // при нажатии на кнопку "Изменить"
  
      changeBtn.addEventListener('click', async function() {
        openForm(event, editForm);
  
        // при нажатии на кнопку "Удалить клиента" в форме изменения клиента
        editFormDeleteBtn.addEventListener('click', function() {
          makeInvisible(editForm);
          openForm(event, deleteForm);
  
          // при подтвеждении удаления в форме "Изменить"
          deleteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            deleteClientFromServer(changeBtn.parentElement.parentElement.childNodes[0].textContent)
          })
        })
  
        // заполнение формы данными клиента
        const changingId = changeBtn.parentElement.parentElement.childNodes[0].textContent;
        formId.textContent = `ID: ${changingId}`;
  
        const changingClient = ((await arr).find(el => el.id == changingId));
        nameChangeValue.value = changingClient.name;
  
        surnameChangeValue.value = changingClient.surname;
        lastNameChangeValue.value = changingClient.lastName;
        contactsAreaEdit.querySelectorAll('.client-form__contact').forEach( item => item.remove());
        if(changingClient.contacts.length > 0) {
          let i = 0;
          for(item of changingClient.contacts) {
            contactAdditionEdit.before(newContact());
            contactForm = contactsAreaEdit.getElementsByClassName('client-form__contact')[i];
  
            let contactSelect = contactForm.querySelector('select');
            contactSelect.value = item.type;
            let contactInput = contactForm.querySelector('input');
            contactInput.value = item.value;
            i++;
          }
          contactAdditionEdit.addEventListener('click', function() {
            newContactItem(event, editForm, contactsAreaEdit, contactAdditionEdit)
          })
        }
  
        // при нажатии на кнопку "Сохранить" в форме изменения клиента
        sendChangeBtn.addEventListener('click', function(b) {
          b.preventDefault();
          let contactForm = contactsAreaEdit.getElementsByClassName('client-form__contact');
          const editedContacts = []
          for(let editedContact of contactForm) {
            let editedContactRes = {type: editedContact.querySelector('select').value,
              value: editedContact.querySelector('input').value}
              editedContacts.push(editedContactRes)
          }
          const editedClient = {name: nameChangeValue.value, surname: surnameChangeValue.value, lastName: lastNameChangeValue.value, contacts: editedContacts};
          editClient(changingId, editedClient);
          makeInvisible(editForm);
        })
      })
    }
  }, 1000)
}

function makeInvisible(el) {
  el.classList.remove('visible');
  el.classList.add("invisible");
}

function makeVisible(el) {
  el.classList.remove('invisible');
  el.classList.add("visible");
}

newClientForm.addEventListener('submit', async function(toServer) {
  toServer.preventDefault();
  let contacts = document.querySelectorAll('.client-form__contact');
  const contactsArray = [];
  for (el of contacts) {
    let elSelect = el.querySelector('select').value
    let elContactInput = el.querySelector('input').value
    if (elContactInput.length > 0) {
      contactsArray.push({ type: elSelect, value: elContactInput })
    }
  }
  const newContact = { name: nameValue.value, surname: surnameValue.value, lastName: lastNameValue.value, contacts: contactsArray }
  addClient(newContact);
  toServer.target.reset();
  for (form of contacts) {
    form.remove()
  }
})

async function sorting(data, param, direction = true) {
  let res = data.sort(function(a, b) {
    let dirIf = a[param] < b[param];
    if(direction == true) dirIf = a[param] > b[param];
    if (dirIf == true) return -1
  })
  return res
}

let dirId = true;

idBtn.addEventListener('click', async () => {
  dirId = !dirId;
  let all = await allClients();
  all.forEach(el => el.id = Number(el.id));
  let sorted = await sorting(all, 'id', dirId)
  if(sorted[0]['id'] > sorted[sorted.length - 1]['id']) {
    idBtn.querySelector('svg').classList.add('rotated')
  }
  else {
    idBtn.querySelector('svg').classList.remove('rotated')
  }
  renderClients(sorted);
}) 

let dirCreated = true;

createdBtn.addEventListener('click', async () => {
  dirCreated = !dirCreated;
  let all = await allClients();
  all.forEach(el => el.createdAt = new Date(el.createdAt));
  let sorted = await sorting(all, 'createdAt', dirCreated)
  if(sorted[0]['createdAt'] > sorted[sorted.length - 1]['createdAt']) {
    createdBtn.querySelector('svg').classList.add('rotated')
  }
  else {
    createdBtn.querySelector('svg').classList.remove('rotated')
  }
  renderClients(sorted);
}) 

let dirEdited = true;

editedBtn.addEventListener('click', async () => {
  dirEdited = !dirEdited;
  let all = await allClients();
  all.forEach(el => el.updatedAt = new Date(el.updatedAt));
  let sorted = await sorting(all, 'updatedAt', dirEdited)
  if(sorted[0]['updatedAt'] > sorted[sorted.length - 1]['updatedAt']) {
    editedBtn.querySelector('svg').classList.add('rotated')
  }
  else {
    editedBtn.querySelector('svg').classList.remove('rotated')
  }
  renderClients(sorted);
}) 

let dirFio = true;

fioBtn.addEventListener('click', async () => {
  dirFio = !dirFio;
  let all = await allClients();
  all.forEach(el => el.fio = el.surname + ' ' + el.name +  ' ' + el.lastname)
  let sorted = await sorting(all, 'fio', dirFio)
  if(sorted[0]['fio'] > sorted[sorted.length - 1]['fio']) {
    fioBtn.querySelector('svg').classList.add('rotated')
    fioBtn.querySelector('.main-table__fio-letters').textContent = 'Я-А';
  }
  else {
    fioBtn.querySelector('svg').classList.remove('rotated')
    fioBtn.querySelector('.main-table__fio-letters').textContent = 'А-Я';
  }
  renderClients(sorted);
}) 

function newContactItem(event, formName, contactsArea, btn) {
  event.preventDefault();
  newContact();
  let contact = formName.getElementsByClassName('client-form__contact');
  if(contactsArea.children.length >= 2) { //добавлять новую строку формы только если предыдущая заполнена
    if (contact[contact.length - 1].querySelector('input').value){
      if(contact[contact.length - 1].querySelectorAll('span').length > 0) {
        contact[contact.length - 1].querySelector('span').remove()
      }
      btn.before(newContact())
      if (contactsArea.children.length >= 10) btn.style = 'display: none';
    }
    else {
      const nullInput = document.createElement('span');
      nullInput.textContent = 'Введите данные!';
      nullInput.style = 'position:absolute; color:red; top:40px';
      if(contact[contact.length - 1].querySelectorAll('span').length === 0) {
        contact[contact.length - 1].append(nullInput)
      }
    }
  }
  else {
    btn.before(newContact())
  }
}

    
contactAdditionNew.addEventListener('click', function() {
  newContactItem(event, newClientForm, contactsAreaNew, contactAdditionNew)
})

appendClientBtn.addEventListener('click', function() {
  openForm(event, newClientForm);
  for (el of newClientForm.getElementsByTagName('input')) {
    el.value = '';
  };
  document.querySelectorAll('.client-form__contact').forEach( item => item.remove())
  contactAdditionNew.style = 'display:flex'
})

appendFormCloseBtn.addEventListener('click', function() {
  closeForm(event, newClientForm);
})

appendFormCancelBtn.addEventListener('click', function() {
  closeForm(event, newClientForm);
});

deleteFormCloseBtn.addEventListener('click', function() {
  closeForm(event, deleteForm);
})

editFormCloseBtn.addEventListener('click', function() {
  closeForm(event, editForm);
})

deleteFormCancelBtn.addEventListener('click', function() {
  closeForm(event, deleteForm);
})


document.addEventListener('DOMContentLoaded', async () => {
  dirId = !dirId;
  let all = await allClients();
  all.forEach(el => el.id = Number(el.id));
  renderClients(sorting(all, 'id', dirId));
})