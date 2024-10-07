import Footer from "../../components/Footer";
import styles from "../../styles/user/Login.module.css";
import React from "react";
import GlobalContext from "../../global/GlobalContext";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = React.useContext(GlobalContext);
  const [formPage, setFormPage] = React.useState(0);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    display_mode: 0,
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
      if (formPage === 0) {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          setUser(formData);
          router.push("/user/account");
        } else {
          window.alert("Login failed");
        }
      } else if (formPage === 2 && formData) {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setUser(formData);
          router.push("/user/account");
        } else {
          window.alert("Sign up failed");
        }
      } else if(formPage === 1){
        if(formData.email && formData.password) {
          setFormPage(2)
        } e
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleDisplayMode = () => {
    setUser((prevUser) => ({
      ...prevUser,
      display_mode: user.display_mode === 1 ? 0 : 1,
    }));
  };

  return (
    <>
      <nav className={styles.Nav}>
        <h2 onClick={() => router.push("/")}>{"Something"}</h2>
        <div onClick={toggleDisplayMode}>
          {user.display_mode === 1 ? "Dark" : "Light"}
        </div>
      </nav>
      <main className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          {formPage === 0 && (
            <>
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
            </>
          )}
          {formPage === 1 && (
            <>
              <h2>{"Sign up"}</h2>
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
            </>
          )}
          {formPage === 2 && (
            <>
              <h2>{"Sign up"}</h2>
              <label>{"First Name:"}</label>
              <input
                type="text"
                placeholder="..."
                value={formData.first_name}
                name="first_name"
                onChange={handleInputChange}
              />
              <label>{"Last Name:"}</label>
              <input
                type="text"
                placeholder="..."
                value={formData.last_name}
                name="last_name"
                onChange={handleInputChange}
              />
            </>
          )}
          <button type="submit">{formPage === 1 ? 'Continue' :"Submit"}</button>
          <label onClick={() => setFormPage(formPage === 0 ? 1 : 0)}>
            {formPage === 0
              ? "Don't have an account? Create one!"
              : "Already have an account? Login!"}
          </label>
        </form>
      </main>
      <Footer />
    </>
  );
}
