import React from "react";

import AbsoluteCenter from "../../common/absoluteCenter/AbsoluteCenter";
import MailingListJoiner from "./MailingListJoiner";
// import Signature from "./Signature";

const Footer = () => {
	return (
		<>
			<AbsoluteCenter>
				<MailingListJoiner />

				{/* <Signature /> */}
			</AbsoluteCenter>
			{/* <div style={{ position: "relative" }}>
				<div style={{ position: "absolute", top: "0", left: "0", bottom: "0", right: "0" }}> */}
			{/* </div>
			</div> */}
		</>
	);
};

export default Footer;
