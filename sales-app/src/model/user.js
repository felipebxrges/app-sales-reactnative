export default class User {
  constructor(id, nome, email, senha, saldo,admin) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.admin = admin;
    this.saldo = saldo || 0;
  }
}
