var entities = [""];
var nEntities = 2000;

function genEntity(){
	for(var i = 0; i<= nEntities; i++){
		entities[i] = {
			name: 'Entity' + i,
			type: proj.genType(),
			extid: i
		}
		console.log(entities[i]);
	}
}

connection.connect();
// Insert new entities ---------------------------------------------------------
for(var i = 0; i < users.length; i++){
	connection.query('CALL InsertNewEntity(?,?,?);',
	[users[i].name, users[i].type, users[i].extid], function (error, results, fields) {
	  if (error) throw error;
	});
}
connection.end();
