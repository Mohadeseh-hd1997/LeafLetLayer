import UsePhotos from "../src/Hook/UsePhotos";

export default db = function () {
  var DB_NAME = "PWA-TEST";
  var TABLE_NAME = "NOTES";
  // Open DataBase
  var DB_PROMISE = idb.open(DB_NAME, 1, function (db) {
    if (!db.objectStoreNames.contains(TABLE_NAME)) {
      db.createObjectStore(TABLE_NAME, {
        keypath: "id",
      });
    }
  });

  // Write Data table
  var WriteNote = function (data) {
    return DB_PROMISE.then(function (db) {
      var tx = db.transaction(TABLE_NAME);
      var store = tx.objectStore(TABLE_NAME);
      store.put(data);
      return tx.complete;
    });
  };

  // Fetch APi and Store
  fetch(UsePhotos)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (var key in data) {
        WriteNote(data[key]).then(function () {
          console.log("Done Api Put In Db");
        });
      }
    });

  // Get Data From Table INdexDB with ID

  var getNote = function (id) {
    return db.promise.then(function (db) {
      var tx = db.transaction(TABLE_NAME, "redwrite");
      var store = tx.objectStore(TABLE_NAME);
      return store.get(id);
    });
  };

  // read all data
  var ReadAllData = function () {
    return db.promise.then(function (db) {
      var tx = db.transaction(TABLE_NAME, "ready");
      var store = tx.objectStore(TABLE_NAME);
      return store.getAll();
    });
  };

  // Delete a Data From Table
  var deleteNote = function (id) {
    return db.promise.then(function (db) {
      var tx = transaction(TABLE_NAME, "readwrite");
      var store = tx.objectStore(TABLE_NAME);
      store.delete(id);
    });
  };

  // Clear Table

  var ClearAll = function () {
    return DB_PROMISE.then(function (db) {
      var tx = db
        .transaction(TABLE_NAME, "readonly")
        .objectStore(TABLE_NAME)
        .clear();
      return tx.complete;
    });
  };

  return {
    getNote: getNote,
    WriteNote: WriteNote,
    ReadAllData: ReadAllData,
    ClearAll: ClearAll,
    deleteNote: deleteNote,
  };
};
