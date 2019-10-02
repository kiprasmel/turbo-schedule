/**
 * TODO - WIP - unfinished & not used yet
 */

export interface Friend {
	howManyTimesWeMeet: number;
	student: any;
}

export const findTopFriends = (lessonsArray: Array<any>) => {
	let uniqueFriends: Map<string, Friend> = new Map();

	lessonsArray.map((lesson) => {
		const { schedule } = lesson;

		schedule.forEach((student: any) => {
			if (!uniqueFriends.has(student)) {
				const newFriend: Friend = { howManyTimesWeMeet: 0, student: student };

				uniqueFriends.set(newFriend.student, newFriend);
			} else {
				const currentFriend: Friend = uniqueFriends.get(student) as Friend; // || { howManyTimesWeMeet: 0, student: student };

				currentFriend.howManyTimesWeMeet++;

				uniqueFriends.set(student, currentFriend);
			}
		});
	});

	const uniqueFriendsArray: Array<Friend> = [];

	uniqueFriends.forEach((friend) => {
		uniqueFriendsArray.push(friend);
	});

	// console.log("uniqueFriendsArray", uniqueFriendsArray);

	return uniqueFriendsArray;
};
