export class User {
  username: String;
  email: String;
  label: String;
  lastdate: String;
  name: String;
  regdate: String;
  token: String;

constructor(username?: String, email?: String, label?: String, lastdate?: String, name?: String, regdate?: String, token?: String) {
      this.username = username || '';
      this.email = email || '';
      this.label = label || '';
      this.lastdate = lastdate || '';
      this.name = name || '';
      this.regdate = regdate || '';
      this.token = token || '';
    }
}
