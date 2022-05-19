import { object, string, ref } from "yup";
import axiosInstance from "./utils/axiosInstance";
import FormHandler from "./utils/formHandler";
import "./styles/index.scss";
import Auth from "./auth";

class Register extends FormHandler {
  constructor() {
    const inputElements = document.getElementsByClassName("form-field__input");
    const registerSchema = object().shape({
      firstName: string().required("First Name is required..."),
      lastName: string(),
      email: string()
        .email("Please enter valid email address")
        .required("email is required."),
      password: string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Please provide strong Password"
        ),
      confirmPassword: string().oneOf(
        [ref("password"), null],
        "Passwords must match"
      ),
    });
    super(inputElements, registerSchema);
    this.auth = new Auth();
  }

  submitForm = async () => {
    try {
      const { confirmPassword, ...rest } = this.fields;
      const res = await axiosInstance.post("register", rest);
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

const register = new Register();

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", register.submit);

export default Register;
