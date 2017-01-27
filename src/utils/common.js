export function readData(obj, path, Type = String) {
	let fields = path.split('.');
	let parent = obj;
	let data = {
		readable: true,
		value: null
	};

	for (let i = 0; i < fields.length; i++) {
		if (parent.hasOwnProperty(fields[i])) {
			parent = parent[fields[i]];
		} else {
			data.readable = false;
			data.value = new Type().valueOf();
			break;
		}
	}

	if (!data.readable) {
		return data;
	}

	data.value = parent;
	return data;
}

export function checkImageURL(url, timeout) {
	return new Promise((resolve, reject) => {
		const TIME_OUT = timeout || 1000;
		let timer, img = new Image();

		img.onerror = img.onabort =()=> {
			clearTimeout(timer);
		};

		img.onload = ()=> {
			clearTimeout(timer);
			resolve(url);
		};

		timer = setTimeout(()=> {
			reject("timeout");
		}, TIME_OUT);
		img.src = url;
	});
}

export function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}