function testStr(str) {
  const pattern = /^[a-zA-Z0-9\s,'.!?-]+$/;

  if (pattern.test(str)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { testStr };
