import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../css/login.css";

const Login = ({ isOpen, onClose, children }) => {
  const getToken = Cookies.get("auth-token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      const token = response.data.data.token;
      Cookies.set("auth-token", token, { expires: 1 });
      if (!getToken) {
        router.refresh();
        alert("autentiado");
        onClose();
      } else {
        alert("no autenticado");
        alert("usuario no encontrado");
      }
    } catch (error) {
      alert("usuario no encontrado", error);
    }
  };
  if (!isOpen) return null;
  return (
    <>
      <section className="login-container">
        <section className="container">
          <form action="" className="form-container" id="form">
            <div>
              <Link href="/"></Link>
            </div>
            <div>
              <div>
                <h1>iniciar sesion</h1>
                <p>cambia tu estilo con nosotros</p>
              </div>
              <div>
                <label>correo</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="user@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label>contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="contraseña"
                  minLength={"8"}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button onClick={handleSubmit}>ingresar</button>
              <h6>
                no estas registrado?<Link href="/register">registrate</Link>
              </h6>
            </div>
            <button onClick={onClose}>cerrar</button>
          </form>
        </section>
        <div className="image"></div>
        {children}
      </section>
    </>
  );
};

export default Login;
