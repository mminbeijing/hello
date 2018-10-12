/**
 * JavaScript配置信息
 */
var AppConfig = {
	name : 'AppConfig',
	version : 'V1.0',
	/** 方法的定义 */
	config : {
		getPgUrl : function(lvCode) {
			return AppConfig.pgCode[lvCode];
		},
		getPgCode : function(lvUrl) {
			if (lvUrl && lvUrl.length > 0) {
				for ( var index in AppConfig.pgCode) {
					if (lvUrl == AppConfig.pgCode[index]) {
						return index;
					}
				}
			}
			return null;
		}
	}
};
