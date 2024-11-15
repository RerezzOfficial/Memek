var http = require('node:https');
var path = require('path');
async function isTiktokVideo(link) {
	var a = await fetch(link)
	var url = new URL(await a.url)
	return {
		isVideo: !isNaN(path.basename(url.pathname)),
		isUser: path.basename(url.pathname).startsWith('@'),
		url: url.origin + url.pathname,
		pathname: url.pathname,
		patleng: url.pathname.length,
		id: path.basename(url.pathname)
	}
}

async function tikitod(url) {
	return new Promise(async (resolve, reject) => {
		var id = await isTiktokVideo(url)
		if (id.patleng <= 1) {
			return resolve({
				status: false,
				message: 'invalid url'
			})
		}
		if (id.isVideo) {
			http.get('https://api2.musical.ly/aweme/v1/feed/?aweme_id=' + id.id, (res) => {
				var {
					statusCode
				} = res;
				var contentType = res.headers['content-type'];

				var error;
				// Any 2xx status code signals a successful response but
				// here we're only checking for 200.
				if (statusCode !== 200) {
					error = new Error('Request Failed.\n' +
						`Status Code: ${statusCode}`);
				} else if (!/^application\/json/.test(contentType)) {
					error = new Error('Invalid content-type.\n' +
						`Expected application/json but received ${contentType}`);
				}
				if (error) {
					console.error(error.message);
					// Consume response data to free up memory
					res.resume();
					return resolve({
						status: false,
						message: 'have a problem when getting data'
					});
				}

				res.setEncoding('utf8');
				var rawData = '';
				res.on('data', (chunk) => {
					rawData += chunk;
				});
				res.on('end', () => {
					try {
						var p = JSON.parse(rawData).aweme_list.find(v => {
							return v.aweme_id == id.id
						});
						var format = {
							status: true,
							autor: {
								nickname: p.author.nickname,
								username: p.author.unique_id,
								avatar: p.author.avatar_larger.url_list.pop()
							},
							details: {
								id: p.statistics.aweme_id,
								share_count: p.statistics.share_count,
								like_count: p.statistics.digg_count,
								comment_count: p.statistics.comment_count,
								download_count: p.statistics.download_count,
								play_count: p.statistics.play_count,
								desc: p.desc
							},
							download: {
								video: {
									with_wm: {
										url: p.video.download_addr.url_list.pop(),
										size: p.video.download_addr.data_size,
										thumbnail: {
											url: p.video.cover.url_list.pop(),
											width: p.video.cover.width,
											height: p.video.cover.height
										}
									},
									no_wm: {
										url: p.video.play_addr.url_list.pop(),
										size: p.video.play_addr.data_size,
										thumbnail: {
											url: p.video.origin_cover.url_list.pop(),
											width: p.video.origin_cover.width,
											height: p.video.origin_cover.height
										}
									}
								},
								audio: {
									url: p.music.play_url.uri
								}
							}
						}
						return resolve(format)
					} catch (e) {
						console.error(e.message);
						return resolve({
							status: false,
							message: 'have a problem when getting data'
						})
					}
				});
			}).on('error', (e) => {
				console.error(`Got error: ${e.message}`);
				return resolve({
					status: false,
					message: 'have a problem when getting data'
				})
			});
		}
	})
}
/** usage
 * var a = await ssstik("https://vt.tiktok.com/ZSdfPds4S/")
 * var b = await snaptik("https://vt.tiktok.com/ZSdfPds4S/")
 * var c = await tikmate("https://vt.tiktok.com/ZSdfPds4S/")
 * console.log({
 *	a,
 *	b, 
 *      c
 * })
 **/

module.exports = { tikitod }