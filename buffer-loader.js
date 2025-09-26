// buffer-loader.js
// Turns any string source into a Buffer before handing it off
module.exports = function bufferLoader(source) {
    // 'source' is the file contents as a string
    // Convert it to a Node Buffer
    return Buffer.from(source, "utf-8");
};
