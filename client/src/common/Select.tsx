import styled from "@emotion/styled";

export const Select = styled.select`
	vertical-align: bottom;
	font-size: 1em;

	/** https://stackoverflow.com/a/34532555/9285308 */
	text-align: center; /** firefox & others */
	-moz-text-align-last: center;

	text-align-last: center; /** chrome */
`;
