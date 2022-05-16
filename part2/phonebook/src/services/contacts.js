import axios from "axios";
const baseurl = "/api/persons/";

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((response) => response.data);
};

const create = (contact) => {
  const request = axios.post(baseurl, contact);
  return request.then((response) => response.data);
};

const remove = (contact) => {
  const request = axios.delete(baseurl + contact.id);
  return request.then((response) => response.data);
};

const update = (id, contact) => {
  const request = axios.put(baseurl + id, contact);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
