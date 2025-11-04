import Completed from "../pages/wizardform/Completed";
import StepOne from "../pages/wizardform/StepOne";
import StepThree from "../pages/wizardform/StepThree";
import StepTwo from "../pages/wizardform/StepTwo";

export const FORM_STEPS = [
    {
        title: "Create Your Account",
        component: StepOne,
        showProgressBar: true,
        canGoBack: false,
        validateOnExit: true,
    },
    {
        title: "Which Category Would Fit You Most?",
        component: StepTwo,
        showProgressBar: true,
        canGoBack: true,
        validateOnExit: true,
    },
    {
        title: "ReCAPTCHA Verification",
        component: StepThree,
        showProgressBar: true,
        canGoBack: true,
        validateOnExit: false,
    },
    {
        title: "Email Verification!",
        component: Completed,
        showProgressBar: false,
        canGoBack: false,
        validateOnExit: false,
    },
];