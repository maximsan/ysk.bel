export const photoswipeParseHash = function () {
    let hash = window.location.hash.substring(1),
        params = {};

    if (hash.length < 5) {
        // pid=1
        return params;
    }

    let vars = hash.split('&');
    for (let i = 0; i < vars.length; i++) {
        if (!vars[i]) {
            continue;
        }
        let pair = vars[i].split('=');
        if (pair.length < 2) {
            continue;
        }
        params[pair[0]] = pair[1];
    }

    if (params.gid) {
        params.gid = parseInt(params.gid, 10);
    }

    return params;
};
