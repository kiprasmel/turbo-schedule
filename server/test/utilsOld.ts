// setupFiles.ts
/**
 * https://github.com/axios/axios/issues/175#issuecomment-165521644
 */

import axios, { AxiosInstance, AxiosResponse } from "axios";

/** re-export because of common use case */
export { AxiosResponse };

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: `http://localhost:${process.env.PORT}`,
	/* other custom settings */
});
