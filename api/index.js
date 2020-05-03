import axios from 'axios'

const LOCALURL = 'http://34.97.145.153:6004'

export async function register(id, password, name, email) {
  return await axios
    .post(`${LOCALURL}/`, {
      query: `mutation {\n  register(\n  \tid: "${id}"\n    password: "${password}"\n    name: "${name}"\n    email: "${email}"\n  )\n}`
    })
    .then((res) => res.data.data.register)
}
export async function login(id, password) {
  return await axios
    .post(`${LOCALURL}/`, {
      query: `mutation {\n  login(\n    id: \"${id}\",\n    password:\"${password}\"\n  )\n}`
    })
    .then((res) => res.data.data.login)
}
