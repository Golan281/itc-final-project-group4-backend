//helper to send JSON on postman

const formatted = JSON.stringify({
    firstName: 'Adam',
    lastName: 'Eve',
    email: 'adam@eve.bible',
    password: '102244',
    repassword: '102244',
  });
console.log(formatted)
