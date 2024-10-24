import Footer from "../../components/Footer";
import styles from "../../styles/user/Login.module.css";
import React from "react";
import { signIn } from "next-auth/react";  // Import signIn from NextAuth
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [formPage, setFormPage] = React.useState(0);  // 0 = login, 1 = sign-up, 2 = sign-up complete
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");  // Clear any existing errors

    try {
      if (formPage === 0) {
        // handle login
        const result = await signIn("credentials", {
          redirect: false,  // Prevent redirect for handling error messages
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('session', result)
        if (!result.ok) {
          setErrorMessage(result.error);  // Set any error message
        } else {
          router.push("/user/account");  // Redirect to the user account page on success
        }
      } else if (formPage === 2 && formData) {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(response, await response.json())
        if (response.ok) {
          router.push(' /user/account')
        } else {
          setErrorMessage("Sign-up failed");
        }
      } else if (formPage === 1) {
        if (formData.email && formData.password) {
          setFormPage(2);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <nav className={styles.Nav}>
        <h2 onClick={() => router.push("/")}>{"Something"}</h2>
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
              {errorMessage && <p>{errorMessage}</p>}
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
          <button type="submit">{formPage === 1 ? 'Continue' : "Submit"}</button>
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
