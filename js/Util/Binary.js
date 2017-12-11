import Promise from 'es6-promise';

/**
 * Object that allows sending & receving binary data using HTTP
 */
export default {
    /**
     * Sends binary as POST
     *
     * @param {ArrayBufferView} view Binary data to send.
     * @param {String} url Url to post binary data to.
     */
    sendArrayBufferView: function (view, url) {
        const req = new XMLHttpRequest();

        req.open('POST', url, true);

        req.send(view);
    },

    /**
     * Retrieves binary data from the server
     *
     * @param {String} url Url to get binary data from.
     * @returns {Promise} promise that is fullfilled with ArrayBuffer or false if get failed
     */
    getArrayBuffer: function (url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.open('GET', url, true);
            req.responseType = 'arraybuffer';

            req.onload = () => {
                const arrayBuffer = req.response;

                if (arrayBuffer) {
                    resolve(arrayBuffer);
                } else {
                    reject(false);
                }
            };

            req.send(null);
        });
    }
};
