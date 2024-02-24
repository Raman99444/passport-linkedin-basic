var passport = require('passport-strategy')
  , util = require('util')
  , lookup = require('./utils').lookup

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options
    options = {}
  }

  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback') }
  
  this._userEmailField = options.userEmail || 'userEmail'
  this._passwordKeyField = options.password || 'password'
  
  passport.Strategy.call(this)
  this.name = 'linkedin_basic'
  this._verify = verify
  this._passReqToCallback = options.passReqToCallback
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
  options = options || {}
  var userEmail = lookup(req.body, this._userEmailField) || lookup(req.query, this._userEmailField)
  var password = lookup(req.body, this._passwordKeyField) || lookup(req.query, this._passwordKeyField)
  
  if (!userEmail || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400)
  }
  
  var self = this
  
  function verified(err, user, info) {
    if (err) { return self.error(err) }
    if (!user) { return self.fail(info) }
    info = info || {}
    self.success(user, info)
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, userEmail, password, verified)
    } else {
      this._verify(userEmail, password, verified)
    }
  } catch (ex) {
    return self.error(ex)
  }
}

module.exports = Strategy
