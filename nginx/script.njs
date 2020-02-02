function get_image_digest(r) {
  var tokens = JSON.parse(require('fs').readFileSync('/home/artifacts/v2/images.json'));
  return tokens[r.variables["image"]];
}

function get_image_md5(r) {
  return require('crypto').createHash('md5').update(r.variables["image"]).digest('hex');
}
