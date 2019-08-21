const DATABASE_NAME = 'DCHeroes';
const OBJECT_STORE_NAME = 'heroes';

export const createDataBase = heroes => {
  if (!window.indexedDB) {
    console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    return;
  }
  // Let us open our database
  const request = window.indexedDB.open(DATABASE_NAME, 2);

  request.onerror = () => {
    console.log('Error: ', request.error.message);
  };

  request.onupgradeneeded = event => {
    const db = event.target.result;
    // Create an objectStore to hold information about our heroes. We're going to use "id" as our key path because it's guaranteed to be unique
    const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });

    // Creation of indexes (data of the heroes)
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("name", "name", { unique: true });
    objectStore.createIndex("photo", "photo", { unique: false });
    objectStore.createIndex("realName", "realName", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex("height", "height", { unique: false });
    objectStore.createIndex("weight", "weight", { unique: false });

    // Use transaction oncomplete to make sure the objectStore creation is finished before adding data into it.
    objectStore.transaction.oncomplete = () => {
      saveData(heroes);
    };
  };

  request.onsuccess = () => {
    saveData(heroes);
  };
};

const saveData = heroes => {
  heroes.forEach(async hero => {
    const photo = await convertImageToBlob(hero.photo);
    saveHero({ ...hero, photo });
  });
};

const convertImageToBlob = async url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.send();
  });
}

const saveHero = hero => {
  const IdDB = window.indexedDB.open(DATABASE_NAME, 2);
  IdDB.onsuccess = async event => {
    const db = event.target.result;
    const objectStore = db.transaction([OBJECT_STORE_NAME], "readwrite").objectStore(OBJECT_STORE_NAME);;
    objectStore.add(hero).onsuccess = () => db.close();
  }
}

export const getHeroes = () => {
  const IdDB = window.indexedDB.open(DATABASE_NAME, 2);
  return new Promise(resolve => {
    IdDB.onsuccess = async event => {
      const db = event.target.result;
      const objectStore = db.transaction([OBJECT_STORE_NAME]).objectStore(OBJECT_STORE_NAME);
      objectStore.getAll().onsuccess = result => {
        db.close();
        resolve(result.target.result);
      }
    }
  });
}
