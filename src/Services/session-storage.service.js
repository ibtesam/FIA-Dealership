const SessionStorageService = {
  set,
  get,
  setObject,
  getObject,
  clear,
  remove,
};
function set(key, value) {
  sessionStorage[key] = value;
  return sessionStorage[key];
}
function get(key, defaultValue) {
  return sessionStorage[key] || defaultValue;
}
function setObject(key, value) {
  sessionStorage[key] = JSON.stringify(value);
  return sessionStorage[key];
}

function getObject(key, value) {
  return JSON.parse(sessionStorage[key] || "{}");
}

function clear() {
  return sessionStorage.clear();
}

function remove(key) {
  return sessionStorage.removeItem(key);
}

export default SessionStorageService;
