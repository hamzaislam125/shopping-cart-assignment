import { object, string, ref } from "yup";
import axiosInstance from "./utils/axiosInstance";
import FormHandler from "./utils/formHandler";
import "./styles/index.scss";
import Auth from "./auth";

class Login extends FormHandler {
  constructor() {
    const inputElements = document.getElementsByClassName("form-field__input");
    const loginSchema = object().shape({
      email: string()
        .email("Please enter valid email address")
        .required("email is required."),
      password: string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Please provide strong Password"
        ),
    });
    super(inputElements, loginSchema);
    this.auth = new Auth();
  }

  submitForm = async () => {
    try {
      const res = await axiosInstance.post("login", this.fields);
      this.auth.storeToken(res);
      history.replaceState({ page: 1 }, "Home Page", "index.html");
      location.reload();
    } catch (error) {
      this.displayGlobalError(error.message);
    }
  };

  async submit(event) {
    await super.submit(event);
    console.log(this.hasError());
    const hasError = this.hasError();
    if (hasError) return;
    await this.submitForm();
    this.clearForm();
  }
}

const login = new Login();

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", login.submit);

export default Login;
