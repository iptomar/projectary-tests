var unirest = require('unirest');

unirest.post('http://localhost:8080/user')
.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
.send(
  {
	"name": "dg",
	"external":  "12111",
	"type": "1",
	"email": "email3",
	"phone": "911234567",
	"password": "secret"
}
)
.end(function (response) {
  console.log(response.body);
});
