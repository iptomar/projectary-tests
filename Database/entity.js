var utils = new (require('./utils.js'))();

class Entity {

  constructor() {
    this.entities = [""];
    this.nEntities = 2000;
  }

  genEntity() {
    for (var i = 0; i <= this.nEntities; i++) {
      this.entities[i] = {
        name: 'Entity' + i,
        type: utils.genType(),
        extid: i
      }
      // console.log(this.entities[i]);
    }

    console.log("Generated Entities");
  }

  insertEntity(connection) {
    var entities = this.entities;
    // Insert new entities ---------------------------------------------------------
    for (var i = 0; i < entities.length; i++) {
      connection.query('CALL InsertNewEntity(?,?,?);',
        [entities[i].name, entities[i].type, entities[i].extid], function (error, results, fields) {
          if (error) throw error;
        });
    }
    console.log("Inserted Entities");
  }

}

module.exports = Entity;
