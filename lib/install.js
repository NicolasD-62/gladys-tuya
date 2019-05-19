module.exports = function () {
	const type = {
		name: 'Tuya',
		service: 'tuya'
	};

	return gladys.notification.install(type);
};