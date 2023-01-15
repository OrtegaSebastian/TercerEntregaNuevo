


// funcion para encriptar la Clave
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
  // funcion para validar la Clave que se encripto con bCrypt
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

module.exports = {
    createHash,
    isValidPassword,
}