export const baseAssetsUrl = "https://kiprasmel.github.io/turbo-schedule-assets";

/**
 * `relativeAssetPaths`,
 * as layed out in https://github.com/kiprasmel/turbo-schedule-assets
 *
 * Will be joined together with the `baseAssetsUrl`
 * to create the full url.
 *
 */
export const relativeAssetPaths = {
	lessonLogo: "logo/lesson.png",
	classRoomLogo: "logo/classRoom.png",
	studentLogo: "logo/student.png",
	teacherLogo: "logo/teacher.png",
	clockLogo: "logo/clock.png",
};

const assets: typeof relativeAssetPaths = { ...relativeAssetPaths };

/** create full asset urls */
Object.entries(relativeAssetPaths).forEach((assetPath) => {
	const [key, value] = assetPath;

	const fullAssetUrl: string = `${baseAssetsUrl}/${value}`;

	assets[key as keyof typeof assets] = fullAssetUrl;
});

export default assets;
