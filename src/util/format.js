export const formatDate = (dateString) => {
	// Java의 LocalDateTime 문자열을 JavaScript Date 객체로 변환
	const date = new Date(dateString);

	// 연도, 월, 일을 가져옴
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1
	const day = String(date.getDate()).padStart(2, '0');

	// yyyy-MM-dd 형식으로 반환
	return `${year}-${month}-${day}`;
};

export const formatDateTime = (dateString) => {
	// Java의 LocalDateTime 문자열을 JavaScript Date 객체로 변환
	const date = new Date(dateString);

	// 연도, 월, 일을 가져옴
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1
	const day = String(date.getDate()).padStart(2, '0');

	// 시간, 분, 초를 가져옴
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// yyyy-MM-dd HH:mm:ss 형식으로 반환
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
