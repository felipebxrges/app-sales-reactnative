export default class User {
  constructor(id, nome, email, senha, admin) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.admin = admin;
  }
}
