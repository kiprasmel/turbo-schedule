import React from "react";
import LanguageSelect from "../../common/LanguageSelect";

const Header = () => {
	return (
		<>
			<div style={{ width: "100%", textAlign: "right" }}>
				<div style={{ marginRight: "2em" }}>
					<LanguageSelect />
				</div>
			</div>
		</>
	);
};

export default Header;
