const DATABASE_NAME = 'DCHeroes';
const OBJECT_STORE_NAME = 'heroes';

export const saveData = heroes => {
  if (!window.indexedDB) {
    console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    return;
  }
  // Let us open our database
  const request = window.indexedDB.open(DATABASE_NAME, 2);

  request.onerror = event => {
    console.error("IndexedDB error: ", event.target.errorCode);
  };

  request.onupgradeneeded = event => {
    const db = event.target.result;
    // Create an objectStore to hold information about our heroes. We're
    // going to use "id" as our key path because it's guaranteed to be unique
    // if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
    const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });

    // Creation of indexes (data of the heroes)
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("name", "name", { unique: true });
    objectStore.createIndex("photo", "photo", { unique: false }); // replace this by Blob
    objectStore.createIndex("realName", "realName", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex("height", "height", { unique: false });
    objectStore.createIndex("weight", "weight", { unique: false });
    // }

    // console.log(db);

    // Use transaction oncomplete to make sure the objectStore creation is 
    // finished before adding data into it.
    objectStore.transaction.oncomplete = () => {
      const heroObjectStore = db.transaction([OBJECT_STORE_NAME], "readwrite").objectStore(OBJECT_STORE_NAME);
      heroes.forEach(hero => heroObjectStore.add(hero));
    };
  };
};

export const getHeroes = () => {
  const IdDB = window.indexedDB.open(DATABASE_NAME, 2);

  return IdDB.onsuccess = event => {
    const db = event.target.result;
    const objectStore = db.transaction([OBJECT_STORE_NAME]).objectStore(OBJECT_STORE_NAME);
    return objectStore.getAll();
  }
};
