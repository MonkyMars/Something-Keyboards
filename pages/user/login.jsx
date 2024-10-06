import Footer from "../../components/Footer";
import styles from "../../styles/user/Login.module.css";
import React from "react";
import GlobalContext from "../../global/GlobalContext";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const { user, setUser } = React.useContext(GlobalContext);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--Bg",
      user.display_mode === 1 ? "#272727" : "#e3e3e3"
    );
    root.style.setProperty(
      "--font-color",
      user.display_mode === 1 ? "#fff" : "#000"
    );
    root.style.setProperty(
      "--reversed-background-color",
      user.display_mode === 1 ? "#000" : "#f9f9f9"
    );
  }, [user.display_mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleDisplayMode = (mode) => {
    setUser((prevUser) => ({ ...prevUser, display_mode: mode }));
  };
  return (
    <>
      <nav className={styles.Nav}>
        <h2 onClick={() => router.push('/')}>{"Something"}</h2>
        <div onClick={() => toggleDisplayMode(user.display_mode === 1 ? 0 : 1)}>
          {user.display_mode}
        </div>
      </nav>
      <main className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          <h2>{"Login"}</h2>
          <label>{"Email Address:"}</label>
          <input
            type="email"
            placeholder="..."
            value={formData.email}
            name="email"
            onChange={handleInputChange}
          />
          <label>{"Password:"}</label>
          <input
            type="password"
            placeholder="..."
            value={formData.password}
            name="password"
            onChange={handleInputChange}
          />
          <button type="submit">{"Submit"}</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
