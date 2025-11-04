import { OfferingStatus } from "../../../shared/enums/offeringStatusEnum";
import { theme } from "../../../shared/styles/theme/customTheme";



export const stepColors = ["#9D7FEF", "#69B3E7", "#72f2c3", "#72f2a3"];

export const statusStep = {
    [OfferingStatus.OFFERED]: 0,
    [OfferingStatus.PENDING]: 1,
    [OfferingStatus.ACCEPTED]: 2,
    [OfferingStatus.COMPLETED]: 3,
  };
  
  export const getStepColor = (stepIndex, currentStep) =>
    stepIndex <= currentStep
      ? stepColors[stepIndex]
      : theme.colors.inputBgColor[0];
  