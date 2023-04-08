function testStr(str) {
  const pattern = /^[a-zA-Z0-9\s,'.!?-]+$/;

  if (pattern.test(str)) {
    // if the str has this Pattern then good/true
    return true;
  } else {
    return false;
  }
}

module.exports = { testStr };
