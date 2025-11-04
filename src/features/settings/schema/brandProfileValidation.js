import * as yup from "yup";

export const brandProfileValidationSchema = yup.object().shape({
    brand_name: yup.string()
        .trim()
        .optional(),
    head_office: yup.string()
        .trim()
        .optional(),
    contact: yup.string()
        .trim()
        .optional()
        .test("contact-format", "Contact must start with country code (+) and be 8-15 digits", function (value) {
            if (!value || value.trim() === "") return true;
            
            // Remove common formatting characters
            const cleanNumber = value.replace(/[\s\-\(\)\.]/g, '');
            
            // Check if starts with +
            if (!value.startsWith('+')) {
                return this.createError({ message: "Contact must start with country code (+)" });
            }
            
            // Remove + for length check
            const digitsOnly = cleanNumber.substring(1);
            
            if (digitsOnly.length < 8 || digitsOnly.length > 15) {
                return this.createError({ message: "Contact must be between 8 and 15 digits after country code" });
            }
            
            return true;
        }),
    website: yup.string()
        .trim()
        .optional()
        .test("website-url", "Please enter a valid website URL", function (value) {
            if (!value || value.trim() === "") return true;
            
            let urlToCheck = value.trim();
            
            // Check for malformed protocol (single slash after https:/)
            if ((urlToCheck.startsWith('http:/') || urlToCheck.startsWith('https:/')) && 
                !urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
                return this.createError({ message: "Protocol should be http:// or https://" });
            }
            
            // Add https:// if no protocol is specified
            if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
                urlToCheck = 'https://' + urlToCheck;
            }
            
            // Validate with URL constructor
            try {
                const testUrl = new URL(urlToCheck);
                if (!testUrl.hostname || testUrl.hostname.length < 3) {
                    return this.createError({ message: "Please enter a valid website URL" });
                }
                return true;
            } catch (e) {
                return this.createError({ message: "Please enter a valid website URL" });
            }
        }),
    country: yup.string()
        .trim()
        .optional(),
});

