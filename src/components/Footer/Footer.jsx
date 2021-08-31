import { useContext } from "react";
import FooterStyle from "./Footer.module.scss";
import { AreaContext } from "../../contexts/AreaContext";

const Footer = () => {
    // Contexts 
    const {suggestions} = useContext(AreaContext);

    return (
        <div className={FooterStyle.footerContainer}>
            {suggestions && suggestions.length===0 ? (
                <div className={FooterStyle.footerText}>
                    আপনার এলাকা এখানে না পেলে এই{" "}
                    <a
                        href="https://forms.gle/8h47dmeEjJyvfGAFA"
                        target="_blank"
                        rel="noreferrer"
                    >
                        ফর্মটি
                    </a>{" "}
                    পূরণ করে যুক্ত করার অনুরোধ করুন অথবা{" "}
                    <a
                        href="https://github.com/raadu/dhaka-city-corporation-data"
                        target="_blank"
                        rel="noreferrer"
                    >
                        ডাটাসেটে
                    </a>{" "}
                    যুক্ত করুন
                </div>
            ) : null}
        </div>
    );
}
 
export default Footer;
